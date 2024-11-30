const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
 }
}

let madeMenu = `👋 *Hello  ${pushname}*


| *MAIN COMMANDS* |
    ▫️.alive
    ▫️.menu
    ▫️.ai {text}
    ▫️.system
    ▫️.owner
| *DOWNLOAD COMMANDS* |
    ▫️.song {text}
    ▫️.video {text}
| *GROUP COMMANDS* |
${menu.group}
| *OWNER COMMANDS* |
    ▫️.restart
    ▫️.update
| *CONVERT COMMANDS* |
${menu.convert}
| *SEARCH COMMANDS* |
${menu.search}


🥶𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋🥶
`
await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

  
}catch(e){
console.log(e)
reply(`${e}`)
}
})


conn.ev.on("messages.upsert", async (msg) => {
    const m = msg.messages[0];
    if (!m.message || m.key.fromMe) return;

    const from = m.key.remoteJid;
    const text = m.message.conversation || m.message.extendedTextMessage?.text;

    // AI ChatGPT Trigger (adjust this condition as needed)
    if (text.startsWith("!ai ")) {
        const query = text.slice(4); // Remove "!ai " prefix
        const reply = await getChatGPTResponse(query);
        await conn.sendMessage(from, { text: reply }, { quoted: m });
    } else {
        // Existing auto-reply or other logic
        // No changes here
    }
});
