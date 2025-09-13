const CommentModel = require("../models/comment.model");
const ValidationUtils = require("../utils/validation.utils");
const CommentNormalizer = require("./../normalizers/comment.normalizer");
const UserCommentActionModel = require("../models/user-comment-action.model");
const config = require("../config/config");
const UserCommentActionNormalizer = require("../normalizers/user-comment-action.normalizer");
const UserModel = require("../models/user.model"); // Добавляем импорт UserModel

class CommentController {
    static async addComment(req, res) {
        const {error} = ValidationUtils.addCommentValidation(req.body);

        if (error) {
            console.log(error.details);
            return res.status(400).json({error: true, message: error.details[0].message});
        }

        let comment = new CommentModel();
        comment.text = req.body.text;
        comment.date = new Date();
        comment.user = req.user.id; // Убираем mongoose.Types.ObjectId
        comment.title = req.body.title;
        comment.likesCount = 0;
        comment.dislikesCount = 0;
        comment.violatesCount = 0;

        const result = await comment.save();

        res.status(200).json({error: false, message: "Комментарий добавлен!"});
    }

    static async getComments(req, res) {
        const {title} = req.query;

        if (!title) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр url"});
        }

        const offset = parseInt(req.query['offset'] || 0);
        const loadCount = 10;

        let comments = await CommentModel.find({title: title});

        // Заменяем populate ручной подстановкой пользователей
        const users = await UserModel.find();
        comments = comments.map(comment => {
            const user = users.find(u => u._id === comment.user);
            return { ...comment, user };
        });

        // Сортируем по дате
        comments.sort((a, b) => new Date(b.date) - new Date(a.date));

        let slicedComments = comments.slice(offset, offset + loadCount);

        return res.json({
            allCount: comments.length,
            comments: slicedComments.map(item => CommentNormalizer.normalize(item))
        });
    }

    static async applyActionComment(req, res) {
        const {error} = ValidationUtils.applyActionCommentValidation(req.body);

        if (error) {
            console.log(error.details);
            return res.status(400).json({error: true, message: error.details[0].message});
        }

        const {id} = req.params;
        if (!id) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр id"});
        }

        let comment = await CommentModel.findOne({_id: id});
        if (!comment) {
            return res.status(404)
                .json({error: true, message: "Комментарий не найден"});
        }

        let commentUserAction = await UserCommentActionModel.findOne({
            comment: id,
            user: req.user.id,
            action: req.body.action
        });

        if (commentUserAction) {
            if (commentUserAction.action === config.userCommentActions.violate) {
                return res.status(400)
                    .json({error: true, message: "Это действие уже применено к комментарию"});
            } else {
                await commentUserAction.remove();
                if (commentUserAction.action === config.userCommentActions.like) {
                    if (comment.likesCount > 0) {
                        comment.likesCount -= 1;
                    }
                } else if (commentUserAction.action === config.userCommentActions.dislike) {
                    if (comment.dislikesCount > 0) {
                        comment.dislikesCount -= 1;
                    }
                }
                await comment.save();

                return res.status(200).json({error: false, message: "Успешное действие!"});
            }
        }

        commentUserAction = new UserCommentActionModel();
        commentUserAction.user = req.user.id; // Убираем mongoose.Types.ObjectId
        commentUserAction.comment = id; // Убираем mongoose.Types.ObjectId
        commentUserAction.action = req.body.action;

        const result = await commentUserAction.save();
        if (result) {
            if (commentUserAction.action === config.userCommentActions.like) {
                let dislikeCommentUserAction = await UserCommentActionModel.findOne({
                    comment: id,
                    user: req.user.id,
                    action: config.userCommentActions.dislike
                });
                if (dislikeCommentUserAction) {
                    await dislikeCommentUserAction.remove();
                    if (comment.dislikesCount > 0) {
                        comment.dislikesCount -= 1;
                    }
                }
                comment.likesCount += 1;
            } else if (commentUserAction.action === config.userCommentActions.dislike) {
                let likeCommentUserAction = await UserCommentActionModel.findOne({
                    comment: id,
                    user: req.user.id,
                    action: config.userCommentActions.like
                });
                if (likeCommentUserAction) {
                    await likeCommentUserAction.remove();
                    if (comment.likesCount > 0) {
                        comment.likesCount -= 1;
                    }
                }
                comment.dislikesCount += 1;
            } else if (commentUserAction.action === config.userCommentActions.violate) {
                comment.violatesCount += 1;
            }

            await comment.save();
        }

        res.status(200).json({error: false, message: "Успешное действие!"});
    }

    static async getCommentActions(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр id"});
        }

        let commentUserActions = await UserCommentActionModel.find({
            comment: id,
            user: req.user.id,
            action: {$ne: config.userCommentActions.violate}
        });

        commentUserActions = commentUserActions.map(item => UserCommentActionNormalizer.normalize(item));
        res.json(commentUserActions);
    }

    static async getTitleCommentActions(req, res) {
        const {titleId} = req.query;

        if (!titleId) {
            return res.status(400)
                .json({error: true, message: "Не передан параметр titleId для title"});
        }

        let comments = await CommentModel.find({title: titleId});
        if (!comments || comments.length === 0) {
            return res.json([]);
        }

        // Сортируем по дате
        comments.sort((a, b) => new Date(b.date) - new Date(a.date));

        let commentUserActions = await UserCommentActionModel.find({
            comment: {$in: comments.map(item => item._id)},
            user: req.user.id,
            action: {$ne: config.userCommentActions.violate}
        });

        commentUserActions = commentUserActions.map(item => UserCommentActionNormalizer.normalize(item));
        res.json(commentUserActions);
    }
}

module.exports = CommentController;