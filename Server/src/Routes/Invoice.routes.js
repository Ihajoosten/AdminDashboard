const express = require('express');
const router = express.Router();
const database = require('../Configs/database');
const logger = require("../Configs/config").logger;
const product = require('../Controllers/invoice.controllers');


// router.post('/add-invoice', async (req, res) => {

// });

// router.post('/get-invoice', async (req, res) => {

// });

// router.patch('/get-invoices', async (req, res) => {

// });

// router.get('/edit-invoice', async(req, res) => {
    
// });

// router.get('/delete-invoice', async(req, res) => {
    
// });

module.exports = router;