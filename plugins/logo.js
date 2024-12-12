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
        // Ensure there's at least one logo type and text argument
        if (args.length < 2) {
            return reply("Usage: .logo <type> <text>\nExample: .logo wolf MyText");
        }

        const type = args[0].toLowerCase(); // Logo type
        const text = args.slice(1).join(" "); // Text for the logo

        // Define logo types and styles
        const logoTypes = {
            wolf: { 
                bg: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/wolflogo.jpg", 
                color: "white", 
                font: "bold 80px Impact", 
                valign: "bottom", // Correctly setting default vertical alignment
                align: "center"
            },
            winter: { 
                bg: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/winter.jpg", 
                color: "#0db6d4", 
                font: "italic 80px Impact", 
                valign: "middle", 
                align: "center"
            },
            fire: { 
                bg: "fire.jpg", 
                color: "red", 
                font: "bold 70px Impact", 
                valign: "middle", 
                align: "center"
            },
            winter1: { 
                bg: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/winter1.jpg", 
                color: "lime", 
                font: "bold 80px Impact", 
                valign: "middle", 
                align: "center"
            },
            galaxy: { 
                bg: "galaxy.jpg", 
                color: "violet", 
                font: "bold 55px Tahoma", 
                valign: "middle", 
                align: "center"
            },
        };

        // Check if the logo type is valid
        if (!logoTypes[type]) {
            return reply(`Invalid logo type. Available types: ${Object.keys(logoTypes).join(", ")}`);
        }

        const { bg, color, font, valign = "middle", align } = logoTypes[type]; // Default valign to 'middle'

        // Load the background image
        let background;
        try {
            background = await loadImage(bg);
        } catch (err) {
            return reply(`Error loading image: ${bg}. Please check the image URL.`);
        }

        // Create canvas with background dimensions
        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext("2d");

        // Draw the background on the canvas
        ctx.drawImage(background, 0, 0);

        // Set text properties
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textAlign = align; // Align the text horizontally (left, center, right)

        // Set vertical text alignment (default to 'middle' if valign is not defined)
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

        // Convert the canvas to an image buffer
        const buffer = canvas.toBuffer();

        // Send the generated logo as an image
        await conn.sendMessage(from, { image: buffer, caption: `Here is your ${type} logo!` }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`Error: ${error.message}`);
    }
});
