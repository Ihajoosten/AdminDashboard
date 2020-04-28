const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretkey = require('../Configs/config').secretkey;
const database = require('../Configs/database');
const logger = require("../Configs/config").logger;
const auth = require('../Controllers/authentication.controllers');


router.post('/register', async (req, res) => {

});

router.post('/login', async (req, res) => {

});

router.patch('reset-password', async (req, res) => {

});

router.get('/validateToken', async(req, res) => {
    
});
module.exports = router;