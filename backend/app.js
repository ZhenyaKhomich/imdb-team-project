const express = require('express');
const cors = require('cors');
const watchlistRoutes = require('./src/routes/watchlist.routes');
const commentRoutes = require('./src/routes/comment.routes');
const viewedRoutes = require('./src/routes/viewed.routes');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const config = require("./src/config/config");
const path = require('path');
const passport = require('passport');
const UserModel = require("./src/models/user.model");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const fileStorage = require('./src/utils/file-storage'); // Добавляем импорт
const initData = require('./src/utils/init-data');

// Инициализация файлового хранилища
async function initializeApp() {
    try {
        // Инициализируем папку data
        await fileStorage.init();
        console.log('File storage initialized');

        // Инициализируем начальные данные
        await initData();
        console.log('Initial data created');

        // Запускаем сервер
        startServer();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        process.exit(1);
    }
}

function startServer() {
    const app = express();

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(cors());

    passport.use(new JwtStrategy({
        jwtFromRequest: (req) => {
            // Кастомное извлечение из заголовка x-auth
            if (req && req.headers && req.headers['x-auth']) {
                return req.headers['x-auth'];
            }
            return null;
        }, // Изменяем способ извлечения
        secretOrKey: config.secret,
        algorithms: ["HS256"],
    }, async (payload, next) => {
        if (!payload.id) {
            return next(new Error('Не валидный токен'));
        }

        let user = null;
        try {
            user = await UserModel.findOne({_id: payload.id});
        } catch (e) {
            console.log('Error finding user:', e);
            return next(new Error('Ошибка поиска пользователя'));
        }

        if (user) {
            return next(null, user); // Передаем экземпляр UserModel
        }

        next(new Error('Пользователь не найден'));
    }));

    app.use(passport.initialize());

    app.use("/api", authRoutes);
    app.use("/api/watchlist", watchlistRoutes);
    app.use("/api/comments", commentRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/watchlist", watchlistRoutes);
    app.use("/api/viewed", viewedRoutes);

    app.use(function (req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        res.status(err.statusCode || err.status || 500).send({error: true, message: err.message});
    });

    app.listen(config.port, () =>
        console.log(`Server started on port ${config.port}`)
    );
}

// Запускаем инициализацию
initializeApp();