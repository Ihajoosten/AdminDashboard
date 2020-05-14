/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
const database = require('../Configs/database');
const logger = require('../Configs/config').logger;
const Product = require('../Models/product.models');

module.exports = {
    getProduct: (req, res) => {
        const productId = req.params.id;
        const query = `SELECT * FROM companies WHERE Id = '${productId}'`;

        database.executeStatement(query, [productId], (err, rows) => {
            if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
            if (!rows[0]) { res.status(404).json({ message: 'Invalid Product!' }).end(); return; }
            database.handleResponse(req, err, rows, res);
        });
    },
    getAllProducts: (req, res) => {
        const query = 'SELECT * FROM products';

        database.executeStatement(query, [''], (err, rows) => {
            if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
            if (!rows[0]) { res.status(404).json({ message: 'No products found' }).end(); return; }
            database.handleResponse(req, err, rows, res);
        });
    },
    addProduct: (req, res) => {
        let newProduct = new Product();
        const body = req.body;
        switch (body) {
            case !body:
                res.status(400).json({ message: 'Undefinded body' }).end();
                break;
            case (!body.name || body.name === '') && body:
                res.status(400).json({ message: 'Undefined name' }).end();
                break;
            case (!body.description || body.description === '') && body:
                res.status(400).json({ message: 'Undefined description' }).end();
                break;
            case (!body.price || body.price === '') && body:
                res.status(400).json({ message: 'Undefined price' }).end();
                break;
            case (!body.companyId || body.companyId === '') && body:
                res.status(400).json({ message: 'Undefined companyId' }).end();
                break;
            case (!body.dateReleased || body.dateReleased === '') && body:
                res.status(400).json({ message: 'Undefined dateReleased' }).end();
                break;

            default:
                newProduct.name = body.name;
                newProduct.description = body.description;
                newProduct.price = body.price;
                newProduct.companyId = body.companyId;
                newProduct.dateReleased = body.dateReleased;

                const query = `INSERT INTO products VALUES('',
                    '${newProduct.name}',
                    '${newProduct.description}',
                    '${newProduct.price}',
                    '${newProduct.companyId}',
                    '${newProduct.dateReleased}'            
                )`;

                database.executeStatement(query, [newProduct], (err, rows) => {
                    if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
                    if (rows) {
                        let obj = {
                            Id: rows.insertId,
                            Name: newProduct.name,
                            Description: newProduct.description,
                            Price: newProduct.price,
                            CompanyId: newProduct.companyId,
                            DateReleased: newProduct.dateReleased
                        }
                        res.status(200).json({ message: 'Created new product!', object: obj }).end(); return;
                    }
                });
                break;
        }
    },
    updateProduct: (req, res) => {
        const body = req.body;
        const productId = req.params.id;
        const searchQuery = `SELECT * FROM products WHERE Id = '${productId}'`;
        const updateQuery = `UPDATE products SET 
            Name = '${body.name}',
            Description = '${body.description}',
            Price = '${body.price}',
            CompanyId = '${body.companyId}',
            DateReleased = '${body.dateRelease}'
            WHERE Id = '${productId}'`;

        database.executeStatement(searchQuery, [productId], (error, result) => {
            if (error) { res.status(500).json({ message: 'Error: ' + error.toString() }).end(); return; }
            if (!result[0]) { res.status(404).json({ message: 'Invalid Product!' }).end(); return; }

            database.executeStatement(updateQuery, [productId], (err, rows) => {
                if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
                database.handleResponse(req, err, rows, res);
            });
        });
    },
    deleteProduct: (req, res) => {
        const productId = req.params.id;
        const searchQuery = `SELECT * FROM products WHERE Id = '${productId}'`;
        const deleteQuery = `DELETE FROM products WHERE Id = ' ${productId}'`;

        database.executeStatement(searchQuery, [productId], (error, result) => {
            if (error) { res.status(500).json({ message: 'Error: ' + error.toString() }).end(); return; }
            if (!result[0]) { res.status(404).json({ message: 'Invalid Product!' }).end(); return; }

            database.executeStatement(deleteQuery, [productId], (err, rows) => {
                if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
                database.handleResponse(req, err, rows, res);
            });
        });
    },
}