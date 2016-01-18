var io = require('socket.io')(8080);

var tmpId = 0;

io.on('connection', function (socket) {
  console.log(socket.client.id);
  console.log('User connected');
  socket.emit('set-id', socket.client.id);
  socket.on('chatroom-message', function (data) {
    io.emit('chatroom-message', {
      sender: socket.client.id,
      message: data
    });
  });

  // echo-ack, no currently in use
  socket.on('echo-ack', function (data, callback) {
    callback(data);
  });
});
