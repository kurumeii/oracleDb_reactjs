const path = require("path");
const findDotEnv = path.resolve(__dirname + '../../.env');
require("dotenv").config({path: findDotEnv});

module.exports = {
    webConfig: {
        port: process.env.PORT || "5000",
        ip: process.env.IP || "localhost",
        baseURL: process.env.URL || "http://localhost:3000",
    },
    connectionPool: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        connectString: process.env.DB_CONN,
    }
}
