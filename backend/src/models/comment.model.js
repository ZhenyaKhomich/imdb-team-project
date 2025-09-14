const fileStorage = require('../utils/file-storage');

class CommentModel {
    constructor(data = {}) {
        Object.assign(this, data);
    }

    static async find(query = {}) {
        return (await fileStorage.find('comments', query)).map(item => new CommentModel(item));
    }

    static async findOne(query) {
        const result = await fileStorage.findOne('comments', query);
        return result ? new CommentModel(result) : null;
    }

    async save() {
        if (this._id) {
            return await fileStorage.update('comments', { _id: this._id }, this);
        } else {
            const result = await fileStorage.insert('comments', this);
            this._id = result._id;
            return result;
        }
    }

    static async deleteMany(query) {
        return await fileStorage.delete('comments', query);
    }
}

module.exports = CommentModel;