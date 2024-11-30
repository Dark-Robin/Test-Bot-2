const { cmd, commands } = require('../command');
const fg = require('fb-video-downloader');

cmd({
    pattern: "fb",
    desc: "Download Facebook Video",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*Please provide a valid Facebook video link* 🌚❤️");

        // Fetch the video download data
        const videoData = await fg.download(q);

        if (!videoData || !videoData.video_url) {
            return reply("Sorry, I couldn't fetch the video. Please make sure the link is valid.");
        }

        // Prepare the description for the response
        let desc = `
*❤️ROBIN Facebook Video Downloader❤️*

👻 *Title* : ${videoData.title}
👻 *Duration* : ${videoData.duration}
👻 *Resolution* : ${videoData.resolution}
👻 *Views* : ${videoData.views}
👻 *Uploader* : ${videoData.uploader}
        
𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
        `;

        // Send thumbnail image
    

        // Send video message
        await conn.sendMessage(from, { video: { url: videoData.video_url }, mimetype: "video/mp4" }, { quoted: mek });

        return reply("*Thanks for using my bot* 🌚❤️");

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
