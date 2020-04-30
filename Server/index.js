// required libraries
const express = require('express');
const app = express();
const morgan = require("morgan");
const logger = require('./Configs/config').logger;
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 247;


// routes
const AuthenticationRoutes = require('./Routes/authentication.routes');

// Specification server app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static('static'));

// setting up routes
app.use('/api/auth', AuthenticationRoutes);

// Handle 404's -> Not found
app.use((req, res) => {
    logger.debug('User [', req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        '] attempted to connect to ', req.originalUrl, ' and was sent 404 Not Found');
    res.status(404).send('Not found error: 404');
});

// Handle 500's -> Internal error
app.use((err, req, res) => {
    logger.error(err.stack);
    res.status(500).send('Internal server error: 500 - ' + err.statusMessage);
});


app.listen(port, () => logger.log(`App successfully started on ${app.mountpath} on port ${port}!`));


module.exports = app;