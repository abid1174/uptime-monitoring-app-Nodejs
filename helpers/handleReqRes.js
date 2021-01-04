/*
 * Title: Handle Request Response
 * Description: Handle API request and response
 * Author: Abid Al Amin
 * Date: 08 Dec, 2020
 */
// Dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');

// handler object - module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // handle request
  // get the url and parse it
  const parsedUrlObject = url.parse(req.url, true);
  const pathName = parsedUrlObject.pathname.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();
  const queryString = parsedUrlObject.query;
  const headerObject = req.headers;

  const decoder = new StringDecoder('utf-8');
  let bodyData = '';
  req.on('data', (buffer) => {
    bodyData += decoder.write(buffer);
  });

  req.on('end', () => {
    bodyData += decoder.end();
    console.log(bodyData);
    res.end('Hello World');
  });

  // console.log(parsedUrlObject);
  // console.log(headerObject);
  // handle response
};

module.exports = handler;
