const { cmd, commands } = require('../command');
const { writeFileSync } = require('fs');
const { Sticker } = require('wa-sticker-formatter');
const { downloadMediaMessage } = require('../lib/msg.js'); // Adjust the path as needed

cmd({
    pattern: "toimg",
    alias: ["img", "photo"],
    desc: "Convert a sticker to an image",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure the message contains a sticker
        if (!quoted || !quoted.stickerMessage) {
            return reply("Please reply to a sticker to convert it to an image.");
        }

        // Download the sticker from the quoted message
        const media = await downloadMediaMessage(quoted, 'stickerInput');
        if (!media) return reply("Failed to download the media. Try again!");

        // Convert sticker to image buffer
        const sticker = new Sticker(media, {
            pack: '𝐑_𝐎_𝐁_𝐈_𝐍', // Sticker pack name (not used for image)
            author: '𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋', // Sticker author name (not used for image)
            type: StickerTypes.FULL, // Type should be set to FULL
            quality: 100, // Set quality to maximum
        });

        const buffer = await sticker.toBuffer({ format: 'image/png' }); // Convert to image format (PNG)
        await conn.sendMessage(from, { image: buffer, caption: "Here's your image!" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || e}`);
    }
});
