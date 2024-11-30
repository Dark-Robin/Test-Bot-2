const { cmd, commands } = require('../command');
const MovieDL = require('mrnima-moviedl');

cmd({
    pattern: "movie",
    desc: "Download Movies",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if a movie name is provided
        if (!q) return reply("*Please provide a valid movie name or link* 🌚❤️");

        // Initialize the MovieDL library
        const movieDownloader = new MovieDL();

        // Fetch movie details
        const movieData = await movieDownloader.getMovie(q);

        // Validate if the movie details are found
        if (!movieData || !movieData.downloadUrl) {
            return reply("Sorry, I couldn't find the movie. Please check the name or link and try again.");
        }

        console.log('Movie Data:', movieData); // Debug output

        // Prepare the description for the response
        let desc = `
*❤️ROBIN Movie Downloader❤️*

🎬 *Title* : ${movieData.title}
📅 *Release Year* : ${movieData.year}
⭐ *Rating* : ${movieData.rating}
🎥 *Quality* : ${movieData.quality}
🔗 *Link* : ${movieData.downloadUrl}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
        `;

        // Send the movie details to the user
        await conn.sendMessage(from, { text: desc }, { quoted: mek });

        // Send the download link
        await conn.sendMessage(from, {
            document: { url: movieData.downloadUrl },
            mimetype: "application/octet-stream",
            fileName: `${movieData.title}.mp4`,
            caption: "Click the link above to download the movie 🎥"
        }, { quoted: mek });

        return reply("*Thanks for using my bot* 🌚❤️");

    } catch (e) {
        console.error('Error:', e); // Log detailed error
        reply(`Error: ${e.message}`);
    }
});
