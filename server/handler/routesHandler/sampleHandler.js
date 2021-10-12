/*
 * Title: 
 * Description: A Restful API to monitor up or down time of user defined links
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */

// scaffolding
const sampleHandler = {};

sampleHandler.handle = (request, callback) => {

    callback(200, {
        message: "this is a sample url",
        status: true,
    })
}

module.exports = sampleHandler;