const express = require('express');
const router = express.Router();
const database = require('../Configs/database');
const logger = require("../Configs/config").logger;
const product = require('../Controllers/transaction.controllers');


router.post('/add-transaction', async (req, res) => {

});

router.post('/get-transaction', async (req, res) => {

});

router.patch('/get-transactions', async (req, res) => {

});

/** TODO */
// router.get('/edit-invoice', async(req, res) => {
    
// });

/** TODO */
// router.get('/delete-invoice', async(req, res) => {
    
// });

module.exports = router;