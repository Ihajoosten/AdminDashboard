/* eslint-disable no-unused-vars */
const sql = require('mysql');
const config = require('./config').databaseConfig;
const testConfig = require('./config').testDBConfig;
const logger = require('./config').logger;
const prodConnection = sql.createConnection(config);
const devConnection = sql.createConnection(testConfig);

module.exports = {
    executeStatement: (query, inserts, callback) => {
        let connection = sql.createConnection(config);

        if (process.env.NODE_ENV === 'dev') { connection = sql.createConnection(testConfig); }

        query = sql.format(query, inserts);

        connection.connect(error => {
            if (error) logger.error(error.message);

            connection.query(query, (err, result) => {
                if (err) {
                    logger.error('error', err.toString());
                    callback(err, null);
                    connection.destroy();
                    return;
                }
                if (result) {
                    callback(null, result);
                    connection.destroy();
                    return;
                }
            });
        });
    },
    handleResponse: (req, err, rows, res) => {
        if (!handleError(err, rows, res)) {
            if (req.token) {
                res.status(200).json({ result: rows, token: req.token });
            } else {
                res.status(200).json({ result: rows });
            }
        }
    }
};

function handleError(err, rows, res) {
    if (err) {
        res.status(500).send({
            status: 500,
            message: 'Something went wrong in the database'
        }).end();
        return true;
    }
    return false;
}
