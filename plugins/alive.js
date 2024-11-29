const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: config.ALIVE_MSG},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "owner",
    alias: ["sihilel","rukshani","lakshi"],
    desc: "Contact bot creater",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*𝐀𝐡𝐡 𝐡𝐚 𝐲𝐨𝐮 𝐮𝐬𝐞𝐝 𝐨𝐰𝐧𝐞𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝* 😘\n\n *𝐌𝐲 𝐍𝐚𝐦𝐞 𝐢𝐬 𝐚 𝐑_𝐎_𝐁_𝐈_𝐍* ⚡\n\n *𝐌𝐲 𝐂𝐫𝐞𝐚𝐭𝐞𝐫 𝐢𝐬 𝐒𝐈𝐇𝐈𝐋𝐄𝐋* 💀\n\n *𝐂𝐫𝐞𝐚𝐭𝐞𝐫 𝐧𝐮𝐦𝐛𝐞𝐫 𝐥𝐢𝐧𝐤*\n\n *wa.me/+94704101989*\n\n*𝐘𝐨𝐮 𝐜𝐚𝐧 𝐣𝐨𝐢𝐧 𝐨𝐮𝐫 𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐠𝐫𝐨𝐮𝐩 𝐭𝐨 𝐜𝐡𝐞𝐜𝐤 𝐭𝐡𝐞 𝐛𝐨𝐭*\n\n*https://chat.whatsapp.com/CGQkarVNtYH2WIED9DpYSr*\n\n*𝐂𝐫𝐞𝐚𝐭𝐞𝐫 𝐧𝐨𝐭𝐞* :-\n\n*𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐭𝐡𝐚𝐧𝐤𝐬 𝐭𝐨 𝐦𝐲 𝐭𝐰𝐨 𝐬𝐢𝐬𝐭𝐞𝐫𝐬 𝐋𝐀𝐊𝐒𝐇𝐈 & 𝐑𝐔𝐊𝐒𝐇𝐀𝐍𝐈* ❤️❤️")
}catch(e){
console.log(e)
reply(`${e}`)
}
})
