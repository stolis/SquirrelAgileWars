var playersInGame = {};

module.exports = {
    setPlayersInGame : setPlayersInGame,
    addPlayerInGame : addPlayerInGame//,
    //removePlayerFromGame : removePlayerFromGame
}

function setPlayersInGame(players) {
    playersInGame = players;
}

function addPlayerInGame(socketId) {
    playersInGame[socketId] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socketId,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
      };
    console.log(playersInGame);
    return playersInGame;
}

/*function removePlayerFromGame(socketId){
    delete module.exports.playersInGame[socketId];
}*/

