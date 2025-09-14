const ViewedModel = require("../models/viewed.model");
const CommentModel = require("../models/comment.model");
const CommentNormalizer = require("../normalizers/comment.normalizer");
const UserModel = require("../models/user.model");

class ViewedController {
    static async getViewed(req, res) {
        try {
            let viewed = await ViewedModel.findOne();

            if (!viewed) {
                viewed = new ViewedModel({ titles: [] });
                await viewed.save();
            }

            // Получаем комментарии для каждого title
            const titlesWithComments = await Promise.all(
                viewed.titles.map(async (title) => {
                    try {
                        const comments = await CommentModel.find({ title: title.id });

                        // Заменяем populate ручной подстановкой пользователей
                        const users = await UserModel.find();
                        const commentsWithUsers = comments.map(comment => {
                            const user = users.find(u => u._id === comment.user);
                            return { ...comment, user };
                        });

                        return {
                            ...title,
                            comments: commentsWithUsers.map(comment => CommentNormalizer.normalize(comment)),
                            commentsCount: comments.length
                        };
                    } catch (error) {
                        console.error('Error processing title:', title.id, error);
                        return {
                            ...title,
                            comments: [],
                            commentsCount: 0
                        };
                    }
                })
            );

            res.json({ titles: titlesWithComments });
        } catch (err) {
            console.log('Error in getViewed:', err);
            res.status(500).json({ error: true, message: "Внутренняя ошибка сервера" });
        }
    }

    static async addToViewed(req, res) {
        try {
            const { titleData } = req.body;

            if (!titleData || !titleData.id) {
                return res.status(400).json({ error: true, message: "Неверные данные title" });
            }

            let viewed = await ViewedModel.findOne();
            if (!viewed) {
                viewed = new ViewedModel({ titles: [] });
            }

            const existingTitle = viewed.titles.find(t => t.id === titleData.id);
            if (existingTitle) {
                return res.status(400).json({ error: true, message: "Title уже есть в просмотренных" });
            }

            viewed.titles.push(titleData);
            await viewed.save();

            res.status(200).json({ error: false, message: "Title добавлен в просмотренные" });
        } catch (err) {
            console.log('Error in addToViewed:', err);
            res.status(500).json({ error: true, message: "Внутренняя ошибка сервера" });
        }
    }

    static async removeFromViewed(req, res) {
        try {
            const { id } = req.params;

            let viewed = await ViewedModel.findOne();
            if (!viewed) {
                return res.status(404).json({ error: true, message: "Список просмотренных не найден" });
            }

            // Удаляем title
            viewed.titles = viewed.titles.filter(t => t.id !== id);
            await viewed.save();

            // Удаляем связанные комментарии
            await CommentModel.deleteMany({ title: id });

            res.status(200).json({ error: false, message: "Title удален из просмотренных" });
        } catch (err) {
            console.log('Error in removeFromViewed:', err);
            res.status(500).json({ error: true, message: "Внутренняя ошибка сервера" });
        }
    }
}

module.exports = ViewedController;