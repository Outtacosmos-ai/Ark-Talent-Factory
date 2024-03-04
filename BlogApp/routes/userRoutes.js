const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.logOut);

module.exports = router;