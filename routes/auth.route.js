const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const authentication = require('../middlewares/auth.middleware');

// further routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/getprofile', authentication, authController.getProfile);


module.exports = router;
