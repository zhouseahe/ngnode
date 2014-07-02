/**
 * Module dependencies.
 */
var http = require('http');
var app = require('./dispatcher.js').app;

// https
/*
var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
};*/
// start httpServer
httpServer = http.createServer(app);
httpServer.listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});
httpServer.listen(app.post('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});
exports.httpServer = httpServer;

//start wsServer
var wsServer = require('./ws/wsServer.js');
