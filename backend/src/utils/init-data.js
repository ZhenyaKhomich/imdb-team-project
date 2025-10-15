const fileStorage = require('./file-storage');
const crypto = require('crypto');

async function initData() {
    // Создаем пользователя по умолчанию
    const existingUser = await fileStorage.findOne('users', {email: 'imbd@gmail.com'});
    if (!existingUser) {
        const salt = crypto.randomBytes(128).toString('base64');
        const passwordHash = crypto.pbkdf2Sync('12345678', salt, 1, 128, 'sha1').toString('base64');

        await fileStorage.insert('users', {
            name: 'imbd',
            email: 'imbd@gmail.com',
            passwordHash: passwordHash,
            salt: salt,
            refreshToken: null
        });
    }

    // Создаем пустой watchlist
    const existingWatchlist = await fileStorage.findOne('watchlist', {});
    if (!existingWatchlist) {
        await fileStorage.insert('watchlist', {
            titles: []
        });
    }

    const existingViewed = await fileStorage.findOne('viewed', {});
    if (!existingViewed) {
        await fileStorage.insert('viewed', {
            titles: []
        });
    }
}

module.exports = initData;