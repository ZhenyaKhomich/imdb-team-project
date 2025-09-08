const express = require('express');
const WatchlistController = require("../controllers/watchlist.controller");
const router = express.Router();
const Auth = require("../utils/common/auth");

router.get('/', WatchlistController.getWatchlist);
router.post('/', Auth.authenticate, WatchlistController.addToWatchlist);
router.delete('/:id', Auth.authenticate, WatchlistController.removeFromWatchlist);

module.exports = router;