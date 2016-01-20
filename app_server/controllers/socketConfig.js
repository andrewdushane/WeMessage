var io = require('socket.io')(8080);

var rooms = [];

io.on('connection', function (socket) {

  socket.emit('set-id', socket.client.id);

  socket.on('join-room', function(data) {
    socket.room = data.roomid;
    socket.username = data.nickname;
    socket.join(socket.room);
    socket.emit('nickname-set', socket.username);
    socket.broadcast.to(socket.room).emit('chatroom-message', {
      sender: 'the socket master',
      username: '',
      message: socket.username + ' joined the discussion.'
    });
    var greeting = 'Welcome, ' + socket.username + '! Have fun and please, keep it friendly.';
    systemMessageToSender(socket, greeting);
  });

  socket.on('set-nickname', function(name) {
    socket.username = name;
    socket.emit('nickname-set', name)
  });

  socket.on('chatroom-message', function (message) {
    var clean = checkForBadWords(message);
    if(clean) {
      io.sockets.in(socket.room).emit('chatroom-message', {
        sender: socket.client.id,
        username: socket.username,
        message: message
      });
    } else {
      var scolding = 'Such language, ' + socket.username + '! Please, keep it clean.';
      systemMessageToSender(socket, scolding);
    }
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

var systemMessageToSender = function(socket, message) {
  socket.emit('chatroom-message', {
    sender: 'the socket master',
    username: '',
    message: message
  });
};

var checkForBadWords = function(string) {
  var swears = ['fuck', 'shit', 'cunt', 'faggot', 'pussy', 'bitch', 'asshole'];
  var clean = true;
  for(var i=0; i < swears.length; i++) {
    if(string.toLocaleLowerCase().search(swears[i]) != -1) {
      clean = false;
      break;
    }
  }
  return clean;
};
