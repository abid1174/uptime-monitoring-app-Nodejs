/*
 * Title: Uptime Monitoring Application
 * Description: A Restful API to monitor up or down time of user defined links
 * Author: Abid Al Amin
 * Date: 08 Dec, 2020
 */

// Dependencies
import http from 'http';
import { handleReqRes } from './helpers/handleReqRes';

// App object - module scaffolding
const app = {};

// Configuration
app.config = {
  port: 3000,
};

// Create Server
app.createServer = () => {
  const server = http.createServer(handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`awesome! server is listening on port ${app.config.port}`);
  });
};
// start the server
app.createServer();


export default app;