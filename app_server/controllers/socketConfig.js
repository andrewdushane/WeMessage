var io = require('socket.io')(8080);

var rooms = [];

var users = [];

io.on('connection', function (socket) {

  socket.emit('set-id', socket.client.id);

  socket.on('join-room', function(data) {
    socket.room = data.roomid;
    socket.username = data.nickname;
    socket.join(socket.room);
    users.push({
      id: socket.id,
      room: socket.room,
      username: socket.username
    });
    socket.emit('nickname-set', socket.username);
    if(!data.conversation) {
      socket.broadcast.to(socket.room).emit('chatroom-message', {
        sender: 'the socket master',
        username: '',
        message: socket.username + ' joined the discussion.'
      });
      var greeting = 'Welcome, ' + socket.username + '! Have fun and please, keep it friendly.';
      systemMessageToSender(socket, greeting);
    }
  });

  socket.on('request-sockets-in-room', function() {
    var inRoom = [];
    for(var i = 0; i < users.length; i++) {
      if(users[i].room == socket.room) {
        inRoom.push(users[i].username);
      }
    }
    socket.emit('deliver-sockets-in-room', inRoom);
  })

  socket.on('set-nickname', function(name) {
    socket.username = name;
    socket.emit('nickname-set', name)
  });

  socket.on('chatroom-message', function (message) {
    var clean = false;
    var isImage = checkIfImage(message);
    if(!isImage) {
      clean = checkForBadWords(message);
    }
    if(isImage || clean) {
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
    for(var i = 0; i < users.length; i++) {
      if(users[i].id == socket.id) {
        users.splice(i, 1);
        break;
      }
    }
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

var checkIfImage = function(string) {
  if(string.search('data:image/') != -1) {
    return true;
  } else return false;
}

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
