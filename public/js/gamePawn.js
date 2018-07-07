var GamePawn = GameObject.extend({
    physicsObject: {},
    velocity: 0,
    lastOverlapped: null,
    init: function (engine, playerInfo){
        this._super(engine, playerInfo.transform);
        this.setAnimations('Brute-001');
        this.velocity = playerInfo.velocity;
        this.physicsObject = this.engine.physics.add.sprite(this.transform.x, this.transform.y, 'Brute-001').setOrigin(0.5,1.0);
        this.physicsObject.originalDepth = this.physicsObject.depth = 1;
        this.physicsObject.body.debugShowVelocity = false;
        this.setTrace('Trace', { x: this.transform.x, y: this.transform.y }, { width: 1, height: 1 }, { x: 0.5, y:0.5 });
        this.setCollider('Trace', { x: this.transform.x, y: this.transform.y }, { width: 1, height: 1 }, { x: 1, y: 1 });
        this.physicsObject.setCollideWorldBounds(true);
    },
    setAnimations: function (atlasName){
        this.engine.anims.create({
            key: 'walkright',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 8, end: 15, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.engine.anims.create({
            key: 'walkdownright',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 16, end: 23, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.engine.anims.create({
            key: 'walkupright',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 24, end: 31, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.engine.anims.create({
            key: 'walkdown',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 32, end: 39, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.engine.anims.create({
            key: 'walkup',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 40, end: 47, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.engine.anims.create({
            key: 'walkleft',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 48, end: 55, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.engine.anims.create({
            key: 'walkdownleft',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 56, end: 63, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.engine.anims.create({
            key: 'walkupleft',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 64, end: 71, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.engine.anims.create({
            key: 'standupleft',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 0, end: 0, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.engine.anims.create({
            key: 'standleft',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 1, end: 1, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.engine.anims.create({
            key: 'standdownleft',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 2, end: 2, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.engine.anims.create({
            key: 'standdown',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 3, end: 3, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.engine.anims.create({
            key: 'standdownright',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 4, end: 4, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.engine.anims.create({
            key: 'standright',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 5, end: 5, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.engine.anims.create({
            key: 'standupright',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 6, end: 6, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        this.engine.anims.create({
            key: 'standup',
            frames: this.engine.anims.generateFrameNames(atlasName, { prefix: atlasName + ' ', start: 7, end: 7, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
    },
    move: function () {
        if (this.engine.cursors.left.isDown && this.engine.cursors.up.isDown){
            this.setVelocity({ x: -this.velocity, y: -this.velocity });
            this.physicsObject.anims.play('walkupleft', true);    
        }
        else if (this.engine.cursors.left.isDown && this.engine.cursors.down.isDown){
            this.setVelocity({ x: -this.velocity, y: this.velocity });
            this.physicsObject.anims.play('walkdownleft', true);    
        }
        else if (this.engine.cursors.right.isDown && this.engine.cursors.up.isDown){
            this.setVelocity({ x: this.velocity, y: -this.velocity });
            this.physicsObject.anims.play('walkupright', true);    
        }
        else if (this.engine.cursors.right.isDown && this.engine.cursors.down.isDown){
            this.setVelocity({ x: this.velocity, y: this.velocity });
            this.physicsObject.anims.play('walkdownright', true);    
        }
        else if (this.engine.cursors.left.isDown) {
            this.setVelocity({ x: -this.velocity, y: 0 });
            this.physicsObject.anims.play('walkleft', true);
        } 
        else if (this.engine.cursors.right.isDown) {
            this.setVelocity({ x: this.velocity, y: 0 });
            this.physicsObject.anims.play('walkright', true);
        } 
        else if (this.engine.cursors.up.isDown){
            this.setVelocity({ x: 0, y: -this.velocity });
            this.physicsObject.anims.play('walkup', true);
        } 
        else if (this.engine.cursors.down.isDown) {
            this.setVelocity({ x: 0, y: this.velocity });
            this.physicsObject.anims.play('walkdown', true);
        } 
        else {
            if (this.physicsObject.anims.currentAnim != null){
                if (this.physicsObject.anims.currentAnim.key == 'walkleft'){
                    this.physicsObject.anims.play('standleft', true);
                }
                else if (this.physicsObject.anims.currentAnim.key == 'walkright'){
                    this.physicsObject.anims.play('standright', true);
                }
                else if (this.physicsObject.anims.currentAnim.key == 'walkup'){
                    this.physicsObject.anims.play('standup', true);
                }
                else if (this.physicsObject.anims.currentAnim.key == 'walkdown'){
                    this.physicsObject.anims.play('standdown', true);
                }
                else if (this.physicsObject.anims.currentAnim.key == 'walkupleft'){
                    this.physicsObject.anims.play('standupleft', true);
                }
                else if (this.physicsObject.anims.currentAnim.key == 'walkupright'){
                    this.physicsObject.anims.play('standupright', true);
                }
                else if (this.physicsObject.anims.currentAnim.key == 'walkdownleft'){
                    this.physicsObject.anims.play('standdownleft', true);
                }
                else if (this.physicsObject.anims.currentAnim.key == 'walkdownright'){
                    this.physicsObject.anims.play('standdownright', true);
                }
            }
            this.physicsObject.anims.stop();
            this.setVelocity({ x: 0, y: 0 });
        }
        this.setTransform({ x: this.physicsObject.x, y: this.physicsObject.y, rotation: this.physicsObject.rotation });
    },
    pawnHasMoved: function () {
        return (this.physicsObject.oldPosition && (this.physicsObject.x !== this.physicsObject.oldPosition.x || this.physicsObject.y !== this.physicsObject.oldPosition.y || this.physicsObject.rotation !== this.physicsObject.oldPosition.rotation));
    },
    updatePawnTransform: function () {
        if (this.physicsObject.oldPosition !== undefined){
            if (this.isMoving()){
                if (this.physicsObject.oldPosition.y != this.physicsObject.y){
                    this.collider.oldOverlapY = this.collider.body.overlapY;
                    if (this.collider.oldOverlapX != 0 && (this.collider.body.y < this.collidingBounds.up || this.collider.body.y > this.collidingBounds.down ))
                        this.collider.oldOverlapX = 0.0;
                }
                if (this.physicsObject.oldPosition.x != this.physicsObject.x){
                    this.collider.oldOverlapX = this.collider.body.overlapX;
                    if (this.collider.oldOverlapY != 0 && (this.collider.body.x < this.collidingBounds.left || this.collider.body.x > this.collidingBounds.right ))
                        this.collider.oldOverlapY = 0.0;
                }
            }
            this.physicsObject.oldPosition.x = this.physicsObject.x;
            this.physicsObject.oldPosition.y = this.physicsObject.y;
            this.physicsObject.oldPosition.rotation = this.physicsObject.rotation;
        }
        else {
            this.physicsObject.oldPosition = {};
            this.collider.oldOverlapX = 0.0;
            this.collider.oldOverlapY = 0.0;
            this.trace.oldPosition = {};
        }
        
    },
    isMoving: function () {
        if (this.physicsObject.body)
            return this.physicsObject.body.velocity.x != 0.0 || this.physicsObject.body.velocity.y != 0.0;
        else return false;
    },
    onBeforeOverlap: function (source, target){
        if (target.getData('type') === 'wall'){
            if (!this.isMoving() || !target.getData('should_fade')){
                return false;
            }
            else {
                if (this.lastOverlapped){
                    this.engine.level.maskWall(this.lastOverlapped, false);
                }
                this.lastOverlapped = target;
                return true;
            }
        }
    },
    onAfterOverlap: function (source, target){
        if (target.getData('type') === 'wall'){
            if (source.body.y - 42 < target.body.y){
                this.engine.level.maskWall(target, true);
                this.resetDepth();
                //this.engine.level.toggleWallDepth(target, false);
            }
            else {
                this.bringFront();
                //this.engine.level.toggleWallDepth(target, true);
            }
        }
    },
    onBeforeCollide: function(source, target){
        return true;
    },
    onAfterCollide: function(source, target){
        this.collidingBounds.left = target.body.x - 5;
        this.collidingBounds.right = target.body.x + target.body._sx + 5;
        this.collidingBounds.up = target.body.y - 2;
        this.collidingBounds.down = target.body.y + target.body._sy + 2;
    },
    collidingBounds: {
        left: 0.0,
        right: 0.0,
        up: 0.0,
        down: 0.0
    }
});