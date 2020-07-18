const Discord = require('discord.js');
const profilepic = process.env.profilepic;

module.exports.run = async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
        .setColor('#0A22EA') // Set the color for the side pannel
        .setTitle('UofTHelpBot') // set the title
        .setThumbnail(profilepic)
        .setDescription('Refer to official UofT websites for the most accurate information. The info provided by the bot is only for reference and does not represent official notice/announcement of UofT. It is your own responsibility to make sure the information is correct.')
        .setAuthor('UofTHelpBot', profilepic) // set the author, the profile picture on the right and the link for them
        .addFields(
            { name: 'Commands', value: 
            "**?course**: Display information of the first result from a course search based on the inputted course code\n"+
            "(i.e. ?course imm429, ?course imm)\n"+
            "**?exam**: Display exam information of the first result from a course search based on the inputted course code\n"+
            "(i.e. ?exam imm429, ?exam imm)\n"+
            "**?food**: Display search result of inputted food\n"+
            "(i.e. ?food coffee)\n"+
            "**?service**: Display search result of inputted service\n"+
            "(i.e. ?service sports)\n"+
            "**?building**: Display building information of inputted buildling code\n"+
            "(i.e. ?building MS)\n"+
            "**link**: Display a list of useful links\n"+
            "\n"+
            "\n" }
        )
        .setTimestamp()
        .setFooter("List created at", profilepic);
        message.channel.send("List of commands has been sent to your DM");
        message.author.send({embed:embed1}).catch(console.error);
}