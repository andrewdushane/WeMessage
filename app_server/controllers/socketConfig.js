var io = require('socket.io')(8080);

var rooms = [];

io.on('connection', function (socket) {

  socket.emit('set-id', socket.client.id);

  socket.on('join-room', function(data) {
    socket.room = data.roomid;
    socket.username = data.nickname;
    socket.join(socket.room);
    socket.emit('nickname-set', socket.username);
    io.sockets.in(socket.room).emit('chatroom-message', {
      sender: 'the socket master',
      username: '',
      message: socket.username + ' joined the discussion.'
    });
  });

  socket.on('set-nickname', function(name) {
    socket.username = name;
    socket.emit('nickname-set', name)
  });

  socket.on('chatroom-message', function (data) {
    io.sockets.in(socket.room).emit('chatroom-message', {
      sender: socket.client.id,
      username: socket.username,
      message: data
    });
  });

  socket.on('disconnect', function() {
    io.sockets.in(socket.room).emit('chatroom-message', {
      sender: 'the socket master',
      username: '',
      message: socket.username + ' has left the discussion.'
    });
  })

  // echo-ack, not currently in use
  socket.on('echo-ack', function (data, callback) {
    callback(data);
  });
});
