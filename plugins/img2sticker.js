const { cmd, commands } = require('../command');
const { writeFileSync } = require('fs');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

cmd({
    pattern: "sticker",
    desc: "Convert an image to a sticker",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, reply }) => {
    try {
        // Check if a media file is quoted
        if (!m.hasMedia) return reply("Please reply to an image or GIF to convert it to a sticker.");

        const media = await conn.downloadMediaMessage(quoted);
        if (!media) return reply("Failed to download the media. Try again!");

        // Create sticker
        const sticker = new Sticker(media, {
            pack: 'Bot Stickers', // Sticker pack name
            author: 'Your Bot',  // Sticker author name
            type: StickerTypes.FULL, // Sticker type (FULL, CROPPED)
            quality: 80, // Quality of the output sticker
        });

        const buffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        reply("Here's your sticker! 🌟");

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || e}`);
    }
});
