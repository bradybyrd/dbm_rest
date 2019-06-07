const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');
const database = require('./database.js');
const morgan = require('morgan');
const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
	// Add morgan logging to webserver
	app.use(morgan('combined'));
  // Parse incoming JSON requests and revive JSON.
  app.use(express.json({
    reviver: reviveJson
  }));
	// API routing
	app.use('/api', router);
	
    httpServer = http.createServer(app);
 
    app.get('/', async (req, res) => {
	  const result = await database.simpleExecute('select user, systimestamp from dual');
	  const user = result.rows[0].USER;
	  const date = result.rows[0].SYSTIMESTAMP;
      res.end(`Hello Database!\nDB User: ${user}\nDate: ${date}`);
    });
 
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}
 
module.exports.initialize = initialize;

 
function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
 
      resolve();
    });
  });
}
 
module.exports.close = close;
 
function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}