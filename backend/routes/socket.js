const mongoose = require('mongoose');
const Session = require("../schemas/sessionSchema.js");
const User = require("../schemas/userSchema.js");
var ObjectId = mongoose.Schema.Types.ObjectId;
const middleware = require('../middleware.js');

module.exports = (io) => {
 io.on('connection', client =>
 {
     console.log('someone connected');


     //recieved from mobile, sent to browser
     //client can join if session has less than max users
     client.on('join', (sessionCode, token) =>
     {
        let user = middleware.decode(token);
        Session.update({_id: ObjectId(sessionCode), userLength: { $lt: 8 }, isStarted: { $lt: 1 } },
                       { $inc: { userLength: 1 }, $push: { users: ObjectId(user.id) } },
                       err => {
                         if(err) console.log(err);
                         else {
                          client.join(sessionCode);
                          console.log(`client joined room: ${sessionCode}`);
                          io.to(sessionCode).emit('userJoined', user);
                         }
                       });

     });

     //recieved from browser
     //indicates that no more players can join
     //add all users that are in this session's room to the session database
     //use this to update the users
     client.on('sessionStart', (sessionCode) =>
     {
       Session.findByIdAndUpdate(ObjectId(sessionCode), { isStarted: 1 }, err =>{
        if(err) console.log(err);
       });

     });

    //recieved from mobile, sent to browser
    //tell everyone that some cast hook  io.emit casthook
    //put hook on screen
     client.on('castHook', user =>
     {
          sockets.emit('casted', { user: user});
     });

     //move the users reel up or down depending on the direction they reel
     //recieved from mobile, sent to browser up or down
     client.on('reel', (user, direction) =>
     {
       sockets.emit('reeled', { user: user, direction: direction});
     });

     //recieved from browser only, then sent to phone
     //tell phone which fish was caught
     client.on('fishCaught', (user, fish) =>
     {
       sockets.emit('caught', { user: user, fish: fish} );
     });

     client.on('endSession', (sessionCode, winner) =>
     {
       //make all clients leave room
       io.of('/').in(sessionCode).clients((error, socketIds) => {
        if (error) throw error;
        socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(sessionCode));
       });

       //update dataabase with session winner
       Session.findByIdAndUpdate(ObjectId(sessionCode), { winner: ObjectId(winner) }, err => {
        if(err) console.log(err)
       });

       User.findByIdAndUpdate(ObjectId(winner), { $inc: { wins: 1 } }, err => {
        if(err) console.log(err);
       });
     });
 });
};