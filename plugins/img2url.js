const { cmd } = require('../command');
const { imageToURL } = require('@blackamda/telegram-image-url');
const { downloadMediaMessage } = require('./lib/msg');
const fs = require('fs');

cmd({
    pattern: "link",
    desc: "Convert image to URL",
    category: "convert",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
           // Check if the message is a reply to an image
        if (!quoted || !quoted.message || !quoted.message.imageMessage) {
            return reply("Please reply to an image to convert it to a URL.");
        }

        // Use the custom function to download the media message
        const filePath = await downloadMediaMessage(quoted, './temp'); // Saves to temp folder

        // Convert the image to a URL using @blackamda/telegram-image-url
        const imageUrl = await imageToURL(filePath);

        // Clean up the temporary file after upload
        fs.unlinkSync(filePath);

        // Respond with the generated URL
        reply(`Here is your image URL: ${imageUrl}`);
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
