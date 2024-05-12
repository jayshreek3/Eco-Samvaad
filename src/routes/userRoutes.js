const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Define user routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);

module.exports = router;
