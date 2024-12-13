const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ROBIN=bdc2CB6Q#J7Lzr5wlJtWAkAID26pGxbp5Y77hl45wfftZkUEy4qs",
MONGODB: process.env.MONGODB || "mongodb://mongo:QfpiXGuAfauZGAIcOVcclWHAyvoqZPFX@junction.proxy.rlwy.net:32111",
};
