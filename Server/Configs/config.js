module.exports = {

    logger: require("tracer").colorConsole({
  
        format: [  
            "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
            {  
                error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})" // error format
            }
        ],
        dateformat: "HH:MM:ss",
        preprocess: function (data) {
            data.title = data.title.toUpperCase();
        },
        level: "debug"
    }),
  
    database: {
        host: process.env.DB_HOSTNAME || 'localhost',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_DATABASENAME || 'AdminDashboard',
        multipleStatements: true  
    }
};