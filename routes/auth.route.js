const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');


// further routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);


module.exports = router;
