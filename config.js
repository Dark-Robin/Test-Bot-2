const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "eMMXSJAA#_xjieiQwccv2j1PDumVYbH0jN78HtXMMGDdL2oq3SUo",
MONGODB: process.env.MONGODB || "mongodb://mongo:QfpiXGuAfauZGAIcOVcclWHAyvoqZPFX@junction.proxy.rlwy.net:32111",
};
