let jwt = require('jsonwebtoken');
require('dotenv').config();

let checkToken = (req, res, next) => {
  // console.log(req.headers);
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    // console.log("TOKEN: " + token);s
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      // console.log("DECODED: ");
      // console.log(decoded);
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}
