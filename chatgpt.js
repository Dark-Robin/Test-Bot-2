const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// OpenAI Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key in .env
});
const openai = new OpenAIApi(configuration);

async function getChatGPTResponse(message) {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error with ChatGPT:", error);
        return "Sorry, I couldn't process your request.";
    }
}

module.exports = { getChatGPTResponse };
