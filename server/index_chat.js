// const express = require('express');
// const socket = require('socket.io')
// const app = express();
//
// const port = 3000
//
// app.get('/', function(res, rep) {
//     rep.send('Hello, word!');
// });
//
// var server = app.listen(port, function () {
//     console.log(`App listening on port ${port}!`);
// })
//
// app.use(express.static('public'));
//
// var io = socket(server);
//
// io.on('connection', function (socket) {
//     console.log('socket connection',socket.id);
//
//     socket.on('chat', function(data){
//         io.sockets.emit('chat', data)
//     })
//     socket.on('typing', function(data){
//         socket.broadcast.emit('typing', data)
//     })
// });
