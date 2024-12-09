const { cmd, commands } = require('../command');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys')

cmd({
    pattern: "sticker",
    alias: ["s","stick"],
    desc: "Convert an image to a sticker",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure a quoted message exists
        if (!quoted) return reply("Please reply to an image or GIF to convert it to a sticker.");

        // Get the content type of the quoted message
        const contentType = getContentType(quoted.message);
        console.log("Detected Content Type:", contentType); // Debug log

        // Validate that the content type is an image or video
        if (!['imageMessage', 'videoMessage'].includes(contentType)) {
            return reply("The replied message must be an image or video.");
        }

        // Determine the type of media to download
        const mediaType = contentType === 'imageMessage' ? 'image' : 'video';

        // Download the media from the quoted message
        const stream = await downloadContentFromMessage(quoted.message[contentType], mediaType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // Ensure media was downloaded
        if (!buffer || buffer.length === 0) {
            return reply("Failed to download the media. Please try again.");
        }

        // Create the sticker
        const sticker = new Sticker(buffer, {
            pack: 'Robin', // Sticker pack name
            author: 'Sihilel', // Sticker author name
            type: StickerTypes.FULL, // Sticker type
            quality: 50, // Quality of the sticker
            animated: mediaType === 'video', // Animated for videos or GIFs
        });

        const stickerBuffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });
        reply("Here's your sticker! 🌟");

    } catch (e) {
        console.error("Sticker Conversion Error:", e);
        reply(`Error: ${e.message || e}`);
    }
});
