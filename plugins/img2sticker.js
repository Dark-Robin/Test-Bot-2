const { cmd, commands } = require('../command');
const { writeFileSync } = require('fs');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { proto, downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys')

cmd({
    pattern: "sticker",
    alias: ["s","stick"],
    desc: "Convert an image to a sticker",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
         // Ensure the quoted message contains media
        if (!quoted) return reply("Please reply to an image or GIF to convert it to a sticker.");
        const messageType = getContentType(quoted.message);
        if (!['imageMessage', 'videoMessage'].includes(messageType)) {
            return reply("The replied message must be an image or video.");
        }

        // Download the media
        const mediaType = messageType === 'imageMessage' ? 'image' : 'video';
        const stream = await downloadContentFromMessage(quoted.message[messageType], mediaType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (!buffer) return reply("Failed to download the media. Please try again.");

        // Create sticker
        const sticker = new Sticker(buffer, {
            pack: 'Robin', // Sticker pack name
            author: 'Sihilel', // Sticker author name
            type: StickerTypes.FULL, // Sticker type (FULL, CROPPED)
            quality: 50, // Quality of the sticker
            animated: mediaType === 'video', // Set animated flag for GIFs
        });

        const stickerBuffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });
        reply("Here's your sticker! 🌟");

    } catch (e) {
        console.error("Sticker Conversion Error:", e);
        reply(`Error: ${e.message || e}`);
    }
});
