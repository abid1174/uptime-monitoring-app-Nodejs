/*
 * Title: Token Handler
 * Description: A handler to handle token related requests
 * Author: Abid Al Amin
 * Date: 11 Nov, 2021
 */

// const { senitize, senitizePhn, senitizeBool, hash, parseJSON } = require("../../lib/utilities");
const db = require('../../lib/db');
const { senitize, senitizePhn, hash, parseJSON, getRandomString } = require('../../lib/utilities');

// scaffolding
const tokenHandler = {};

tokenHandler.handle = (request, callback) => {

    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if(acceptedMethods.indexOf(request.method) > -1) {
        tokenHandler._handleRequest[request.method](request, callback);
    }
    else {
        callback(405);
    }
}

tokenHandler._handleRequest = {
    post: (request, callback) => {

        // check if requested phone and password is valid 
        let { phone, password } = request.body;

        phone = senitizePhn(phone);
        password = senitize(password);

        if(phone && password) {

            // check if the user exists with the requested phone
            db.read('users', phone, (err, userData) => {
                if(err) {
                    console.log(err);
                    callback(400, {
                        message: "User does not exists with this phone number!",
                        status: false
                    });
                }
                else {
                    const hashed = hash(password);
                    if(hashed === parseJSON(userData).password) {
                        let tokenObj = {};
                        const tokenId = getRandomString();
                        const exp = Date.now() + 60 * 60; 

                        tokenObj = {
                            phone,
                            exp,
                            id: tokenId,
                        }
                        
                        db.write("tokens", tokenId, tokenObj, (writeError) => {
                            if(writeError) {
                                callback(500, {
                                    message: "There was a problem on server!",
                                    status: false
                                });
                            }
                            else {
                                callback(201, {
                                    data: tokenObj,
                                    status: true,
                                })
                            }
                        })
                    }
                    else {
                        callback(400, {
                            message: "Password is not valid!",
                            status: false
                        });
                    }
                }
            })
        }
        
    },
    get: (request, callback) => {
        
        let { id: token } = request.queryString;
        token = senitize(token);
        
        if(token) {
            db.read("tokens", token, (err, tokenObjStr) => {
                if(err) {
                    callback(500, {
                        message: "There was a problem on server!",
                        status: false,
                    })
                }
                else {
                    callback(200, {
                        data: parseJSON(tokenObjStr),
                        status: true
                    })
                }
            })
        }
        else {
            callback(400, {
                status: false,
                message: "Invalid token!"
            })
        }

    },
    put: (request, callback) => {
    
    },
    delete: (request, callback) => {

    }
};

module.exports = tokenHandler;