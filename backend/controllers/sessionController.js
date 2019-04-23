const Session = require('../schemas/sessionSchema.js');
const shortid = require('shortid');
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

//POST request from browser
//creates session in database
//returns session code
let openSession = (req, res) =>
{
    // var id = shortid.generate;
    // console.log(id);
    let session = new Session();
    session.isStarted = 0;
    session._id = session._id.substring(0,5);
    session._id = session._id.toUpperCase();
    session.save((err, sesh)  => {
       if(err) return res.json({ success: false, message: "error creating session in database", error: err });
       return res.json({ success: true, message: sesh._id  });
    });
}

//ends session when time runs out
//declares winner and sets isExpired to true
// let endSession = (req, res) =>
// {
//     let { id, winner } = req;
//     Session.findOneAndUpdate({ _id: id }, { isExpired: true, winner: winner }, err =>
//     {
//         if(err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     });
// }

module.exports =
{
    openSession: openSession

};