const database = require('../Configs/database');
const logger = require('../Configs/config').logger;
const jwt = require('jsonwebtoken');
const secret = require('../Configs/config').secretkey;
const User = require('../Models/user.models');

module.exports = {
  getUserById: (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM users WHERE Id = ${id}`;

    database.executeStatement(query, [id], (err, rows) => {
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
        req.token = token;
        next();
      } else {
        logger.warn('Validate token failed! No user id');
        next({ message: 'Missing user id', code: 404 });
      }
    });
  },
  generateJWT: user => {
    const tokenData = { username: user.name, id: user.id };
    return jwt.sign({ user: tokenData }, "secret", {
      algorithm: "HS256",
      expiresIn: Math.floor(Date.now() / 1000) + ((60 * 60) * 24) // expires in 24 hours
    });
  },
  decodeToken: req => {
    const token = req.headers["authorization"].replace(/^JWT\s/, "");
    if (!token) {
      logger.error("invalid token");
      return null;
    }
    try {
      const payload = jwt.decode(token);
      return payload;
    } catch (error) {
      logger.error(error);
      return null;
    }
  },
  requireLogin: (req, res, next) => {
    const token = decodeToken(req);
    if (!token) {
      return res.status(401).json({ message: "You must be logged in." });
    }
    next();
  },
  registerUser: (req, res) => {
    let newUser = new User();

    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.birthday = req.body.birthday;
    newUser.phone = req.body.phone;
    newUser.password = req.body.password;

    const query = `INSERT INTO users VALUES('',
    '${newUser.firstname}',
    '${newUser.lastname}',
    '${newUser.email}',
    '${newUser.birthday}',
    '${newUser.phone}',
    '${newUser.password}')`;

    database.executeStatement(query, [newUser], (err, rows) => {
      database.handleResponse(req, err, rows, res);
    });
  },
  loginUser: (req, res) => {
    const body = req.body;

    switch (body) {
      case body:
        logger.fatal('empty body');
        res.status(400).json({ message: 'Bad Request - body was undefined' }).end();
        break;
      
      case (!body.email || body.email === '') && body:
        logger.fatal('empty email')
        res.status(400).json({ message: 'Bad Request - email was undefined' }).end();
        break;
      
      case (!body.password || body.password === '') && body:
        logger.fatal('empty password')
        res.status(400).json({ message: 'Bad Request - password was undefined' }).end();
        break;
    }

    // const query = `SELECT * FROM users WHERE Email = '${req.body.email}' AND Password = '${req.body.password}'`;
    // database.executeStatement(query, [req.body.email, req.body.password], (err, rows) => {
    //   if (!rows[0]) res.status(404).json({ Message: 'User not found - Invalid login attempt' })
    //   if (rows[0]) {

    //   }
    // });
  },
  updatePassword: (req, res) => {

  }
};
