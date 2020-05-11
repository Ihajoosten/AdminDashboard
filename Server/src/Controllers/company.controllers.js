/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
const database = require('../Configs/database');
const logger = require('../Configs/config').logger;
const Company = require('../Models/company.models');

module.exports = {
    getCompany: (req, res) => {
        const companyId = req.params.companyId
        const query = `SELECT * FROM companies WHERE Id = '${companyId}'`;

        database.executeStatement(query, [companyId], (err, rows) => {
            if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
            if (!rows[0]) { res.status(404).json({ message: 'Invalid Company!' }).end(); return; }
            database.handleResponse(req, err, rows, res);
        });
    },
    getCompanies: (req, res) => {
        const query = 'SELECT * FROM companies';

        database.executeStatement(query, [''], (err, rows) => {
            if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
            if (!rows[0]) { res.status(404).json({ message: 'No companies found' }).end(); return; }
            database.handleResponse(req, err, rows, res);
        });
    },
    addCompany: (req, res) => {
        let newCompany = new Company();
        const body = req.body;

        switch (body) {
            case !body:
                res.status(400).json({ message: 'Undefinded body' }).end();
                break;
            case (!body.name || body.name === '') && body:
                res.status(400).json({ message: 'Undefined name' }).end();
                break;
            case (!body.branch || body.branch === '') && body:
                res.status(400).json({ message: 'Undefined branch' }).end();
                break;
            case (!body.department || body.department === '') && body:
                res.status(400).json({ message: 'Undefined department' }).end();
                break;
            case (!body.email || body.email === '') && body:
                res.status(400).json({ message: 'Undefined email' }).end();
                break;
            case (!body.phone || body.phone === '') && body:
                res.status(400).json({ message: 'Undefined phone' }).end();
                break;

            default:
                newCompany.name = body.name;
                newCompany.branch = body.branch;
                newCompany.department = body.department;
                newCompany.phone = body.phone;
                newCompany.email = body.email;

                const query = `INSERT INTO companies VALUES('',
                    '${newCompany.name}',
                    '${newCompany.branch}',
                    '${newCompany.department}',
                    '${newCompany.email}',
                    '${newCompany.phone}'            
                )`;

                database.executeStatement(query, [newCompany], (err, rows) => {
                    if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
                    if (rows) {
                        let obj = {
                            Id: rows.insertId,
                            Name: newCompany.name,
                            Branch: newCompany.branch,
                            Department: newCompany.department,
                            Email: newCompany.email,
                            Phone: newCompany.phone
                        }
                        res.status(200).json({ message: 'Created new company!', object: obj }).end(); return;
                    }
                });
                break;
        }
    },
    editCompany: (req, res) => {
        const body = req.body;
        const companyId = req.params.id;
        const searchQuery = `SELECT * FROM companies WHERE Id = '${companyId}'`;
        const updateQuery = `UPDATE companies SET 
            Name = '${body.name}',
            Branch = '${body.branch}',
            Department = '${body.department}',
            Email = '${body.email}',
            Phone = '${body.phone}'
            WHERE Id = '${companyId}'`;

        database.executeStatement(searchQuery, [companyId], (error, result) => {
            if (error) { res.status(500).json({ message: 'Error: ' + error.toString() }).end(); return; }
            if (!result[0]) { res.status(404).json({ message: 'Invalid Company!' }).end(); return; }

            database.executeStatement(updateQuery, [companyId], (err, rows) => {
                if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
                database.handleResponse(req, err, rows, res);
            });
        });
    },
    deleteCompany: (req, res) => {
        const companyId = req.params.id;
        const searchQuery = `SELECT * FROM companies WHERE Id = '${companyId}'`;
        const deleteQuery = `DELETE FROM companies WHERE Id = ' ${companyId}'`;

        database.executeStatement(searchQuery, [companyId], (error, result) => {
            if (error) { res.status(500).json({ message: 'Error: ' + error.toString() }).end(); return; }
            if (!result[0]) { res.status(404).json({ message: 'Invalid Company!' }).end(); return; }

            database.executeStatement(deleteQuery, [companyId], (err, rows) => {
                if (err) { res.status(500).json({ message: 'Error: ' + err.toString() }).end(); return; }
                database.handleResponse(req, err, rows, res);
            });
        });
    },
}