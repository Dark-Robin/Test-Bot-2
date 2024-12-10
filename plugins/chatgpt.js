const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ai",
    alias: ["chat", "gpt"],
    desc: "Chat with an AI assistant powered by OpenAI",
    category: "utility",
    filename: __filename,
},
async (conn, mek, m, { from, body, reply }) => {
    try {
        const query = body.trim();
        if (!query) {
            return reply("Please type your message to chat with the AI.");
        }

        // OpenAI API request
        const apiKey = "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"; // Replace with your OpenAI API key
        const apiUrl = "https://api.openai.com/v1/chat/completions";

        const payload = {
            model: "gpt-4", // You can use "gpt-3.5-turbo" if you have access to it
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: query },
            ],
            max_tokens: 150,
            temperature: 0.7,
        };

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        };

        const response = await axios.post(apiUrl, payload, { headers });
        const aiResponse = response.data.choices[0].message.content.trim();

        reply(aiResponse);
    } catch (error) {
        console.error(error);
        reply("Error occurred while chatting with the AI. Please try again later.");
    }
});
