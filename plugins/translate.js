const { cmd } = require('../command');
const translate = require('@vitalets/google-translate-api');

cmd({
    pattern: "translate",
    alias: ["trans", "tr"],
    desc: "Translate text to a specified language",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        // Check if arguments are provided
        if (args.length < 2) {
            return reply("Usage: translate <language_code> <text>\nExample: translate en Hola");
        }

        // Extract target language and text to translate
        const targetLang = args[0];
        const text = args.slice(1).join(' ');

        // Perform translation
        const result = await translate(text, { to: targetLang });

        // Send the translated text back to the user
        reply(`*Translated to ${targetLang.toUpperCase()}*\n\n${result.text}`);
    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || "Something went wrong. Please try again later."}`);
    }
});
