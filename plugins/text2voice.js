const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const gTTS = require('gtts');

cmd({
    pattern: "tts",
    alias: ["texttospeech", "voice"],
    desc: "Convert text to voice",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Check if text is provided
        if (!args.length) {
            return reply("Please provide the text to convert to voice. Example: .tts Hello, how are you?");
        }

        // Get text and language code
        const text = args.join(" ");
        const lang = "en"; // Default language, you can make this dynamic if needed

        // Convert text to voice
        const gtts = new gTTS(text, lang);
        const filePath = path.join(__dirname, '../temp', `tts_${Date.now()}.mp3`);

        gtts.save(filePath, async (err) => {
            if (err) {
                console.error("Error generating TTS:", err);
                return reply("Error: Unable to generate voice. Please try again.");
            }

            // Send the generated voice file
            const audioBuffer = fs.readFileSync(filePath);
            await conn.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });

            // Clean up the temporary file
            fs.unlinkSync(filePath);
        });
    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || "An unexpected error occurred."}`);
    }
});
