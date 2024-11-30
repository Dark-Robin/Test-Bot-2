const { cmd, commands } = require('../command');
const { sinhalaSub } = require("mrnima-moviedl");

cmd({
    pattern: "sub",
    desc: "Search Sinhala Subtitles for Movies or TV Shows",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*Please provide a valid movie or TV show name to search subtitles* 🌚❤️");

        // Initialize sinhalaSub and search for the movie/TV show
        const movie = await sinhalaSub();
        const results = await movie.search(q);

        if (!results || results.length === 0) {
            return reply(`Sorry, I couldn't find any results for "${q}". Please check the name and try again.`);
        }

        // Create a response message with the search results
        let response = `*❤️ROBIN Sinhala Subtitle Search Results❤️*\n\n`;
        results.forEach((result, index) => {
            response += `👻 *${index + 1}* \n`;
            response += `🎬 *Title* : ${result.title}\n`;
            response += `🔗 *Link* : ${result.link}\n\n`;
        });
        response += "Please choose the number to download subtitles 🌟";

        // Send the search results
        await conn.sendMessage(from, {document: { url: result.link },mimetype: "video/mp4",fileName: result.title + ".mp4",caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋"},{quoted:mek})
        await conn.sendMessage(from, { text: response }, { quoted: mek });

        return reply("*Thanks for using my bot* 🌚❤️");

    } catch (e) {
        console.error('Error:', e);
        reply(`Error: ${e.message}`);
    }
});
