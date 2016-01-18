var io = require('socket.io')(process.env.PORT || 8080);

var tmpId = 0;

io.on('connection', function (socket) {
  socket.emit('set-id', socket.client.id);
  socket.on('set-nickname', function(name) {
    socket.username = name;
    socket.emit('nickname-set', name)
  });
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
