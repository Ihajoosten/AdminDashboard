const database = require('../Configs/database');
const logger = require('../Configs/config').logger;

module.exports = {
    getUserById: (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM users WHERE Id = ${id}`;
        const inserts = [id];

        database.executeStatement(query, inserts, (err, rows) => {
            database.handleResponse(req, err, rows, res);
        });
    }
};