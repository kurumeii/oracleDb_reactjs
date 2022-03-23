const express = require('express');
const app = express();
const config = require('./config/config');
const oracledb = require('oracledb');
const http = require('http');
const httpServer = http.createServer(app);
//Load routes 
app.use("/api/login", require('./login/router'));
app.use("/api/home", require('./home/router'));


//
app.listen(config.webConfig.port, config.webConfig.ip, (err) => {
   if (err) {
      console.log(`Unable to listen, there's something wrong with the connection`);
      process.exitCode(1);
   }
   console.log(`Server is currently listening on: \nhttp://${config.webConfig.ip}:${config.webConfig.port}`);
   initializeDB();
})

function initializeDB() {
   let libPath;
   console.log("Initializing database module")
   //Tell node-oracledb to find the default path
   if (process.platform = 'win32') {
      // if not set, node-oracledb will try to find path inside ~/node_modules/oracledb/build/release/*
      try {
         oracledb.initOracleClient();
      } catch (error) {
         console.log(error);
         process.exit(1);
      }

   }


}

async function shutdown(e) {
   let err = e;

   console.log('Shutting down');

   try {
      console.log('Closing web server module');
      httpServer.close();
   } catch (e) {
      console.log('Encountered error', e);

      err = err || e;
   }

   console.log('Exiting process');
   if (err) {
      process.exit(1);
   } else {
      process.exit(0);
   }
}


process.on('SIGTERM', () => {
   console.log('Received SIGTERM');

   shutdown();
});

process.on('SIGINT', () => {
   console.log('Received SIGINT');

   shutdown();
});

process.on('uncaughtException', err => {
   console.log('Uncaught exception');
   console.error(err);

   shutdown(err);
});

