const express = require('express');
const router = express.Router();
const auth = require('../Controllers/authentication.controllers');


router.post('/register', async (req, res) => {

});

router.post('/login', async (req, res) => {

});

router.patch('reset-password', async (req, res) => {

});

router.get('/validateToken', async(req, res) => {
    
});

router.get('/get-user/:id', auth.validateToken, auth.getUserById);

module.exports = router;