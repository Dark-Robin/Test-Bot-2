const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "system info",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `👻 *Uptime:*  ${runtime(process.uptime())}
👻 *Ram usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
👻 *HostName:* ${os.hostname()}
👻 *Owner:* 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
`

await conn.sendMessage(from,{image:{url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20system.jpg"},caption:status},{quoted:mek})
  
}catch(e){
console.log(e)
reply(`${e}`)

}
})
