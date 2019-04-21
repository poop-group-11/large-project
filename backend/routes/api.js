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
    router.post("/createUser", userController.createUser);

    router.post("/login", userController.loginHandler);

    //create session in database
    router.post("/openSession", sessionController.openSession);

    router.post("/caughtFish", middleware.checkToken, userController.caughtFish);

    //return fishCaught for user
    router.get("/getFish", middleware.checkToken, userController.getFish);



    return router;
};