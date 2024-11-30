const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); // For loading environment variables

// Create OpenAI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in the .env file
});

// Create OpenAI API client
const openai = new OpenAIApi(configuration);

// Function to get a ChatGPT response
async function getChatGPTResponse(message) {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // Ensure your OpenAI account supports this model
            messages: [{ role: "user", content: message }],
        });
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error with ChatGPT:", error);
        return "Sorry, I couldn't process your request.";
    }
}

module.exports = { getChatGPTResponse };
