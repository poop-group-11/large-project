const mongoose = require('mongoose');
const Session = require("../schemas/sessionSchema.js");
const User = require("../schemas/userSchema.js");
var ObjectId = mongoose.Schema.Types.ObjectId;
var newObjectId = mongoose.Types.ObjectId;
const middleware = require('../middleware.js');

module.exports = (io) => {
 io.on('connection', client =>
 {
     console.log('someone connected');


     //recieved from mobile, sent to browser
     //client can join if session has less than max users
     client.on('join', (data) =>
     {

        sessionCode = sessionCode.toUpperCase();
        var { token, sessionCode } = data;
        let user = middleware.decode(token);
        Session.update({_id: sessionCode, userLength: { $lt: 8 }, isStarted: { $lt: 1 } },
          { $inc: { userLength: 1 }, $push: { users: newObjectId(user.id) } },
          (err, res) => {
            if(err){
              console.log('user unabled to join session: ' + err);
              io.to(sessionCode).emit('joinResponse', { user: user, success: false, message: "Database Error"});
            }
            else if(res.n == 0){
              console.log("session '" + sessionCode + "' does not exist");
              io.to(sessionCode).emit('joinResponse', { user: user, success: false, message: "Session " + sessionCode + " Does Not Exist"});
            }
            else if(res.nModified == 0){
              console.log('max users in session ' + sessionCode);
              io.to(sessionCode).emit('joinResponse', { user: user, success: false, message: "Session " + sessionCode + " Is Full"});
            }
            else {
              client.join(sessionCode);
              console.log(`client joined room: ${sessionCode}`);
              io.to(sessionCode).emit('userJoined', user);
              io.to(sessionCode).emit('joinResponse', { user: user, success: true, message: "Successfully Joined Session " + sessionCode});
            }
          });

     });

     //for browser ONLY to join session room
     client.on('joinSession', (sessionCode) =>
     {
      sessionCode = sessionCode.toUpperCase();
      client.join(sessionCode);
      console.log("browser joined room " + sessionCode);
      io.to(sessionCode).emit('browserJoined');
     });

     //recieved from browser
     //indicates that no more players can join
     //add all users that are in this session's room to the session database
     //use this to update the users
     client.on('sessionStart', (sessionCode) =>
     {
      sessionCode = sessionCode.toUpperCase();
       Session.findByIdAndUpdate(ObjectId(sessionCode), { isStarted: 1 }, err =>{
       console.log(sessionCode);
       Session.findByIdAndUpdate(sessionCode, { isStarted: 1 }, err =>{

        if(err) console.log(err);
       });

       io.to(sessionCode).emit('startSession');
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

     //if client leaves during game
     client.on('leave', (sessionCode, user) => {
      sessionCode = sessionCode.toUpperCase();
      client.leave(sessionCode);
      io.to(sessionCode).emit('userLeft', user);
     });

     //recieved from browser only, then sent to phone
     //tell phone which fish was caught
     client.on('fishCaught', (user, fish) =>
     {
       sockets.emit('caught', { user: user, fish: fish} );
     });

     //recieved from browser, session ended
     client.on('endSession', (sessionCode, winner) =>
     {
       sessionCode = sessionCode.toUpperCase();
       io.to(sessionCode).emit('sessionEnded', winner);

       //make all clients leave room
       io.of('/').in(sessionCode).clients((error, socketIds) => {
        if (error) throw error;
        socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(sessionCode));
       });

       //update dataabase with session winner
       Session.findByIdAndUpdate(sessionCode, { winner: ObjectId(winner) }, err => {
        if(err) console.log(err)
       });

       User.findByIdAndUpdate(ObjectId(winner), { $inc: { wins: 1 } }, err => {
        if(err) console.log(err);
       });

     });
 });
};
