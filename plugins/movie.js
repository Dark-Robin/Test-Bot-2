const { cmd, commands } = require('../command');
const { sinhalaSub } = require("mrnima-moviedl");

cmd({
    pattern: "movie",
    desc: "Download Movies",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*Please provide a valid movie name to search and download* 🌚❤️");

        // Initialize sinhalaSub and search for the movie
        const movie = await sinhalaSub();
        const results = await movie.search(q);

        // Log results for debugging
        console.log("Search Results:", results);

        // Check if results are an array or object
        const resultsArray = Array.isArray(results) ? results : results.movies || [];

        if (!resultsArray.length) {
            return reply(`Sorry, I couldn't find any results for "${q}". Please check the name and try again.`);
        }

        // Pick the first movie result (or let the user choose in an advanced version)
        const movieData = resultsArray[0];

        let desc = `
*❤️ROBIN Movie Downloader❤️*

🎬 *Title* : ${movieData.title}
📅 *Release Date* : ${movieData.releaseDate || "Unknown"}
🔗 *Link* : ${movieData.link}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
        `;

        // Send details of the movie
        await conn.sendMessage(from, { text: desc }, { quoted: mek });

        // Download the movie using the movie link
        const downloadLink = await movie.getMovie(movieData.link);

        if (!downloadLink) {
            return reply(`Sorry, I couldn't fetch the download link for "${movieData.title}".`);
        }

        // Send the movie download link
        await conn.sendMessage(from, { text: `🎥 *Download Link:* ${downloadLink}` }, { quoted: mek });

        return reply("*Thanks for using my bot* 🌚❤️");

    } catch (e) {
        console.error('Error:', e); // Log the detailed error
        reply(`Error: ${e.message}`);
    }
});
