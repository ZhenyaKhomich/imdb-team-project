const fileStorage = require('../utils/file-storage');
const crypto = require('crypto');
const randomBytesNum = 128;

class UserModel {
    constructor(data = {}) {
        Object.assign(this, data);
    }

    static async findOne(query) {
        const result = await fileStorage.findOne('users', query);
        return result ? new UserModel(result) : null;
    }

    static async find(query = {}) {
        const results = await fileStorage.find('users', query);
        return results.map(item => new UserModel(item));
    }

    static async create(userData) {
        const result = await fileStorage.insert('users', userData);
        return new UserModel(result);
    }

    static async update(query, updateData) {
        return await fileStorage.update('users', query, updateData);
    }

    checkPassword(password) {
        if (!password || !this.passwordHash) return false;
        const hash = crypto.pbkdf2Sync(password, this.salt, 1, randomBytesNum, 'sha1');
        return hash.toString('base64') === this.passwordHash;
    }

    setPassword(password) {
        if (!password) return false;
        this.salt = crypto.randomBytes(randomBytesNum).toString('base64');
        this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, randomBytesNum, 'sha1').toString('base64');
    }

    async save() {
        if (this._id) {
            return await fileStorage.update('users', { _id: this._id }, this);
        } else {
            const result = await fileStorage.insert('users', this);
            this._id = result._id;
            return result;
        }
    }
}

module.exports = UserModel;