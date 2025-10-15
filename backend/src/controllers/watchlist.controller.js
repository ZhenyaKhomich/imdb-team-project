const WatchlistModel = require("../models/watchlist.model");
const CommentModel = require("../models/comment.model");
const CommentNormalizer = require("../normalizers/comment.normalizer");
const UserModel = require("../models/user.model"); // Добавляем импорт UserModel

class WatchlistController {
    static async getWatchlist(req, res) {
        try {
            let watchlist = await WatchlistModel.findOne();

            if (!watchlist) {
                watchlist = new WatchlistModel({ titles: [] });
                await watchlist.save();
            }

            // Получаем комментарии для каждого title
            const titlesWithComments = await Promise.all(
                watchlist.titles.map(async (title) => {
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
            console.log('Error in getWatchlist:', err);
            res.status(500).json({ error: true, message: "Внутренняя ошибка сервера" });
        }
    }

    static async addToWatchlist(req, res) {
        try {
            const { titleData } = req.body;

            if (!titleData || !titleData.id) {
                return res.status(400).json({ error: true, message: "Неверные данные title" });
            }

            let watchlist = await WatchlistModel.findOne();
            if (!watchlist) {
                watchlist = new WatchlistModel({ titles: [] });
            }

            const existingTitle = watchlist.titles.find(t => t.id === titleData.id);
            if (existingTitle) {
                return res.status(400).json({ error: true, message: "Title уже есть в watchlist" });
            }

            watchlist.titles.push(titleData);
            await watchlist.save();

            res.status(200).json({ error: false, message: "Title добавлен в watchlist" });
        } catch (err) {
            console.log('Error in addToWatchlist:', err);
            res.status(500).json({ error: true, message: "Внутренняя ошибка сервера" });
        }
    }

    static async removeFromWatchlist(req, res) {
        try {
            const { id } = req.params;

            let watchlist = await WatchlistModel.findOne();
            if (!watchlist) {
                return res.status(404).json({ error: true, message: "Watchlist не найден" });
            }

            // Удаляем title
            watchlist.titles = watchlist.titles.filter(t => t.id !== id);
            await watchlist.save();

            // Удаляем связанные комментарии
            await CommentModel.deleteMany({ title: id });

            res.status(200).json({ error: false, message: "Title удален из watchlist" });
        } catch (err) {
            console.log('Error in removeFromWatchlist:', err);
            res.status(500).json({ error: true, message: "Внутренняя ошибка сервера" });
        }
    }
}

module.exports = WatchlistController;