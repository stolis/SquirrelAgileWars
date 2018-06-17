var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io').listen(server);
var gameNet = require('./dev_modules/game.net');

gameNet.init();

app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
io.on('connection', function (socket){
  gameNet.addPlayerInGame(socket.id);
  socket.emit('currentPlayers', gameNet.players());
  socket.broadcast.emit('newPlayer', gameNet.players()[socket.id]);

  socket.on('disconnect', function (){
    gameNet.deletePlayer(socket.id);
    io.emit('disconnect', socket.id);
  });

  // when a player moves, update the player data
  socket.on('playerMovement', function (movementData) {
    gameNet.players()[socket.id].transform.x = movementData.x;
    gameNet.players()[socket.id].transform.y = movementData.y;
    gameNet.players()[socket.id].transform.rotation = movementData.rotation;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', gameNet.players()[socket.id]);
  });

  socket.on('playerStoppedMoving', function() {
    socket.broadcast.emit('playerStoppedMoving', gameNet.players()[socket.id]);
  });

});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});