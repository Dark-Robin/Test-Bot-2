const { cmd, commands } = require('../command');
const { sinhalaSub } = require("mrnima-moviedl");

cmd({
    pattern: "movie",
    desc: "Download Sinhala Subtitle for Movies",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*Please provide a valid movie name for Sinhala subtitles* 🌚❤️");

        // Fetch Sinhala subtitle
        const subtitleData = await sinhalaSub(q);

        if (!subtitleData || !subtitleData.downloadUrl) {
            return reply("Sorry, I couldn't find subtitles for the given movie. Please check the name and try again.");
        }

        let desc = `
*❤️ROBIN Sinhala Subtitle Downloader❤️*

🎬 *Movie Title* : ${subtitleData.title || "Unknown"}
📂 *File Type* : ${subtitleData.fileType || "Unknown"}
🔗 *Download Link* : ${subtitleData.downloadUrl}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
        `;

        // Send a text message with subtitle information
        await conn.sendMessage(from, { text: desc }, { quoted: mek });

        // Send the subtitle file as a document
        await conn.sendMessage(from, {
            document: { url: subtitleData.downloadUrl },
            mimetype: "application/octet-stream",
            fileName: `${subtitleData.title || "subtitle"}.srt`,
            caption: "Download and enjoy your Sinhala subtitle 🌟"
        }, { quoted: mek });

        return reply("*Thanks for using my bot* 🌚❤️");
    } catch (e) {
        console.error('Error:', e);
        reply(`Error: ${e.message}`);
    }
});
