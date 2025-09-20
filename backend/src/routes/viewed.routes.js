const express = require('express');
const ViewedController = require("../controllers/viewed.controller");
const router = express.Router();
const Auth = require("../utils/common/auth");

router.get('/', ViewedController.getViewed);
router.post('/', Auth.authenticate, ViewedController.addToViewed);
// router.delete('/:id', Auth.authenticate, ViewedController.removeFromViewed);
router.delete('/', Auth.authenticate, ViewedController.clearAllViewed);

module.exports = router;