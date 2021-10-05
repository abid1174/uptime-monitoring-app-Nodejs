/*
 * Title: Handle Request Response
 * Description: Handle API request and response
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */


// Dependencies
import { StringDecoder } from "string_decoder";
import url from 'url';

// handler object - module scaffolding
const reqResHandler = {};

reqResHandler.handleReqRes = (req, res) => {
  console.log("listening")
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

};

export default reqResHandler;
