/*
 * Title: Routes
 * Description: Project Routes
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */

// dependencies
const sampleHandler = require('./handler/routesHandler/sampleHandler');
const userHandler = require('./handler/routesHandler/userHandler');
const tokenHandler = require('./handler/routesHandler/tokenHandler');

const routes = {
    'sample': sampleHandler,
    'user': userHandler,
    'token': tokenHandler,
}

module.exports = routes;