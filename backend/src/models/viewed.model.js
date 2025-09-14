const fileStorage = require('../utils/file-storage');

class ViewedModel {
    constructor(data = {}) {
        Object.assign(this, data);
        this.titles = this.titles || [];
    }

    static async findOne() {
        try {
            const result = await fileStorage.findOne('viewed', {});
            return result ? new ViewedModel(result) : new ViewedModel({ titles: [] });
        } catch (error) {
            console.error('Error in ViewedModel.findOne:', error);
            return new ViewedModel({ titles: [] });
        }
    }

    async save() {
        try {
            const existing = await fileStorage.findOne('viewed', {});
            if (existing && existing._id) {
                return await fileStorage.update('viewed', { _id: existing._id }, this);
            } else {
                const result = await fileStorage.insert('viewed', this);
                this._id = result._id;
                return result;
            }
        } catch (error) {
            console.error('Error saving viewed:', error);
            throw error;
        }
    }
}

module.exports = ViewedModel;