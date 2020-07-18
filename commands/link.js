const Discord = require('discord.js');
const profilepic = process.env.profilepic;

module.exports.run = async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
        .setColor('#0A22EA') // Set the color for the side pannel
        .setTitle('Useful Links') // set the title
        .setThumbnail(profilepic)
        .setAuthor('UofTHelpBot', profilepic) // set the author, the profile picture on the right and the link for them
        .addFields(
            { name: 'Links', value: 
            "**Quercus**: https://q.utoronto.ca/\n"+
            "**Acorn**: https://acorn.utoronto.ca/\n"+
            "**Calendar**: https://fas.calendar.utoronto.ca/\n"+
            "**Sessional Dates**: https://fas.calendar.utoronto.ca/sessional-dates\n"+
            "**Academic Success**: https://studentlife.utoronto.ca/department/academic-success/\n"+
            "**Health & Wellness**: https://studentlife.utoronto.ca/department/health-wellness/\n"+
            "**Accessibility Services**: https://studentlife.utoronto.ca/department/accessibility-services/\n"+
            "\n"+
            "\n" }
        )
        .setTimestamp()
        .setFooter("List created at", profilepic);
        message.channel.send({embed:embed1}).catch(console.error);
}