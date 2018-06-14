var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  } 
};

var player;
var playerWalkLeft;
var otherPlayers;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('ship', './assets/spaceShips_001.png');
    this.load.image('otherPlayer', './assets/enemyBlack5.png');
    this.load.atlas('brute_001', './assets/Brute-001-atlas.png', '../assets/Brute-001.json');
}
 
function create() {
    var self = this;
    
    //init and assign network module
    this.socket = io();
    this.otherPlayers = this.physics.add.group();
    this.playersInGame = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });

    //event fire of other players joining
    this.socket.on('currentPlayers', function (players, gameNet){
        //self.playersInGame.setText('Players in game: ' + gameNet.countPlayers());
        Object.keys(players).forEach(function (id){
            if (players[id].playerId === self.socket.id){
                addPlayer(self, players[id]);
            } else {
                addOtherPlayers(self, players[id]);
            }
        });
    });

    //event fire of this player joining
    this.socket.on('newPlayer', function (playerInfo){
        addOtherPlayers(self, playerInfo);
    });

    //event fire when a user disconnects
    this.socket.on('disconnnect', function (playerId){
        console.log(playerId);
        self.otherPlayers.getChildren().forEach(function (otherPlayer){
            if (playerId === otherPlayer.playerId){
                otherPlayer.destroy();
            }
        });
    });

    //event fire when a player moves
    this.socket.on('playerMoved', function (playerInfo) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
            otherPlayer.setRotation(playerInfo.rotation);
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          }
        });
      });

    //Create animation of spritesheet
    this.cursors = this.input.keyboard.createCursorKeys();

}
 
function update() {
    if (this.player) {
        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-150);
          this.player.anims.play('walkleft', true);
          //this.playerWalkLeft.play(30, true);
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(150);
        } else if (this.cursors.up.isDown){
          this.player.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
          this.player.setVelocityY(150);
        } else {
            this.player.setVelocity(0);
        }
      
        /*if (this.cursors.up.isDown) {
          this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
        } else {
          this.ship.setAcceleration(0);
        }*/

        // emit player movement
        var x = this.player.x;
        var y = this.player.y;
        var r = this.player.rotation;
        if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y || r !== this.player.oldPosition.rotation)) {
            this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y, rotation: this.player.rotation });
        }
        
        // save old position data
        this.player.oldPosition = {
            x: this.player.x,
            y: this.player.y,
            rotation: this.player.rotation
        };
      
        //this.physics.world.wrap(this.ship, 5);
    }
}

function addPlayer(self, playerInfo) {
    //self.ship.setCollideWorldBounds(true);
    self.player = self.physics.add.sprite(200, 200, 'brute_001');
    //self.playerWalkLeft = self.player.anims.add('walkLeft', Phaser.Animation.generateFrameNames('brute_001 ', 48, 55, '.ase', 1));
    var sdf = self.anims.generateFrameNames('brute_001', { prefix: 'Brute_001 ', start: 48, end: 55, suffix: '.aseprite', zeroPad: 1 });
    console.log(sdf);
    self.anims.create({
        key: 'walkleft',
        frames: self.anims.generateFrameNames('brute_001', { prefix: 'Brute_001 ', start: 48, end: 55, suffix: '.aseprite', zeroPad: 1 }),
        frameRate: 10,
        repeat: -1
    });
    self.player.setCollideWorldBounds(true);
    //self.ship = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'brute_001').setOrigin(0.5, 0.5).setDisplaySize(32, 32);
    //console.log(self.ship);
    /*if (playerInfo.team === 'blue') {
      self.ship.setTint(0x0000ff);
    } else {
      self.ship.setTint(0xff0000);
    }*/
    /*self.ship.setDrag(100);
    self.ship.setAngularDrag(100);
    self.ship.setMaxVelocity(200);*/
}

function addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    if (playerInfo.team === 'blue') {
      otherPlayer.setTint(0x0000ff);
    } else {
      otherPlayer.setTint(0xff0000);
    }
    otherPlayer.playerId = playerInfo.playerId;
    self.otherPlayers.add(otherPlayer);
}