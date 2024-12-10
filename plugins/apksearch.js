const axios = require('axios');

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

        const url = `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps`;
        const response = await axios.get(url);
        const html = response.data;

        const regex = /<a[^>]*?href="\/store\/apps\/details\?id=([^"]+)"[^>]*?aria-hidden="true"[^>]*?>(.*?)<\/a>/g;
        let match;
        const apps = [];
        while ((match = regex.exec(html)) !== null) {
            const appId = match[1];
            const appName = match[2].replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
            apps.push({ title: appName, url: `https://play.google.com/store/apps/details?id=${appId}` });
            if (apps.length >= 5) break;
        }

        if (apps.length === 0) {
            return reply("No related apps found.");
        }

        let responseMessage = "Related apps:\n";
        apps.forEach((app, index) => {
            responseMessage += `${index + 1}. ${app.title} - ${app.url}\n`;
        });

        reply(responseMessage);
    } catch (error) {
        console.error(error);
        reply("Error occurred while fetching related apps. Please try again later.");
    }
});

