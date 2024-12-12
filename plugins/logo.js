const { cmd } = require('../command');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

cmd({
    pattern: "logo",
    alias: ["makelogo"],
    desc: "Generate logos with different styles",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length < 2) {
            return reply("Usage: .logo <type> <text>\nExample: .logo wolf MyText");
        }

        const type = args[0].toLowerCase(); // Logo type
        const text = args.slice(1).join(" "); // Text for the logo

        // Define logo types and styles
        const logoTypes = {
            wolf: { bg: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/wolflogo.jpg", color: "white", font: "bold 80px Arial", valign: "bottom", align: "center" },
            winter: { bg: "winter.jpg", color: "blue", font: "italic 50px Georgia" },
            fire: { bg: "fire.jpg", color: "red", font: "bold 70px Impact" },
            neon: { bg: "neon.jpg", color: "lime", font: "bold 65px 'Comic Sans MS'" },
            galaxy: { bg: "galaxy.jpg", color: "violet", font: "bold 55px Tahoma" },
        };

        if (!logoTypes[type]) {
            return reply(`Invalid logo type. Available types: ${Object.keys(logoTypes).join(", ")}`);
        }

        const { bg, color, font } = logoTypes[type];

        // Load background image from URL directly
        const background = await loadImage(bg);  // bg can be a URL
        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext("2d");

        // Draw background
        ctx.drawImage(background, 0, 0);

        // Draw text
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textAlign = "center";

        let yPosition;
        if (valign === "bottom") {
            yPosition = canvas.height - 50;
        } else if (valign === "top") {
            yPosition = 50;
        } else {
            yPosition = canvas.height / 2; // Default to middle alignment
        }

        // Draw the text on the canvas
        ctx.fillText(text, canvas.width / 2, yPosition);

        // Send the generated image
        const buffer = canvas.toBuffer();
        await conn.sendMessage(from, { image: buffer, caption: `Here is your ${type} logo!` }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`Error: ${error.message}`);
    }
});
