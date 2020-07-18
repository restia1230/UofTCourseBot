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

    // var prereq = 'None';
    // var exclusion ='None';
    // var breadth = 'None';
    // if(course.response[0].prerequisites != null){
    //     prereq = replace1(course.response[0].prerequisites);
    // }
    // if(course.response[0].exclusions != null){
    //     exclusion = replace1(course.response[0].exclusions);
    // }
    // if(course.response[0].breadth != null){
    //     prereq = replace1(course.response[0].breadth);
    // }
    // var clink = null;
    // if(course.response[0].campus == 'St. George'){
    //     clink = `https://fas.calendar.utoronto.ca/course/${course.response[0].code}`;
    // }

    
    message.channel.send({embed: {
        color: 0x0A22EA,
        author: {
          name: client.user.username,
          icon_url: profilepic 
        },
        thumbnail: {profilepic},
        title: `Exam schedule for ${exam.response[0].course_code}`,
        fields: [{
            name: `${exam.response[0].course_code}`,
            value: `**Campus**: ${exam.response[0].campus}` + "\n" +
            `**Date**: ${replace1(exam.response[0].date)}` + "\n" +
            `**Start Time**: ${toHHMMSS(exam.response[0].start)}` + "\n" +
            `**End Time**: ${toHHMMSS(exam.response[0].end)}` + "\n" 
        },
        {
            name:
            value:
        }
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