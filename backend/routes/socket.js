module.exports = (io) => {
 io.on('connection', client =>
 {
     console.log('someone connected');
 });
};