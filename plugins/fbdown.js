const { cmd } = require('../command');
const axios = require('axios');

async function getFacebookVideoUrl(videoId, accessToken) {
  try {
    const response = await axios.get(`https://graph.facebook.com/${videoId}`, {
      params: {
        fields: 'source,description',
        access_token: accessToken,
      },
    });

    if (response.data && response.data.source) {
      return response.data.source; // Video URL
    } else {
      throw new Error('No video found or unable to retrieve video.');
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
    if (!q) return reply('*Please provide a Facebook video ID or URL* 🌚❤️');
    
    // Extract video ID from the provided URL or pass as is
    const videoId = q.split('/').pop(); // Simple extraction logic (adjust as needed)
    const accessToken = '1303353127493891|xcmNhXd7HQK2_yey6QP_wZ0rwn8'; // Replace with a secure way to handle tokens

    const videoUrl = await getFacebookVideoUrl(videoId, accessToken);
    
    if (videoUrl) {
      await conn.sendMessage(from, { video: { url: videoUrl }, caption: '🎥 Facebook video downloaded' }, { quoted: mek });
      return reply('*Thanks for using my bot* 🌚❤️');
    }
  } catch (e) {
    console.log(e);
    reply(`Error: ${e.message}`);
  }
});
