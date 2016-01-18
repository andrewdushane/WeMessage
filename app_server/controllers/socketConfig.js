var io = require('socket.io')(8080);

var tmpId = 0;

io.on('connection', function (socket) {
  socket.username = 'Bobby';
  console.log('User connected');
  socket.emit('set-id', socket.client.id);
  socket.on('chatroom-message', function (data) {
    io.emit('chatroom-message', {
      sender: socket.client.id,
      username: socket.username,
      message: data
    });
  });

  // echo-ack, no currently in use
  socket.on('echo-ack', function (data, callback) {
    callback(data);
  });
});
