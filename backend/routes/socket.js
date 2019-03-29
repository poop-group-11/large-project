module.exports = (io) => {
 io.on('connection', client =>
 {
     console.log('someone connected');

     //recieved from mobile, sent to browser
     //client can join if session has less than max users
     client.on('join', (sessionCode, user) =>
     {

     });

     //recieved from browser
     //indicates that no more players can join
     //add all users that are in this session's room to the session database
     client.on('sessionStart', (sessionCode) =>
     {

     });

    //recieved from mobile, sent to browser
     client.on('castHook', user =>
     {

     });

     //move the users reel up or down depending on the direction they reel
     //recieved from mobile, sent to browser
     client.on('reel', (user, direction) =>
     {

     });

     //recieved from browser only, then sent to phone
     client.on('fishCaught', (user, fish) =>
     {

     });
 });
};