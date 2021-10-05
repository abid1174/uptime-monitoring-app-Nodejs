"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _handleReqRes = require("./helpers/handleReqRes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * Title: Uptime Monitoring Application
 * Description: A Restful API to monitor up or down time of user defined links
 * Author: Abid Al Amin
 * Date: 08 Dec, 2020
 */
// Dependencies
// App object - module scaffolding
var app = {}; // Configuration

app.config = {
  port: 3000
}; // Create Server

app.createServer = function () {
  var server = _http["default"].createServer(_handleReqRes.handleReqRes);

  server.listen(app.config.port, function () {
    console.log("listening on port ".concat(app.config.port));
  });
}; // start the server


app.createServer();
var _default = app;
exports["default"] = _default;