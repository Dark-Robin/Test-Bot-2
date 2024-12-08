const { cmd, commands } = require('../command');
const { getVideoMeta } = require("@xct007/tiktok-scraper");

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
        m.react("🎥");

        // Validate the TikTok URL format
        const tiktokRegex = /(https?:\/\/)?(www\.)?(tiktok)\.com\/.+/;
        if (!tiktokRegex.test(q)) return reply("*Invalid TikTok URL! Please check and try again.* 🌚");

        // Fetch video details
        reply("*Downloading your video...* 🌚❤️");

        const result = await getVideoMeta(q, { noWaterMark: true }); // Fetch video metadata, try no-watermark if possible

        if (!result || !result.videoUrl) {
            return reply("*Failed to download video. Please try again later.* 🌚");
        }

        const { authorMeta, videoUrl, text } = result;

        // Prepare and send the message with video details
        let desc = `
*❤️ ROBIN TIKTOK VIDEO DOWNLOADER ❤️*

👻 *Author*: ${authorMeta?.name || 'Unknown'}
👻 *Caption*: ${text || 'No caption provided'}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
        `;
        await conn.sendMessage(from, { image: { url: authorMeta?.avatar || "https://via.placeholder.com/150" }, caption: desc }, { quoted: mek });
        await conn.sendMessage(from,{image: {url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20fb-1.jpg"},caption: desc},{quoted: mek})

        // Send the video
        await conn.sendMessage(from, { video: { url: videoUrl }, caption: "----------TIKTOK VIDEO----------" }, { quoted: mek });

        return reply("*Thanks for using my bot* 🌚❤️");

    } catch (e) {
        console.error(e);
        reply(`*Error:* ${e.message || e}`);
    }
});
