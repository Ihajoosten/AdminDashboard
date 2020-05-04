/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const product = require('../Controllers/product.controllers');
const auth = require('../Controllers/authentication.controllers');

router.get('/all', auth.validateToken, product.getAllProducts);

router.get('/:id', auth.validateToken, product.getProduct);

router.post('/add-product', auth.validateToken, product.addProduct);

router.put('/edit/:id', auth.validateToken, product.updateProduct);

router.delete('/delete/:id', auth.validateToken, product.deleteProduct);

module.exports = router;