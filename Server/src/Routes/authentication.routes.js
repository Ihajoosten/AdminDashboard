const express = require('express');
const router = express.Router();
const auth = require('../Controllers/authentication.controllers');

router.post('/register', auth.registerUser);

router.post('/login', auth.loginUser);

router.patch('/reset-password', auth.validateToken, auth.updatePassword);

router.get('/validateToken', auth.validateToken);

router.get('/get-user/:id', auth.validateToken, auth.getUserById);

module.exports = router;