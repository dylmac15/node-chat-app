const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = app.listen(port);
var io = socketIO.listen(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from:'Mike',
    text: 'test text',
    createdAt: 123123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// if(!module.parent){
//   server.listen(port, () => {
//     console.log(`Server is up on port ${port}`);
//   });
// }
