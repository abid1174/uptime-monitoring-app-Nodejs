"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _string_decoder = require("string_decoder");

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * Title: Handle Request Response
 * Description: Handle API request and response
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */
// Dependencies
// handler object - module scaffolding
var reqResHandler = {};

reqResHandler.handleReqRes = function (req, res) {
  // handle request
  // get the url and parse it
  var parsedUrlObject = _url["default"].parse(req.url, true);

  var pathName = parsedUrlObject.pathname.replace(/^\/+|\/+$/g, '');
  var method = req.method.toLowerCase();
  var queryString = parsedUrlObject.query;
  var headerObject = req.headers;
  var decoder = new _string_decoder.StringDecoder('utf-8');
  var bodyData = '';
  req.on('data', function (buffer) {
    bodyData += decoder.write(buffer);
  });
  req.on('end', function () {
    bodyData += decoder.end();
    console.log(bodyData);
    res.end('Hello World');
  });
};

var _default = reqResHandler;
exports["default"] = _default;