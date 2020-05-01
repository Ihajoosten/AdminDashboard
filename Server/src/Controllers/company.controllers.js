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
            if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
            if (!rows[0]) { res.status(404).json({ Message: 'Invalid Company!' }).end(); return; }
            database.handleResponse(req, err, rows, res);
        });
    },
    getCompanies: (req, res) => {
        const query = 'SELECT * FROM companies';

        database.executeStatement(query, [], (err, rows) => {
            if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
            if (!rows[0]) { res.status(404).json({ Message: 'No companies found' }).end(); return; }
            database.handleResponse(req, err, rows, res);
        });
    },
    addCompany: (req, res) => {
        let newCompany = new Company();

        newCompany.name = req.body.name;
        newCompany.branch = req.body.branch;
        newCompany.department = req.body.department;
        newCompany.phone = req.body.phone;
        newCompany.email = req.body.email;

        const query = `INSERT INTO companies VALUES('',
            '${newCompany.name}',
            '${newCompany.branch}',
            '${newCompany.deleteCompany}',
            '${newCompany.email}',
            '${newCompany.phone}',            
        )`;

        database.executeStatement(query, [newCompany], (err, rows) => {
            if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
            database.handleResponse(req, err, rows, res);
        });
    },
    editCompany: (req, res) => {
        const body = req.body;
        const companyId = req.params.id;
        const searchQuery = `SELECT * FROM companies WHERE Id = '${companyId}'`;
        const updateQuery = `UPDATE companies SET 
            name = '${body.name}',
            Branch = '${body.branch}',
            Department = '${body.department}',
            Email = '${body.email}',
            Phone = '${body.phone}'
            WHERE Id = '${companyId}'`;

        database.executeStatement(searchQuery, [companyId], (err, rows) => {
            if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
            if (!rows[0]) { res.status(404).json({ Message: 'Invalid Company!' }).end(); return; }

            database.executeStatement(updateQuery, [body], (err, rows) => {
                if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
                database.handleResponse(req, err, rows, res);
            });
        });
    },
    deleteCompany: (req, res) => {
        const companyId = req.params.id;
        const searchQuery = `SELECT * FROM companies WHERE Id = '${companyId}'`;
        const deleteQuery = `DELETE FROM companies WHERE Id = ' ${companyId}'`;

        database.executeStatement(searchQuery, [companyId], (err, rows) => {
            if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
            if (!rows[0]) { res.status(404).json({ Message: 'Invalid Company!' }).end(); return; }

            database.executeStatement(deleteQuery, [companyId], (err, rows) => {
                if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
                database.handleResponse(req, err, rows, res);
            });
        });
    },
}