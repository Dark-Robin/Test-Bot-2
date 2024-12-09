const { cmd, commands } = require('../command');
const { writeFileSync } = require('fs');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

cmd({
    pattern: "sticker",
    alias: ["s","stick"],
    desc: "Convert an image to a sticker",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if a media file is quoted
        if (!quoted || !(quoted.imageMessage || quoted.videoMessage)) {
            return reply("Please reply to an image or GIF to convert it to a sticker.");

        const media = await conn.downloadMediaMessage(quoted);
        if (!media) return reply("Failed to download the media. Try again!");

        // Create sticker
        const sticker = new Sticker(media, {
            pack: 'Robin', // Sticker pack name
            author: 'Sihilel',  // Sticker author name
            type: StickerTypes.FULL, // Sticker type (FULL, CROPPED)
            quality: 50, // Quality of the output sticker
        });

        const buffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        reply("Here's your sticker! 🌟");

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || e}`);
    }
});
