const database = require('../Configs/database');
const logger = require('../Configs/config').logger;
const jwt = require('jsonwebtoken');
const secret = require('../Configs/config').secretkey;

module.exports = {
    getUserById: (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM users WHERE Id = ${id}`;
        const inserts = [id];

        database.executeStatement(query, inserts, (err, rows) => {
            database.handleResponse(req, err, rows, res);
        });
    },
    validateToken: (req, res, next) => {
        logger.trace('validateToken aangeroepen');
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            logger.warn('Validate token failed! No authorization header');
            return res.status(401).json({ message: 'No authorization header included', code: 401 });
        }
        const token = authHeader.substring(7, authHeader.length);
        jwt.verify(token, secret, err => {
            if (err) {
                logger.warn('Validate token failed! Not Authorized ');
                return res.status(401).json({ message: 'Not authorized', code: 401 });
            }
            const payload = jwt.decode(token);

            if (payload.user.username && payload.user.id) {
                req.userId = payload.user.id;
                req.username = payload.user.username;
                req.token = token;
                next();
            } else {
                logger.warn('Validate token failed! No user id');
                next({ message: 'Missing user id', code: 404 });
            }
        });
    }
};