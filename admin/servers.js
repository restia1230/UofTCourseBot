const servers = new Map();
const queue = require (`./music-queue`); 

module.exports =  {
    addServers: function (id, queue){
        servers.set(id, queue)
    }
}


module.exports.servers = servers; 
