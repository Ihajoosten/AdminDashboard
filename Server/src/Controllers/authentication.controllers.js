/* eslint-disable no-case-declarations */
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
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header included', code: 401 });
    }
    const token = authHeader.substring(7, authHeader.length);
    jwt.verify(token, secret, err => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized', code: 401 });
      }
      const payload = jwt.decode(token);

      if (payload.user.Name && payload.user.Id) {
        req.userId = payload.user.Id;
        req.token = token;
        next();
      } else {
        next({ message: 'Missing user id', code: 404 });
      }
    });
  },
  requireLogin: (req, res, next) => {
    const token = decodeToken(req);
    if (!token) {
      return res.status(401).json({ message: "You must be logged in." });
    }
    next();
  },
  registerUser: async (req, res) => {
    const body = req.body;

    // if somethng is undefined return given 400 status
    switch (body) {
      case !body:
        res.status(400).json({ message: 'Bad Request - body was undefined' }).end();
        break;

      case (!body.firstname && body.firstname === '') && body:
        res.status(400).json({ message: 'Bad Request - firstname was undefined' }).end();
        break;

      case (!body.lastname && body.lastname === '') && body:
        res.status(400).json({ message: 'Bad Request - lastname was undefined' }).end();
        break;

      case (!body.email && body.email === '') && body:
        res.status(400).json({ message: 'Bad Request - email was undefined' }).end();
        break;

      case (!body.birthday && body.birthday === '') && body:
        res.status(400).json({ message: 'Bad Request - birthday was undefined' }).end();
        break;

      case (!body.phone && body.phone === '') && body:
        res.status(400).json({ message: 'Bad Request - phone was undefined' }).end();
        break;

      case (!body.password && body.password === '') && body:
        res.status(400).json({ message: 'Bad Request - password was undefined' }).end();
        break;

      default:
        let newUser = new User();
        const lookupEmail = `SELECT Email FROM users WHERE Email = '${req.body.email}'`;



        database.executeStatement(lookupEmail, [req.body.email], (error, result) => {
          if (error) { res.status(500).json({ message: 'Error: ' + error.toString() }).end(); return; }
          if (result[0]) { res.status(409).json({ message: 'Email already taken!' }).end(); return; }

          newUser.firstname = req.body.firstname;
          newUser.lastname = req.body.lastname;
          newUser.email = req.body.email;
          newUser.birthday = req.body.birthday;
          newUser.phone = req.body.phone;

          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) { res.status(400).json({ message: 'Unable to generate hash!' }).end(); return; }


            const query = `INSERT INTO users VALUES('',
                      '${newUser.firstname}',
                      '${newUser.lastname}',
                      '${newUser.email}',
                      '${newUser.birthday}',
                      '${newUser.phone}',
                      '${hash}')`;

            database.executeStatement(query, [newUser], (er, rows) => {
              database.handleResponse(req, er, rows, res);
            });
          });
        });
    }
  },
  loginUser: (req, res) => {
    const body = req.body;
    // if somethng is undefined return given 400 status
    switch (body) {
      case !body.email && !body.password && body:
        res.status(400).json({ message: 'Bad Request - body was undefined' }).end();
        break;

      case (!body.email && body.email === '') && body:
        res.status(400).json({ message: 'Bad Request - email was undefined' }).end();
        break;

      case (!body.password || body.password === '') && body:
        res.status(400).json({ message: 'Bad Request - password was undefined' }).end();
        break;

      default:
        const lookupEmailQuery = `SELECT Email FROM users WHERE Email = '${body.email}'`;
        const lookupUserQuery = `SELECT * FROM users WHERE Email = '${body.email}'`;

        // lookup if email exists in database
        database.executeStatement(lookupEmailQuery, [body.email], (error, result) => {
          if (error) { res.status(500).json({ message: 'Error: ' + error.toString() }).end(); return; }
          if (!result[0]) { res.status(404).json({ message: 'Email does not exist!' }).end(); return; }

          // lookup if user in database
          database.executeStatement(lookupUserQuery, [body.email], (er, rows) => {
            if (er) { res.status(500).json({ message: 'Error: ' + er.toString() }).end(); return; }
            if (rows) {
              bcrypt.compare(req.body.password, rows[0].Password, (err, isMatch) => {
                if (err) { res.status(500).json('Error: ' + err.toString()).end(); return; }
                if (isMatch) {
                  let user = {
                    id: rows[0].Id,
                    first: rows[0].Firstname,
                    last: rows[0].Lastname,
                    email: rows[0].Email
                  }
                  const token = generateJWT(user);
                  res.status(200).json({ message: 'Logged in successfully!', token: token }).end();
                } else {
                  res.status(404).json({ message: 'Invalid password!' }).end();
                  return;
                }
              })
            }
          });
        });
        break;
    }
  },
  updatePassword: (req, res) => {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const lookupUserQuery = `SELECT * FROM users WHERE Email = '${email}'`;

    database.executeStatement(lookupUserQuery, [email], (error, result) => {
      if (error) { res.status(500).json({ message: 'Error: ' + error.toString() }).end(); return; }

      if (!result[0]) { res.status(401).json({ message: 'Invalid Email!' }).end(); return; }

      if (bcrypt.compareSync(oldPassword, result[0].Password)) {
        bcrypt.hash(newPassword, 10, (er, hash) => {
          if (er) { res.status(500).json({ message: 'Error: ' + er.toString() }).end(); return; }
          const updatePasswordQuery = `UPDATE users SET Password = '${hash}' WHERE Email = '${email}'`;

          database.executeStatement(updatePasswordQuery, [hash], (err, rows) => {
            database.handleResponse(req, err, rows, res);
          });
        });
      } else {
        res.status(401).json({ message: 'old password is invalid!' }).end();
        return;
      }
    });
  }
};

function generateJWT(user) {
  const tokenData = { Id: user.id, Name: (user.first + ' ' + user.last), Email: user.email };
  return jwt.sign({ user: tokenData }, secret, {
    algorithm: "HS512",
    expiresIn: Math.floor(Date.now() / 1000) + ((60 * 60) * 24) // expires in 24 hours
  });
}

function decodeToken(req) {
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
}