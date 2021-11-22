/*
 * Title: Environment
 * Description: Handle All environment related things
 * Author: Abid Al Amin
 * Date: 04 Oct, 2021
 */

const environments = {};

environments['staging'] = {
    port: 3000,
    envName: "staging",
    secretKey: "THISISASECRETKEYFORSTAGING",
}

environments['production'] = {
    port: 8000,
    envName: "production",
    secretKey: "THISISASECRETKEYFORPRODUCTION",
}

const currentEnvName = 
    typeof (process.env.NODE_ENV) === "string" ? process.env.NODE_ENV.trim() : "staging";

const environment = 
    typeof environments[currentEnvName] === "object" 
    ? environments[currentEnvName] : environments['staging'];

module.exports = environment;

