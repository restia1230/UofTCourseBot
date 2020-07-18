const Discord = require('discord.js');
const profilepic = process.env.profilepic;

module.exports.run = async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
        .setColor('#0A22EA') // Set the color for the side pannel
        .setTitle('UofTCourseBot') // set the title
        .setThumbnail(profilepic)
        .setDescription('Refer to official UofT websites for the most accurate information. The info provided by the bot is only for reference and does not represent official notice/announcement of UofT. It is your own responsibility to make sure the information is correct.')
        .setAuthor('UofTCourseBot', profilepic) // set the author, the profile picture on the right and the link for them
        .addFields(
            { name: 'Commands', value: 
            "**?course**: Display information of the first result from a course search based on the inputted course code\n"+
            "(i.e. ?course imm429, ?course imm)\n"+
            "**?exam**: Display exam information of the first result from a course search based on the inputted course code\n"+
            "(i.e. ?exam imm429, ?exam imm)\n"+
            "\n"+
            "\n" }
        )
        message.channel.send({embed:embed1}).catch(console.error);
}