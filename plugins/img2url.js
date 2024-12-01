const { cmd } = require('../command');
const { imageToURL } = require('@blackamda/telegram-image-url');
const fs = require('fs');

cmd({
    pattern: "uploadimage",
    desc: "Convert image to URL",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        if (!quoted || !quoted.imageMessage) {
            return reply("Please reply to an image to convert it to a URL.");
        }

        // Download the image file
        const media = await conn.downloadMediaMessage(quoted);
        const filePath = `./temp/${Date.now()}.jpg`;

        // Save the file temporarily
        fs.writeFileSync(filePath, media);

        // Convert the image to a URL
        const imageUrl = await imageToURL(filePath);

        // Delete the temporary file
        fs.unlinkSync(filePath);

        // Send the image URL to the user
        reply(`Here is your image URL: ${imageUrl}`);
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
