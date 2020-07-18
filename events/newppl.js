module.exports = (client, member) => {
    // Send the message to a designated channel on a server:
    console.log("re1")
    const channel = member.guild.channels.cache.find(ch => ch.id === '694994523306197062');
    console.log(ch.id)
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    console.log("fff")
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
} 