const fs = require('fs').promises;
const path = require('path');

class FileStorage {
    constructor(storagePath = './data') {
        this.storagePath = storagePath;
    }

    async init() {
        try {
            await fs.mkdir(this.storagePath, { recursive: true });
            console.log('Storage directory created:', this.storagePath);
        } catch (error) {
            if (error.code !== 'EEXIST') {
                console.error('Error creating storage directory:', error);
                throw error;
            }
            console.log('Storage directory already exists:', this.storagePath);
        }
    }

    async getCollection(collectionName) {
        try {
            await this.init(); // Убедимся, что папка существует
            const filePath = path.join(this.storagePath, `${collectionName}.json`);

            try {
                const data = await fs.readFile(filePath, 'utf8');
                return JSON.parse(data);
            } catch (readError) {
                if (readError.code === 'ENOENT') {
                    // Файл не существует, возвращаем пустой массив
                    return [];
                }
                throw readError;
            }
        } catch (error) {
            console.error('Error reading collection:', error);
            return [];
        }
    }

    async saveCollection(collectionName, data) {
        try {
            await this.init(); // Убедимся, что папка существует
            const filePath = path.join(this.storagePath, `${collectionName}.json`);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error saving collection:', error);
            throw error;
        }
    }

    // Остальные методы остаются без изменений...
    async find(collectionName, query = {}) {
        const collection = await this.getCollection(collectionName);
        return collection.filter(item => {
            for (const key in query) {
                if (item[key] !== query[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    async findOne(collectionName, query = {}) {
        const results = await this.find(collectionName, query);
        return results[0] || null;
    }

    async insert(collectionName, data) {
        const collection = await this.getCollection(collectionName);
        const newItem = { ...data, _id: this.generateId() };
        collection.push(newItem);
        await this.saveCollection(collectionName, collection);
        return newItem;
    }

    async update(collectionName, query, updateData) {
        const collection = await this.getCollection(collectionName);
        let updated = false;

        const updatedCollection = collection.map(item => {
            let match = true;
            for (const key in query) {
                if (item[key] !== query[key]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                updated = true;
                return { ...item, ...updateData };
            }
            return item;
        });

        if (updated) {
            await this.saveCollection(collectionName, updatedCollection);
        }

        return updated;
    }

    async delete(collectionName, query) {
        const collection = await this.getCollection(collectionName);
        const newCollection = collection.filter(item => {
            for (const key in query) {
                if (item[key] !== query[key]) {
                    return true;
                }
            }
            return false;
        });

        await this.saveCollection(collectionName, newCollection);
        return true;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

module.exports = new FileStorage();