/*
 * Title: User Handler
 * Description: A handler to handle user related requests
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */

const { senitize, senitizePhn, senitizeBool, hash, parseJSON } = require("../../lib/utilities");
const db = require('../../lib/db');

// scaffolding
const userHandler = {};

userHandler.handle = (request, callback) => {

    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if(acceptedMethods.indexOf(request.method) > -1) {
        userHandler._handleRequest[request.method](request, callback);
    }
    else {
        callback(405);
    }
}

userHandler._handleRequest = {
    post: (request, callback) => {
        let {firstName, lastName, phone, email, password, tnc} = request.body;

        firstName = senitize(firstName);
        lastName = senitize(lastName);
        phone = senitizePhn(phone);
        email = senitize(email);
        password = senitize(password);
        tnc = senitizeBool(tnc);

        if(firstName && lastName && phone && email && password && tnc ) {

            // check if the file already exists or not
            db.read('users', phone, (readErr, user) => {
                if(readErr) {
                    // create a new file inside db
                    const userObject = {
                        firstName,
                        lastName,
                        phone,
                        email,
                        password: hash(password),
                        tnc
                    }

                    db.write('users', phone, userObject, (createErr) => {
                        if(createErr) {
                            callback(500, {
                                message: "could not create user!",
                                status: false
                            })
                        }
                        else {
                            callback(200, {
                                message: "User created successfully!",
                                status: true
                            })
                        }
                    })
                }
                else {
                    console.log(readErr);
                    // file may already exists
                    callback(400, {
                        message: "File may already exists!",
                        status: false
                    });
                }
            })
        }
        else {
            callback(400, {
                message: "Something went wrong with requested data!",
                status: false
            })
        }

    },
    get: (request, callback) => {
        // check if phone number from parameter is valid
        const phone = senitizePhn(request.queryString.phone);

        if(phone) {
            // check if user exists with this phone
            db.read("users", phone, (err, u) => {

                if(err) {
                    callback(404, {
                        message: "Requested user not found",
                        status: false,
                    })
                }
                else {
                    const user = {...parseJSON(u)};
                    const {password, ...userObj } = user;
                    callback(200, {
                        data: userObj,
                        status: true
                    })
                }
            })
        }
        else {
            callback(404, {
                message: "user not found",
                status: false
            })
        }
    },
    put: (request, callback) => {
        
        let {firstName="", lastName="", phone="", email="", password=""} = request.body;

        firstName = senitize(firstName);
        lastName = senitize(lastName);
        phone = senitizePhn(phone);
        email = senitize(email);
        password = senitize(password);

        if(!phone) {
            callback(400, {
                message: "Invalid phone number!",
                status: false
            })
        }
        else {

            if(firstName || lastName || email || password) {
                db.read("users", phone, (readErr, userData) => {
                    if(readErr) {
                        callback(500, {
                            message: "Query error with the phone number!",
                            status: false
                        })
                    }
                    else {
                        let userObj = {}
                        let user = { ...parseJSON(userData)};

                        userObj.firstName = firstName ?? user.firstName;
                        userObj.lastName = lastName ?? user.lastName;
                        userObj.email = email ?? user.email;
                        userObj.password = password ? hash(password) : user.password;
                        userObj.tnc = user.tnc

                        // store new user object to db
                        db.update("users", phone, userObj, (updateErr) => {
                            if(updateErr) {
                                callback(500, {
                                    message: "There was an error on server!",
                                    status: false
                                })
                            }
                            else {
                                callback(200, {
                                    message: "User was updated successfully!",
                                    status: true
                                })
                            }
                        })
                    }
                })
            }
            else {
                callback(400, {
                    message: "Problem with the requested data!",
                    status: false
                })
            }
        }
    },
    delete: (request, callback) => {
        // check if phone number from parameter is valid
        const phone = senitizePhn(request.queryString.phone);

        if(phone) {
            // check if user exists with this phone
            db.read("users", phone, (err, u) => {

                if(err) {
                    callback(500, {
                        message: "There was a problem on server!",
                        status: false,
                    })
                }
                else {
                    db.delete("users", phone, (err) => {
                        if(err) {
                            callback(500, {
                                message: "Error deleting user!",
                                status: false
                            })
                        }
                        else {
                            callback(200, {
                                message: "User deleted successfully!",
                                status: true
                            })
                        }
                    })
                }
            })
        }
        else {
            callback(404, {
                message: "Error with requested data!",
                status: false
            })
        }
    }
};

module.exports = userHandler;