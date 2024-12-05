const { cmd, commands } = require('../command');
const { facebook } = require('@mrnima/facebook-downloader');

cmd({
    pattern: "fbvideo",
    desc: "Download Facebook Video",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*Please provide a valid Facebook video URL!* 🌚❤️");

        const isReact = m.message.reactionMessage ? true : false;
        if (isReact) return;
        m.react("📹");

        // Validate the Facebook URL format
        const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
        if (!fbRegex.test(q)) return reply("*Invalid Facebook URL! Please check and try again.* 🌚");

        // Fetch video details
        reply("*Fetching video details...* 🌚❤️");

        const result = await facebook(q);

        if (!result || (!result.sd && !result.hd)) {
            return reply("*Failed to fetch video. Please try again later.* 🌚");
        }

        const { title, sd, hd } = result;

        // Prepare and send the message with video details
        let desc = `
*❤️ ROBIN FB VIDEO DOWNLOADER ❤️*

👻 *Title*: ${title || 'Unknown'}
👻 *Quality*: ${hd ? 'HD Available' : 'SD Only'}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
        `;
        await conn.sendMessage(from, { text: desc }, { quoted: mek });

        // Send the video if available
        if (hd) {
            await conn.sendMessage(from, { video: { url: hd }, caption: "HD Video 🌚❤️" }, { quoted: mek });
        } else if (sd) {
            await conn.sendMessage(from, { video: { url: sd }, caption: "SD Video 🌚❤️" }, { quoted: mek });
        } else {
            return reply("*No downloadable video found!* 🌚");
        }

        return reply("*Thanks for using my bot* 🌚❤️");

    } catch (e) {
        console.error(e);
        reply(`*Error:* ${e.message || e}`);
    }
});
