const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "hack",
    desc: "fun command",
    category: "fun",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
const isReact = m.message.reactionMessage ? true : false
if(isReact) return 
m.react("🤩")
    await conn.sendMessage(from, { text: '💻 HACK STARTING... 💻'  }, { quoted: m });
    await conn.sendMessage(from, { text: ''  }, { quoted: m });


  
}catch(e){
console.log(e)
reply(`${e}`)
}
})
