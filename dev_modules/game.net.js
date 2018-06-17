var playersInGame = {};

module.exports = {
    init : init,
    setPlayersInGame : setPlayersInGame,
    addPlayerInGame : addPlayerInGame,
    players : getPlayersInGame,
    deletePlayer : deletePlayerInGame
}

function init () {
    playersInGame = {};
}

function getPlayersInGame () {
    return playersInGame;
}

function setPlayersInGame(players) {
    playersInGame = players;
}

function addPlayerInGame(socketId) {
    playersInGame[socketId] = {
        playerId: socketId,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue',
        transform: {
            x: Math.floor(Math.random() * 700) + 50,
            y: Math.floor(Math.random() * 500) + 50,
            rotation: 0,
        },
        velocity: Math.floor(Math.random() * 50) + 50
    };
}

function deletePlayerInGame(socketId) {
    delete playersInGame[socketId];
}


