/*
 * Title: Handle Request Response
 * Description: Handle API request and response
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */


// Dependencies
const { StringDecoder } = require('string_decoder')
const url = require('url');

// Local Dependencies
const routes = require('../../routes');
const notFoundHandler =  require("../routesHandler/notFoundHandler");


// handler object - module scaffolding
const reqResHandler = {};

reqResHandler.handleReqRes = (req, res) => {
  console.log("listening")
  // handle request
  // get the url and parse it
  const parsedUrlObject = url.parse(req.url, true);
  const path = parsedUrlObject.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();
  const queryString = parsedUrlObject.query;
  const headerObject = req.headers;

  const requestObject = {
    parsedUrlObject,
    path,
    trimmedPath,
    method,
    queryString,
    headerObject
  }

  const decoder = new StringDecoder('utf-8');
  let bodyData = '';

  // Route wise Response
  const choosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

  // Request data collection
  req.on('data', (buffer) => {
    bodyData += decoder.write(buffer);
  });

  // Request data collection done
  req.on('end', () => {
    bodyData += decoder.end();
    

    choosenHandler.handle(requestObject, (statusCode, payload) => {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
      payload = typeof(payload) === 'object' ? payload : {};
  
      const payloadString = JSON.stringify(payload);
  
      res.writeHead(statusCode);
      res.end(payloadString);
    })

    res.end('Hello World');
  });

};

module.exports = reqResHandler;
