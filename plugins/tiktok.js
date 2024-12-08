const { cmd, commands } = require('../command');
const Tiktok = require('@xct007/tiktok-scraper');

cmd({
    pattern: "tiktok",
    desc: "Download TikTok Video",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*Please provide a valid TikTok video URL!* 🌚❤️");

        const isReact = m.message.reactionMessage ? true : false;
        if (isReact) return;
        m.react("📹");

        // Validate the TikTok URL format
        const tiktokRegex = /https:\/\/(vt\.)?tiktok\.com\/.+/;
        if (!tiktokRegex.test(q)) return reply("*Invalid TikTok URL! Please check and try again.* 🌚");

        // Fetch video details
        reply("*Fetching TikTok video details...* 🌚❤️");

        const options = {
            parse: true, // Ensures the data is parsed into a structured format
            keys: ["video_url", "author", "desc_language"] // Customize the keys as needed
        };

        const result = await Tiktok.default ? Tiktok.default(q, options) : Tiktok(q, options);

        if (!result || !result.video_url) {
            return reply("*Failed to download video. Please try again later.* 🌚");
        }

        // Prepare the message with video details
        let desc = `
*❤️ ROBIN TIKTOK DOWNLOADER ❤️*

👻 *Title*: ${result.desc_language || 'Unknown'}
👻 *Author*: ${result.author || 'Unknown'}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
        `;

        // Send the video to the user
        await conn.sendMessage(from, { video: { url: result.video_url }, caption: "----------TIKTOK VIDEO----------" }, { quoted: mek });
        await conn.sendMessage(from,{image: {url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20fb-1.jpg"},caption: desc},{quoted: mek})

        return reply("*Thanks for using my bot* 🌚❤️");

    } catch (e) {
        console.error(e);
        reply(`*Error:* ${e.message || e}`);
    }
});
