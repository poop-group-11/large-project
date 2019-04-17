const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./schemas/userSchema");
require('dotenv').config();
// const middleware = require('./middleware');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var ObjectId = mongoose.Types.ObjectId;

const API_PORT = 3001;
app.use(cors());
const router = express.Router();

let dbRoute;

// this is our MongoDB database
if(process.env.PROD) { //This will return true when run on our server
  dbRoute = "mongodb://localhost:27017/leins"; //This is our locally hosted DB.
} else {
  dbRoute = "mongodb://poopgroup11:poopgroup11@ds211096.mlab.com:11096/leineckerslines";
}

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db
  .once("open", () => console.log("connected to the database"))

  // checks if connection with the database is successful
  .on("error", console.error.bind(console, "MongoDB connection error:"));

const api_routes = require('./routes/api');
const socket_routes = require('./routes/socket');

socket_routes(io);

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app
  .use(bodyParser.urlencoded({ extended: false }))

  .use(bodyParser.json())

  .use(logger("dev"))

  .use(cors())

  .use((req, res, next) => {
      console.log("GOT A REQUEST");
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

      //intercepts OPTIONS method
      if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
      }
      else {
      //move on
        next();
      }
  })


// append /api for our http requests
  .use("/api", api_routes(io))

  .use((req, res) =>
    res.send('404'));

// launch our backend into a port
server.listen(API_PORT, () => console.log(`running at port http://localhost:${API_PORT}`));
// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
