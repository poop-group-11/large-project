const mongoose = require('mongoose');
const Session = require("../schemas/sessionSchema.js");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = (io) => {
 io.on('connection', client =>
 {
     console.log('someone connected');
     var players = [];

     //recieved from mobile, sent to browser
     //client can join if session has less than max users
     client.on('join', (sessionCode, user) =>
     {
          


          //if(io.nsps['/'].adapter.rooms["session"+sessionCode] && io.nsps['/'].adapter.rooms["session"+sessionCode].length > 8) 
            //   socket.emit('newclientconnect',{ description: 'Session is at max capacity'});;
          //else
            //   socket.join("session"+sessionCode);
     });

     //recieved from browser
     //indicates that no more players can join
     //add all users that are in this session's room to the session database
     //use this to update the users 
     client.on('sessionStart', (sessionCode) =>
     {
          for( var member in io.nsps['/'].adapter.rooms["session"+sessionCode] ) {
               players.push(member);
          }

          Session.findByIdAndUpdate(ObjectId( sessionCode), {users: players}, err)


     });

    //recieved from mobile, sent to browser
    //tell everyone that some cast hook  io.emit casthook
    //put hook on screen
    //emit cast hook 
     client.on('castHook', user =>
     {
          //players[user].postion = 0;
          sockets.emit('cast',{ user: user});
     });

     //move the users reel up or down depending on the direction they reel
     //recieved from mobile, sent to browserp or down 
     //u
     client.on('reel', (user, direction) =>
     {
          sockets.emit('reeling',{ user: user, direction: direction});
     });

     //recieved from browser only, then sent to phone
     //tell phone which fish was caught
     client.on('fishCaught', (user, fish) =>
     {
          sockets.emit('caught',{ user: user, fish: fish} );
     });
 });
};