/*
 * Title: Handle Data
 * Description: Store and Retrieve data 
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */


// dependencies 
const fs = require('fs');
const path = require('path');

// Module Scafolding 
const db = {};

// data base directory
db.baseDir = path.join(__dirname, '../../.data/')


//*******  write data to file  *******/ 
db.write = (folder = "", fileName, data, callback) => {
    // open file for writing
    const filePath = db.baseDir + folder + "/"+ fileName + ".json";
    fs.open(filePath, 'wx', (openError, fd) => {
        if(!openError && fd) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data into file and close it
            fs.writeFile(fd, stringData, (writeError) => {
                if(!writeError) {
                    fs.close(fd, (closeError) => {
                        if(!closeError) {
                            callback(false);
                        }
                        else {
                            callback(closeError)
                        }
                    })
                }
                else {
                    callback(writeError)
                }
            })
        }
        else {
            callback(openError);
        }
    })
}

//*******  read data from file  *******/ 
db.read = (folder = "", fileName, callback) => {
    const filePath = db.baseDir + folder +"/"+ fileName + ".json";
    fs.readFile(filePath, "utf8", (err, data) => {
        callback(err, data)
    })
}

//*******  update data to file  *******/ 
db.update = (folder = "", fileName, data, callback) => {
    const filePath = db.baseDir + folder +"/"+ fileName + ".json";
    fs.open(filePath, "r+", (openErr, fd) => {
        if(!openErr && fd) {
           const stringData = JSON.stringify(data);

           // truncate the file
           fs.truncate(filePath, (truncateErr) => {
                if(truncateErr) {
                    console.log("Error truncating file.");
                    callback(truncateErr);
                }
                else {
                    // write to the file and close it
                    fs.writeFile(filePath, stringData, (writeErr) => {
                        if(writeErr) {
                            console.log("Error writing into the file!")
                            callback(writeErr);
                        }
                        else {
                            // close the file
                            fs.close(fd, (closeErr) => {
                                if(closeErr) {
                                    console.log("Error closing the file!")
                                    callback(closeErr);
                                }
                                else {
                                    callback(false);
                                }
                            })
                        }
                    })
                }
           })
        }
        else {
            console.log("Error updating. File may not exist.")
            callback(openErr);
        }
    })  
}

//******* delete data from file  *******/ 
db.delete = (folder = "", fileName, callback) => {
    const filePath = db.baseDir + folder +"/"+ fileName + ".json";
    fs.unlink(filePath, (deleteErr) => {
        if(deleteErr) {
            console.log("Error deleting file");
            callback(deleteErr);
        }
        else {
            callback(false);
        }
    })
}

module.exports = db;