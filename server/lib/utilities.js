/**
 * Title: Utility functions
 * Desc: Various utility functions
 * Author: Abid Al Amin
 * Date: 16 oct, 2021
 */

// dependencies
const crypto = require('crypto');
const environment = require('../lib/environments');

const utilities = {};

utilities.parseJSON = (jsonString) => {
    let res;
    try {
        res = JSON.parse(jsonString);
    }
    catch {
        res = {};
    }

    return res;
}

utilities.senitize = (data) => {
    if(typeof(data) === 'string' && data.length > 0) {
        data = data.trim();
    }
    else {
        data = "";
    }
    return data;
}

utilities.senitizePhn = (data) => {
    if(typeof(data) === 'string' && data.length > 0) {
        data = data.trim();

        if(data.length !== 11) {
            data = "";
        }
    }
    else {
        data = "";
    }
    return data;
}

utilities.senitizeBool = (data) => {
    if(typeof(data) === "boolean") {
        return data;
    }
    else return false;
}

utilities.hash = (str) => {
    if(typeof(str) === "string" && str.length > 0) {
        const hash = crypto.createHmac('sha256', environment.secretKey)
        .update(str)
        .digest('hex');

        return hash;
    }
    else {
        return false;
    }
}

utilities.getRandomString = () => {
    let output = "";
    const strlen = 50;
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';

    for(let i=0; i<strlen; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        output = output + char;
    }
    return output;
}

module.exports = utilities;