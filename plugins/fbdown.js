const { cmd } = require('../command');
const axios = require('axios');
const cheerio = require('cheerio');

async function getFacebookVideoUrl(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });
    // Log the HTML for debugging
    console.log(response.data);

    const $ = cheerio.load(response.data);
    const videoTag = $('meta[property="og:video:url"]').attr('content');

    if (videoTag) {
      return videoTag;
    } else {
      throw new Error('No video found on the provided Facebook URL. Please check if the video is public.');
    }
  } catch (error) {
    throw new Error(`Error fetching video URL: ${error.message}`);
  }
}

cmd({
  pattern: 'fbvideo',
  desc: 'Download Facebook video',
  category: 'download',
  filename: __filename,
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply('*Please provide a Facebook video link* 🌚❤️');
    const videoUrl = await getFacebookVideoUrl(q);
    if (videoUrl) {
      await conn.sendMessage(from, { video: { url: videoUrl }, caption: '🎥 Facebook video downloaded' }, { quoted: mek });
      return reply('*Thanks for using my bot* 🌚❤️');
    }
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
