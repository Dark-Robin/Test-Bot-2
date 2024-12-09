const { cmd } = require('../command');
const playStoreScraper = require('google-play-scraper');

cmd({
    pattern: "relatedapps",
    alias: ["apps", "getapps"],
    desc: "Get links of related apps from the Play Store",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, body, reply }) => {
    try {
        const query = body.trim();
        if (!query) {
            return reply("Please type the name of the app to search for related apps.");
        }

        // Search for apps related to the input query
        const apps = await playStoreScraper.search({
            term: query,
            num: 5, // Number of related apps to return (adjust as needed)
            lang: 'en', // Language
            country: 'us', // Country code (adjust as needed)
        });

        // Prepare the response
        if (apps.length === 0) {
            return reply("No related apps found.");
        }

        let response = "Related apps:\n";
        apps.forEach((app, index) => {
            response += `${index + 1}. ${app.title} - ${app.url}\n`;
        });

        reply(response);
    } catch (error) {
        console.error(error);
        reply("Error occurred while fetching related apps. Please try again later.");
    }
});
