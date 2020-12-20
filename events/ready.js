module.exports = (client) => {
        client.user.setActivity(`?help / ?helpdm`);
        console.log(`Ready to serve on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users.`);
        let guilds = client.guilds.cache;
        var count = 0;
        guilds.each(guild => count+= guild.memberCount);
        console.log(`Ready to serve on ${client.guilds.cache.size} servers, for ${count} users.`);
} 