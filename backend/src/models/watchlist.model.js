const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    aggregateRating: Number,
    voteCount: Number
});

const PrimaryImageSchema = new mongoose.Schema({
    url: String,
    width: Number,
    height: Number
});

const TitleSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    type: String,
    primaryTitle: String,
    originalTitle: String,
    primaryImage: PrimaryImageSchema,
    startYear: Number,
    runtimeSeconds: Number,
    genres: [String],
    rating: RatingSchema,
    plot: String
});

const WatchlistSchema = new mongoose.Schema({
    titles: [TitleSchema]
});

const WatchlistModel = mongoose.model('Watchlist', WatchlistSchema);
module.exports = WatchlistModel;