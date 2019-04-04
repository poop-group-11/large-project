module.exports = (io) =>
{
    const express = require('express');
    const router = express.Router();
    const middleware = require('../middleware.js');

    // const bodyParser = require("body-parser");
    // const logger = require("morgan");
    const UserController = require('../controllers/user_controller.js');
    const userController = new UserController();
    const sessionController = require('../controllers/sessionController.js');

    // router.options("*", cors(), (req, res) => {
    //   console.log("RECIEVED OPTIONS REQUEST");
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //   return res.json({ success: true });
    // });

    //Create user in database when client wants to register a new account
    router.post("/createUser", userController.createUser
    // (req, res) => {
    //   let user = new User();

    //   console.log(req.body);
    //   const{ username, password } = req.body;

    //   //prevent creation of account if something is wrong
    //   //TODO: add more issues
    //   if(!username || !password) {
    //     return res.json({
    //       success: false,
    //       error: "INVALID INPUTS"
    //     });
    //   }

    //   console.log(username);

    //   User.find({ username:username }, (error, data) => {
    //     if(error){
    //       console.log("error: " + error);
    //       return res.json({
    //         success: false,
    //         error: error
    //       });
    //     }else if(data.length == 0){
    //       // console.log(data);
    //       // console.log("Saving User: " + username);
    //       //otherwise post data
    //       user.username = username;
    //       var hash;
    //       try{
    //         hash = bcrypt.hashSync(password, 10);
    //       }catch(err){
    //         console.log("error hashing password");
    //         return res.json({
    //           success: false,
    //           message: "error hashing password",
    //           error: err
    //         });
    //       }
    //       user.pass = hash;
    //       user.save(err => {
    //         if (err) return res.json({ success: false, message: "error saving user to database", error: err });
    //         return res.json({ success:true });
    //       });



    //     }else{
    //       // console.log(data);
    //       return res.json({
    //         success: false,
    //         message: 'Username already exists'
    //       });
    //     }
    //   });
    // }
    );

    router.post("/login", userController.loginHandler);

    //create session in database
    router.post("/startSession", sessionController.startSession);

    //set isExpired to true
    router.post("/endSession", sessionController.endSession);

    //return fishCaught for user
    router.get("/getFish", middleware.checkToken, userController.getFish);

    return router;
};