const fetch = require('node-fetch');
const profilepic = process.env.profilepic;

function replace1(de){
    var dec = de.replace("*","\\\*");
    dec = dec.replace("\u003cbr /\u003e\n","");
    dec = dec.replace("\u003cbr /\u003e\n\u003cbr /\u003e\n","");
    dec = dec.replace("\u003cbr","");
    dec = dec.replace("/\u003e","");
    
    return dec;
}

function toHHMMSS(timev) {
    var sec_num = parseInt(timev, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ':' + minutes + ':' + seconds;
}

function field(items){
    var arr = [];
    for(var i = 0; i< items.length; i++){
        var tempa="None";
        if(items[i].alias != null){
            tempa = items[i].alias;
        }
      var item = {  
        name:  `${items[i].name}`,
        value: `Alias: ${tempa}` +"\n"+
        `Description: ${replace1(items[i].description)}` +"\n"+
        `Location: ${items[i].address}` +"\n"+
        `Tags: ${items[i].tags}`+"\n"+
        `Campus: ${items[i].campus}`
      }
      arr.push(item);
    }
    return arr; 
  }  

exports.run = async (client, message, args, ops) => {

    if (!args.length) {
        return message.channel.send('You need to supply a search term!');
    }

    const query = message.content.substring(9);

    let service = await fetch(`https://nikel.ml/api/services?tags=${query}&limit=5`)
        .then(res => res.json()).catch(err =>{
            return message.channel.send("Service not found.")});
    // console.log(food)
    // var v = await JSON.parse(food);
    // console.log(v)
    if(service.status_message =="success: results not found"){
        return message.channel.send("Service not found.");
    }

    var arr = field(service.response);
    message.channel.send({embed: {
        color: 0x0A22EA,
        author: {
          name: client.user.username,
          icon_url: profilepic 
        },
        thumbnail: {profilepic},
        title: `Service search result for ${query}`,
        fields: arr,
        timestamp: new Date(),
        footer: {
          icon_url: profilepic ,
          text: "List created at"
        }
      }
    }).catch(err =>{
      console.log(err);
    });;
}
