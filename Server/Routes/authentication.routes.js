const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretkey = require('../Configs/config').secretkey;
const database = require('../Configs/database');
const auth = require('../Controllers/authentication.controllers');


router.post('/register', async (req, res) => {

});

router.post('/login', async (req, res) => {

});

router.patch('reset-password', async (req, res) => {

});

router.get('/validateToken', async(req, res) => {
    
});

router.get('/get-user/:id', auth.getUserById);

module.exports = router;