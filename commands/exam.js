const fetch = require('node-fetch');
const profilepic = process.env.profilepic;

function replace1(de){
    var dec = de.replace("*","\\\*");
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
        var location = "N/A"
        if(items[i].location != null){
            location = items[i].location;
        }
      var item = {  
        name:  `Lecture code: ${items[i].lecture_code}`,
        value: `Last Name: ${items[i].split}` +"\n"+
        `Location: ${location}`
      }
      arr.push(item);
    }
    return arr; 
  }  

exports.run = async (client, message, args, ops) => {

    if (!args.length) {
        return message.channel.send('You need to supply a search term!');
    }

    const query = message.content.substring(6);

    let exam = await fetch(`https://nikel.ml/api/exams?course_code=${query}`)
        .then(res => res.json()).catch(err =>{
            return message.channel.send("Course not found.")});
    
    if(exam.status_message =="success: results not found"){
        return message.channel.send("Course not found or no exam for inputted course.");
    }

    var exchoice = 0;
    for(var i=0; i<exam.response.length; i++){
        if(i==0){
            exchoice=0;
        }
        else{
            if(exam.response[i].date.substring(0,4) > exam.response[exchoice].date.substring(0,4)){
                exchoice = i;
            }
            else if(exam.response[i].date.substring(0,4) == exam.response[exchoice].date.substring(0,4)){
                if(exam.response[i].date.substring(5,7) > exam.response[exchoice].date.substring(5,7)){
                    exchoice = i;
                }
            }
        }
    }

    var arr = field(exam.response[exchoice].sections);
    message.channel.send({embed: {
        color: 0x0A22EA,
        author: {
          name: client.user.username,
          icon_url: profilepic 
        },
        thumbnail: {profilepic},
        title: `Exam schedule for ${exam.response[exchoice].course_code}`,
        fields: [{
            name: `${exam.response[exchoice].course_code}`,
            value: `**Campus**: ${exam.response[exchoice].campus}` + "\n" +
            `**Date**: ${replace1(exam.response[exchoice].date)}` + "\n" +
            `**Start Time**: ${toHHMMSS(exam.response[exchoice].start)}` + "\n" +
            `**End Time**: ${toHHMMSS(exam.response[exchoice].end)}` + "\n" 
        },
        arr
        ],
        footer: {
          icon_url: profilepic ,
          text: "Refer to official exam timetable for most accurate info."
        }
      }
    }).catch(err =>{
      console.log(err);
    });;
}
