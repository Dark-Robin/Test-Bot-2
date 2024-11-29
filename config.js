const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "bJU1jBiQ#KP-hqrZsgXF58DW6xWTJ1idGoYpbNGqfwUibORZ2fsc",
MONGODB: process.env.MONGODB || "mongodb://mongo:HDUhYphyLYaNRlURYDfCNeMSIzUogJYh@autorack.proxy.rlwy.net:53842",
};
