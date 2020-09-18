const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const authentication = require('../middlewares/auth.middleware');
const multer = require('multer');

// for accepting images/documents
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

// allowing only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Invalid File.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5   // allowing only 5MB images
    },
    fileFilter: fileFilter
});

// further routes
router.post('/signup', upload.single('image'), authController.signup);
router.post('/login', authController.login);
router.get('/getprofile', authentication, authController.getProfile);


module.exports = router;
