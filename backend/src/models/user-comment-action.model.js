const fileStorage = require('../utils/file-storage');

class UserCommentActionModel {
    constructor(data = {}) {
        Object.assign(this, data);
    }

    static async find(query = {}) {
        return (await fileStorage.find('userCommentActions', query)).map(item => new UserCommentActionModel(item));
    }

    static async findOne(query) {
        const result = await fileStorage.findOne('userCommentActions', query);
        return result ? new UserCommentActionModel(result) : null;
    }

    async save() {
        if (this._id) {
            return await fileStorage.update('userCommentActions', { _id: this._id }, this);
        } else {
            const result = await fileStorage.insert('userCommentActions', this);
            this._id = result._id;
            return result;
        }
    }

    async remove() {
        return await fileStorage.delete('userCommentActions', { _id: this._id });
    }
}

module.exports = UserCommentActionModel;