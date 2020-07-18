const fetch = require('node-fetch');
const profilepic = process.env.profilepic;

function replace1(de){
    var dec = de.replace("*","\\\*");
    return dec;
}

exports.run = async (client, message, args, ops) => {

    if (!args.length) {
        return message.channel.send('You need to supply a search term!');
    }

    const query = message.content.substring(8);

    let course = await fetch(`https://nikel.ml/api/courses?code=${query}`)
        .then(res => res.json()).catch(err =>{
            return message.channel.send("Course not found.")});
    
    if(course.status_message =="success: results not found"){
        return message.channel.send("Course not found.");
    }

    var prereq = 'None';
    var exclusion ='None';
    var breadth = 'None';
    if(course.response[0].prerequisites != null){
        prereq = replace1(course.response[0].prerequisites);
    }
    if(course.response[0].exclusions != null){
        exclusion = replace1(course.response[0].exclusions);
    }
    if(course.response[0].breadth != null){
        prereq = replace1(course.response[0].breadth);
    }
    var clink = null;
    if(course.response[0].campus == 'St. George'){
        clink = `https://fas.calendar.utoronto.ca/course/${course.response[0].code}`;
    }


    message.channel.send({embed: {
        color: 0x0A22EA,
        author: {
          name: client.user.username,
          icon_url: profilepic 
        },
        thumbnail: {profilepic},
        url: clink,
        title: `Course information for ${course.response[0].code}`,
        fields: [{
            name: `${course.response[0].name}: ${course.response[0].code}`,
            value: `**Department**: ${course.response[0].department}` + "\n" +
            `**Prerequisites**: ${prereq}` + "\n" +
            `**Exclusions**: ${exclusion}` + "\n"
        },
        {
            name: `--`,
            value: `**Description**: ${replace1(course.response[0].description)}` + "\n" +
            `**Campus**: ${course.response[0].campus}`
        },
        {
            name:`--`,
            value: `**Term**: ${course.response[0].term}`  + "\n" +
            `**Breadth**: ${course.response[0].arts_and_science_breadth}`
        }
        ],
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