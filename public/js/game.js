var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1000,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
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
var otherPlayers;
var level;
var charTypes = ['BruteHipster'];
var charAnimationParts = ['torso', 'rest']; 
var animations = ['sides','walkright','walkdownright','walkupright','walkdown','walkup','walkleft','walkdownleft','walkupleft'];
var poses = ['standupleft','standleft','standdownleft','standdown','standdownright', 'standright', 'standupright', 'standup'];
var game = new Phaser.Game(config);

function preload() {
    this.load.image('Wall-Concrete', './assets/Wall-Concrete.png');
    //this.load.atlas('Brute-001', './assets/Brute-001-atlas.png', '../assets/Brute-001.json');
    this.load.atlas('Brute-001-rest', './assets/Brute-001-rest.png', '../assets/Brute-001-rest.json');
    this.load.atlas('Brute-001-torso', './assets/Brute-001-torso.png', '../assets/Brute-001-torso.json');
    this.load.image('Trace', './assets/PawnTrace.png');
}
 
function create() {
    var self = this;
    
    self.level = new GameLevel(self);
    self.level.generateRoom2D({x:100, y:100, rotation:0}, {length: 8, width: 18});
    for (var i = 0; i < self.level.walls.children.entries.length; i++){
        self.level.walls.children.entries[i].depth = i;
    }
    initAnimations(self, 'Brute-001');
    //init and assign network module
    this.socket = io();
    this.otherPlayers = this.physics.add.group();
    
    //event fire of other players joining
    this.socket.on('currentPlayers', function (players){
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
    this.socket.on('disconnnected', function (playerId){
        alert('disconnected in client');
        self.otherPlayers.getChildren().forEach(function (otherPlayer){
            if (playerId === otherPlayer.playerId){
                otherPlayer.destroy();
            }
        });
    });

    //event fire when a player moves
    // this.socket.on('playerMoved', function (playerInfo) {
    //     self.otherPlayers.getChildren().forEach(function (otherPlayer) {
    //         if (playerInfo.playerId === otherPlayer.playerId) {
    //             if ((otherPlayer.x < playerInfo.transform.x) && (otherPlayer.y < playerInfo.transform.y))
    //                 otherPlayer.anims.play('walkdownright', true);
    //             else if ((otherPlayer.x < playerInfo.transform.x) && (otherPlayer.y > playerInfo.transform.y))
    //                 otherPlayer.anims.play('walkupright', true);
    //             else if ((otherPlayer.x > playerInfo.transform.x) && (otherPlayer.y < playerInfo.transform.y))
    //                 otherPlayer.anims.play('walkdownleft', true);
    //             else if ((otherPlayer.x > playerInfo.transform.x) && (otherPlayer.y > playerInfo.transform.y))
    //                 otherPlayer.anims.play('walkupleft', true);
    //             else if (otherPlayer.x > playerInfo.transform.x)
    //                 otherPlayer.anims.play('walkleft', true);
    //             else if (otherPlayer.x < playerInfo.transform.x)
    //                 otherPlayer.anims.play('walkright', true);
    //             else if (otherPlayer.y > playerInfo.transform.y)
    //                 otherPlayer.anims.play('walkup', true);
    //             else if (otherPlayer.y < playerInfo.transform.y)
    //                 otherPlayer.anims.play('walkdown', true);
                
    //             otherPlayer.x = playerInfo.transform.x;
    //             otherPlayer.y = playerInfo.transform.y;
    //         }
    //     });
    // });

    // this.socket.on('playerStoppedMoving', function (playerInfo) {
    //     self.otherPlayers.getChildren().forEach(function (otherPlayer) {
    //         if (playerInfo.playerId === otherPlayer.playerId) {
    //             if (otherPlayer.anims.currentAnim != null){
    //                 if (otherPlayer.anims.currentAnim.key == 'walkleft'){
    //                     otherPlayer.anims.play('standleft', true);
    //                 }
    //                 else if (otherPlayer.anims.currentAnim.key == 'walkright'){
    //                     otherPlayer.anims.play('standright', true);
    //                 }
    //                 else if (otherPlayer.anims.currentAnim.key == 'walkup'){
    //                     otherPlayer.anims.play('standup', true);
    //                 }
    //                 else if (otherPlayer.anims.currentAnim.key == 'walkdown'){
    //                     otherPlayer.anims.play('standdown', true);
    //                 }
    //                 else if (otherPlayer.anims.currentAnim.key == 'walkupleft'){
    //                     otherPlayer.anims.play('standupleft', true);
    //                 }
    //                 else if (otherPlayer.anims.currentAnim.key == 'walkupright'){
    //                     otherPlayer.anims.play('standupright', true);
    //                 }
    //                 else if (otherPlayer.anims.currentAnim.key == 'walkdownleft'){
    //                     otherPlayer.anims.play('standdownleft', true);
    //                 }
    //                 else if (otherPlayer.anims.currentAnim.key == 'walkdownright'){
    //                     otherPlayer.anims.play('standdownright', true);
    //                 }
    //             }
    //         }
    //     });
    // });

    //Create animation of spritesheet
    this.cursors = this.input.keyboard.createCursorKeys();

}
 
function update() {
    if (this.player) {
        this.player.move();
        
        // if (this.player.pawnHasMoved()) {
        //     this.socket.emit('playerMovement', this.player.getTransform());
        // }
        
        // if (!this.player.isMoving())
        //     this.socket.emit('playerStoppedMoving');
        
        this.player.updatePawnTransform();
    }
}

function addPlayer(self, playerInfo) {
    self.player = new GamePawn(self, playerInfo);
    var overlapObjs = [];
    overlapObjs.push(self.level.walls);
    self.player.setOverlap(self.level.walls);
    self.player.setCollision(self.level.wallCollisions);
}

function addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.add.sprite(playerInfo.transform.x, playerInfo.transform.y, 'Brute-001').setOrigin(0.5, 0.5).setDisplaySize(64, 64);
    if (playerInfo.team === 'blue') {
      otherPlayer.setTint(0x0000ff);
    } else {
      otherPlayer.setTint(0xff0000);
    }
    otherPlayer.playerId = playerInfo.playerId;
    self.otherPlayers.add(otherPlayer);
}

function initAnimations(self, atlasName){
    for (var j = 0; j < this.charAnimationParts.length; j++){
        var prefixName = atlasName + '-' + this.charAnimationParts[j];
        for (var i = 0; i < this.animations.length ; i++){
            var startKey = i + (7*i);
            var endKey = startKey + 7;
            self.anims.create({
                key: prefixName + '-' + this.animations[i],
                frames: self.anims.generateFrameNames(prefixName, { prefix: prefixName + ' ', start: startKey, end: endKey, suffix: '.aseprite', zeroPad: 1 }),
                frameRate: 10,
                repeat: -1
            });    
        }
        for (var i = 0; i < this.poses.length ; i++){
            var startKey = i;
            var endKey = i;
            self.anims.create({
                key: prefixName + '-' + this.poses[i],
                frames: self.anims.generateFrameNames(prefixName, { prefix: prefixName + ' ', start: startKey, end: endKey, suffix: '.aseprite', zeroPad: 1 }),
                frameRate: 10,
                repeat: -1
            });    
        }
    }
}


