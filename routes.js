const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/auth.route');

// app routes
router.use('/auth', authRoutes);


module.exports = router;
