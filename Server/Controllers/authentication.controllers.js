const database = require('../Configs/database');
const logger = require('../Configs/config').logger;
const jwt = require('jsonwebtoken');
const secret = require('../Configs/config').secretkey;
const bcrypt = require('bcrypt');
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
  registerUser: async (req, res) => {
    let newUser = new User();
    const lookupEmail = `SELECT Email FROM users WHERE Email = '${req.body.email}'`;

    database.executeStatement(lookupEmail, [req.body.email], (err, rows) => {
      if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
      if (rows[0]) { res.status(409).json({ Message: 'Email already taken!' }).end(); return; }

      newUser.firstname = req.body.firstname;
      newUser.lastname = req.body.lastname;
      newUser.email = req.body.email;
      newUser.birthday = req.body.birthday;
      newUser.phone = req.body.phone;

      // bcrypt.genSalt(5, (err, salt) => {
      //   if (err) { res.status(400).json({ Message: 'Unable to generate salt!' }).end(); return; }
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) { res.status(400).json({ Message: 'Unable to generate hash!' }).end(); return; }


        const query = `INSERT INTO users VALUES('',
                      '${newUser.firstname}',
                      '${newUser.lastname}',
                      '${newUser.email}',
                      '${newUser.birthday}',
                      '${newUser.phone}',
                      '${hash}')`;

        database.executeStatement(query, [newUser], (err, rows) => {
          database.handleResponse(req, err, rows, res);
        });
      });
    });
    // });
  },
  loginUser: (req, res) => {
    const body = req.body;

    // if somethng is undefined return given 400 status
    switch (body) {
      case !body.email && !body.password && body:
        logger.fatal('Empty body');
        res.status(400).json({ message: 'Bad Request - body was undefined' }).end();
        break;

      case (!body.email && body.email === '') && body:
        logger.fatal('Empty email')
        res.status(400).json({ message: 'Bad Request - email was undefined' }).end();
        break;

      case (!body.password || body.password === '') && body:
        logger.fatal('Empty password')
        res.status(400).json({ message: 'Bad Request - password was undefined' }).end();
        break;

      default:
        const lookupEmailQuery = `SELECT Email FROM users WHERE Email = '${body.email}'`;
        const lookupUserQuery = `SELECT * FROM users WHERE Email = '${body.email}'`;

        // lookup if email exists in database
        database.executeStatement(lookupEmailQuery, [body.email], (err, rows) => {
          if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
          if (!rows[0]) { res.status(404).json({ Message: 'Email does not exist!' }).end(); return; }

          // lookup if user in database
          database.executeStatement(lookupUserQuery, [body.email], (err, rows) => {
            if (err) { res.status(500).json({ Message: 'Error: ' + err.toString() }).end(); return; }
            if (rows) {
              bcrypt.compare(req.body.password, rows[0].Password, (err, result) => {
                if (err) { res.status(500).json('Error: ' + err.toString()).end(); return; }
                if (result) {
                  let user = {
                    id: rows[0].Id,
                    first: rows[0].Firstname,
                    last: rows[0].Lastname,
                    email: rows[0].Email
                  }
                  const token = generateJWT(user);
                  res.status(200).json({ Message: 'Logged in successfully!', token: token }).end();
                }
              })
            }
          });
        });
        break;
    }
  },
  updatePassword: (req, res) => {
    // TODO
  }
};

function generateJWT(user) {
  const tokenData = { Id: user.id, Name: (user.first + ' ' + user.last), Email: user.email };
  return jwt.sign({ user: tokenData }, "secret", {
    algorithm: "HS512",
    expiresIn: Math.floor(Date.now() / 1000) + ((60 * 60) * 24) // expires in 24 hours
  });
}
