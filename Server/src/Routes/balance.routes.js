const express = require('express');
const router = express.Router();
const database = require('../Configs/database');
const logger = require("../Configs/config").logger;
const product = require('../Controllers/balance.controllers');

router.post('/get-balance', async (req, res) => {

});

router.patch('/get-invoice', async (req, res) => {

});


module.exports = router;