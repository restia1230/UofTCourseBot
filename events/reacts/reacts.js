module.exports.run = (client, message) => {
// if (message.content.includes('qwq')){
//     let emoji = message.guild.emojis.find('name', "qwq")
//     message.react(emoji).then(console.log).catch(console.error);
//   }
  if (message.content.includes('Luna')){
    const ayy = client.emojis.get("652031503336734732");
    message.react(ayy).then(console.log).catch(console.error);
  }
  if(message.content == "<:cat01:621953228208078868>"){
    message.channel.send("<:cat01:621953228208078868>").catch(console.error);
  }
  if(message.content == "<:pig2:656149663124291627>"){
    message.channel.send("<:pig2:642415374188675073>").catch(console.error);
  }
  if(message.content == "<:pig2:642415374188675073>"){
    message.channel.send("<:pig2:656149663124291627>").catch(console.error);
  }
  if(message.content == "F"){
    message.channel.send("F").catch(console.error);
  }
}