const Session = require('../schemas/sessionSchema.js');

//POST request from browser
//creates session in database
//returns session code
let startSession = (req, res) =>
{
    let session = new Session();
    session.isExpired = false;
    session.save(err, sesh  => {
       if(err) return res.json({ success: false, message: "error creating session in database", error: err });
       return res.json({ success: true, message: sesh._id  });
    });
}

//ends session when time runs out
//declares winner and sets isExpired to true
let endSession = (req, res) =>
{
    let { id } = req;
}

module.exports =
{
    startSession: startSession
};