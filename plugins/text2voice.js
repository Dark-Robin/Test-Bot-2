const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const gTTS = require('gtts');

cmd({
    pattern: "tts",
    alias: ["texttospeech", "voice"],
    desc: "Convert text to voice in any language",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Check if arguments are provided
        if (!args.length) {
            return reply("Please provide the language code and text. Example: !tts en Hello, how are you?");
        }

        // Extract language code and text
        const lang = args[0].toLowerCase(); // First argument is the language code
        const text = args.slice(1).join(" "); // Remaining arguments are the text

        if (!text) {
            return reply("Please provide the text to convert to voice after the language code.");
        }

        // Validate language code and text
        const supportedLangRegex = /^[a-z]{2}(-[A-Z]{2})?$/; // Simple regex for language codes (e.g., en, en-US)
        if (!supportedLangRegex.test(lang)) {
            return reply("Invalid language code. Example: en for English, es for Spanish.");
        }

        // Temporary file path
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir); // Ensure temp directory exists
        const filePath = path.join(tempDir, `tts_${Date.now()}.mp3`);

        // Convert text to speech
        const gtts = new gTTS(text, lang);
        gtts.save(filePath, async (err) => {
            if (err) {
                console.error("Error generating TTS:", err);
                return reply("Error: Unable to generate voice. Please check the language code or try again.");
            }

            // Read and send the audio file
            const audioBuffer = fs.readFileSync(filePath);
            await conn.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });

            // Clean up the temporary file
            fs.unlinkSync(filePath);
        });
    } catch (e) {
        console.error("Error in TTS plugin:", e);
        reply(`Error: ${e.message || "An unexpected error occurred."}`);
    }
});
