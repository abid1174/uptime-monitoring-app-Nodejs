/*
 * Title: Uptime Monitoring Application
 * Description: A Restful API to monitor up or down time of user defined links
 * Author: Abid Al Amin
 * Date: 08 Dec, 2020
 */

// Dependencies
const http = require('http');
const reqResHandler =  require('./handler/reqResHandler/handleReqRes');
const environment = require('./lib/environments');
const db = require('./lib/db');

// App object - module scaffolding
const app = {};

// Configuration
app.config = {};

// Create Server
app.createServer = () => {
  const server = http.createServer(reqResHandler.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`server is listening on port ${environment.port}`);
  });
};
// start the server
app.createServer();

