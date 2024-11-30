const { cmd, commands } = require('../command');
const fs = require('fs');
const axios = require('axios');

cmd({
    pattern: "download",
    desc: "Download file from direct link",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q || !q.startsWith('http')) {
            return reply("*Please provide a valid direct download link!* 🌚❤️");
        }

        const fileUrl = q.trim();
        const fileName = fileUrl.split('/').pop(); // Extract file name from URL
        const filePath = `./downloads/${fileName}`;

        // Create downloads directory if it doesn't exist
        if (!fs.existsSync('./downloads')) {
            fs.mkdirSync('./downloads');
        }

        reply(`*Downloading file...*`);

        // Download the file
        const response = await axios({
            method: 'GET',
            url: fileUrl,
            responseType: 'stream',
        });

        // Save the file locally
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', async () => {
            reply(`*Download complete!*\nFile saved as: ${fileName}`);
            
            // Send the file
            await conn.sendMessage(from, { document: { url: filePath }, mimetype: 'video/mp4', fileName }, { quoted: mek });
        });

        writer.on('error', (err) => {
            console.error(err);
            reply(`Error saving file: ${err.message}`);
        });

    } catch (error) {
        console.error(error);
        reply(`Error: ${error.message}`);
    }
});
