const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const logger = ('../Configs/config.js').logger;

const config = {
    server: 'LAPTOP-6TJLV8PJ',
    options: {
        database: 'AdminDashboard'
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'Kaya1412'
        }
    }
};

async function executeStatement(statement, onRow, onComplete) {
    logger.debug('Connecting...');
    const connection = new Connection(config);
    connection.on('connect', (err) => {
        logger.debug('Connect state');
        if (err) {
            logger.debug(err);
        } else {
            logger.debug(' == Connected == ');
            handleStatement(connection, statement, onRow, onComplete);
        }
    });
}

function handleStatement(connection, statement, onRow, onComplete) {
    logger.debug('Handling');
    logger.debug('Statement : ' + statement);
    let request = new Request(statement, (err) => {
        if (err) logger.debug(err)
    });

    logger.debug('Constructed req');

    request.on('row', (columns) => {
        logger.debug('\n > New Entry => Executing task');
        onRow(columns);
    });

    request.on('requestCompleted', function () {
        onComplete();
    });

    connection.execSql(request);
}

module.exports.executeStatement = executeStatement;
