module.exports = {
    async up(db, client) {
        await db.collection('watchlists').insertOne({
            titles: []
        });
    },
    async down(db, client) {
        await db.collection('watchlists').deleteMany({});
    }
};