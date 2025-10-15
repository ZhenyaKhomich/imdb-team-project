const fileStorage = require('../utils/file-storage');

class WatchlistModel {
    constructor(data = {}) {
        Object.assign(this, data);
        this.titles = this.titles || [];
    }

    static async findOne() {
        // Для watchlist всегда один документ
        try {
            const result = await fileStorage.findOne('watchlist', {});
            return result ? new WatchlistModel(result) : new WatchlistModel({ titles: [] });
        } catch (error) {
            console.error('Error in WatchlistModel.findOne:', error);
            return new WatchlistModel({ titles: [] });
        }
    }

    async save() {
        try {
            // Всегда обновляем единственный watchlist документ
            const existing = await fileStorage.findOne('watchlist', {});
            if (existing && existing._id) {
                return await fileStorage.update('watchlist', { _id: existing._id }, this);
            } else {
                const result = await fileStorage.insert('watchlist', this);
                this._id = result._id;
                return result;
            }
        } catch (error) {
            console.error('Error saving watchlist:', error);
            throw error;
        }
    }
}

module.exports = WatchlistModel;