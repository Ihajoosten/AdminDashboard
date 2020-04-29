module.exports = {
    logger: require("tracer").colorConsole({
  
        format: [  
            "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
            {  
                error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})" // error format
            }
        ],
        dateformat: "HH:MM:ss",
        preprocess: (data) => {
            data.title = data.title.toUpperCase();
        }
    }),
    secretkey: '',
    databaseConfig: { 
        host: process.env.DB_HOSTNAME || '127.0.0.1', 
        user: process.env.DB_USERNAME || 'root', 
        password: process.env.DB_PASSWORD || '', 
        database: process.env.DB_DATABASENAME || 'AdminDashboard', 
        multipleStatements: true 
    } 
};