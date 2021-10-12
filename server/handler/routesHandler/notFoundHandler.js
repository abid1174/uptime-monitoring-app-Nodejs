/*
 * Title: Not Found Handler
 * Description: A route handler which is responsible for Not found Item
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */

// scaffolding
const notFoundHandler = {};

notFoundHandler.handle = (request, callback) => {
    
    callback(404, {
        message: "Not Found",
        status: false
    });
}

module.exports = notFoundHandler;