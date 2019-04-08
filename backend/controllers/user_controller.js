const User = require("../schemas/userSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


module.exports = class UserController
{
    createUser(req, res) {
        let user = new User();

        console.log(req.body);
        const { username, password } = req.body;

        //prevent creation of account if something is wrong
        //TODO: add more issues
        if(!username || !password) {
            return res.json({
              success: false,
              message: "INVALID INPUTS"
            });
        }

        console.log(username);

        User.find({ username:username }, (error, data) => {
           if(error){
              console.log("error: " + error);
              return res.json({
                success: false,
                message: 'ERROR SAVING TO DATABASE',
                error: error
              });

           }else if(data.length == 0){
            // console.log(data);
            // console.log("Saving User: " + username);
            //otherwise post data
            user.username = username;
            var hash;
            try{
                hash = bcrypt.hashSync(password, 10);
            }catch(err){
                console.log("error hashing password");
                return res.json({
                    success: false,
                    message: "error hashing password",
                    error: err
                });
            }
            user.pass = hash;
            user.save(err => {
                if (err) return res.json({ success: false, message: "error saving user to database", error: err });
                return res.json({ success:true });
            });



            }else{
                // console.log(data);
                return res.json({
                    success: false,
                    message: 'Username already exists'
                });
            }
        });
    }

    loginHandler(req, res) {

      console.log(req.body);
      const { username, password } = req.body;
      // For the given username fetch user from DB
      // let mockedUsername = 'admin';
      // let mockedPassword = 'password';


      if (username && password) {

        User.find({username: username}, (err, data) => {
          if(err){
            return res.json({
              success: false,
              error: err
            });
          }
          else if(data.length == 0){
            return res.json({
              success: false,
              message: "user does not exist"
            });
          }
          else {
            //user exists
            // console.log(data);
            if(bcrypt.compareSync(password, data[0].pass)){
              //paswords match
              console.log("ID: " + data[0]._id);
              let token = jwt.sign(
                {username: data[0].username, id: data[0]._id},
                process.env.SECRET,
                { expiresIn: '24h'} // expires in 24 hours
              );
              // return the JWT token for the future API calls
              res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
              });
            }else{
              //passwords don't match
              return res.json({
                success: false,
                error: error,
                message: "password provided was incorrect"
              });
            }

          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }

    getFish(req, res) {
      User.findById(ObjectId(req.decoded.id), (err, user) => {
        if (err) return res.json({ success: false, message: 'ERROR GETTING FISH', error: err });
        return res.json({ success: true, fish: user.fish });
      });
    }

    caughtFish(req, res) {

      Users.update({ _id:req.decoded.id }, { $push: { fish: { $each: req.body.fish } } }, err => {
        if(err){
          console.log('error adding fish to database. error: ' + err);
          return res.json({ success: false, message: 'ERROR ADDING FISH TO DATABASE', error: err });
        } else {
          return res.json({ success: true });
        }
      });

    }


};