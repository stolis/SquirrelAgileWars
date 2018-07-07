var GamePawn = GameObject.extend({
    physicsObject: {
        name: null,
        torso: null,
        rest: null
    },
    velocity: 0,
    lastOverlapped: null,
    init: function (engine, playerInfo){
        this._super(engine, playerInfo.transform);
        this.velocity = playerInfo.velocity;
        this.physicsObject.name = 'Brute-001';
        this.physicsObject.torso = this.engine.physics.add.sprite(this.transform.x, this.transform.y, 'Brute-001-torso').setOrigin(0.5,1.0);
        this.physicsObject.rest = this.engine.physics.add.sprite(this.transform.x, this.transform.y, 'Brute-001-rest').setOrigin(0.5,1.0);
        this.physicsObject.torso.originalDepth = this.physicsObject.torso.depth = 1;
        this.physicsObject.rest.originalDepth = this.physicsObject.rest.depth = 1;
        this.setTrace('Trace', { x: this.transform.x, y: this.transform.y }, { width: 1, height: 1 }, { x: 0.5, y:0.5 });
        this.setCollider('Trace', { x: this.transform.x, y: this.transform.y }, { width: 1, height: 1 }, { x: 1, y: 1 });
        this.physicsObject.torso.setCollideWorldBounds(true);
        this.physicsObject.rest.setCollideWorldBounds(true);
    },
    animate: function (animation){
        this.physicsObject.torso.anims.play(this.physicsObject.name + '-torso-' + animation, true);    
        this.physicsObject.rest.anims.play(this.physicsObject.name + '-rest-' + animation, true);    
    },
    move: function () {
        if (this.engine.cursors.left.isDown && this.engine.cursors.up.isDown){
            this.setVelocity({ x: -this.velocity, y: -this.velocity });
            this.animate('walkupleft');
        }
        else if (this.engine.cursors.left.isDown && this.engine.cursors.down.isDown){
            this.setVelocity({ x: -this.velocity, y: this.velocity });
            this.animate('walkdownleft');
        }
        else if (this.engine.cursors.right.isDown && this.engine.cursors.up.isDown){
            this.setVelocity({ x: this.velocity, y: -this.velocity });
            this.animate('walkupright');
        }
        else if (this.engine.cursors.right.isDown && this.engine.cursors.down.isDown){
            this.setVelocity({ x: this.velocity, y: this.velocity });
            this.animate('walkdownright');     
        }
        else if (this.engine.cursors.left.isDown) {
            this.setVelocity({ x: -this.velocity, y: 0 });
            this.animate('walkleft');     
        } 
        else if (this.engine.cursors.right.isDown) {
            this.setVelocity({ x: this.velocity, y: 0 });
            this.animate('walkright');      
        } 
        else if (this.engine.cursors.up.isDown){
            this.setVelocity({ x: 0, y: -this.velocity });
            this.animate('walkup');    
        } 
        else if (this.engine.cursors.down.isDown) {
            this.setVelocity({ x: 0, y: this.velocity });
            this.animate('walkdown');
        } 
        else {
            if (this.physicsObject.torso.anims.currentAnim != null){
                var checkName = this.physicsObject.name + '-torso-';
                if (this.physicsObject.torso.anims.currentAnim.key == checkName + 'walkleft'){
                    this.animate('standleft');
                }
                else if (this.physicsObject.torso.anims.currentAnim.key == checkName + 'walkright'){
                    this.animate('standright');
                }
                else if (this.physicsObject.torso.anims.currentAnim.key == checkName + 'walkup'){
                    this.animate('standup');
                }
                else if (this.physicsObject.torso.anims.currentAnim.key == checkName + 'walkdown'){
                    this.animate('standdown');
                }
                else if (this.physicsObject.torso.anims.currentAnim.key == checkName + 'walkupleft'){
                    this.animate('standupleft');
                }
                else if (this.physicsObject.torso.anims.currentAnim.key == checkName + 'walkupright'){
                    this.animate('standupright');
                }
                else if (this.physicsObject.torso.anims.currentAnim.key == checkName + 'walkdownleft'){
                    this.animate('standdownleft');
                }
                else if (this.physicsObject.torso.anims.currentAnim.key == checkName + 'walkdownright'){
                    this.animate('standdownright');
                }
            }
            this.physicsObject.torso.anims.stop();
            this.physicsObject.rest.anims.stop();
            this.setVelocity({ x: 0, y: 0 });
        }
        this.setTransform({ x: this.physicsObject.torso.x, y: this.physicsObject.torso.y, rotation: this.physicsObject.torso.rotation });
    },
    pawnHasMoved: function () {
        return (this.physicsObject.torso.oldPosition && (this.physicsObject.torso.x !== this.physicsObject.torso.oldPosition.x || this.physicsObject.torso.y !== this.physicsObject.torso.oldPosition.y || this.physicsObject.torso.rotation !== this.physicsObject.torso.oldPosition.rotation));
    },
    updatePawnTransform: function () {
        if (this.physicsObject.torso.oldPosition !== undefined){
            if (this.isMoving()){
                if (this.physicsObject.torso.oldPosition.y != this.physicsObject.torso.y){
                    this.collider.oldOverlapY = this.collider.body.overlapY;
                    if (this.collider.oldOverlapX != 0 && (this.collider.body.y < this.collidingBounds.up || this.collider.body.y > this.collidingBounds.down ))
                        this.collider.oldOverlapX = 0.0;
                }
                if (this.physicsObject.torso.oldPosition.x != this.physicsObject.torso.x){
                    this.collider.oldOverlapX = this.collider.body.overlapX;
                    if (this.collider.oldOverlapY != 0 && (this.collider.body.x < this.collidingBounds.left || this.collider.body.x > this.collidingBounds.right ))
                        this.collider.oldOverlapY = 0.0;
                }
            }
            this.physicsObject.torso.oldPosition.x = this.physicsObject.torso.x;
            this.physicsObject.torso.oldPosition.y = this.physicsObject.torso.y;
            this.physicsObject.torso.oldPosition.rotation = this.physicsObject.torso.rotation;
        }
        else {
            this.physicsObject.torso.oldPosition = {};
            this.collider.oldOverlapX = 0.0;
            this.collider.oldOverlapY = 0.0;
            this.trace.oldPosition = {};
        }
        
    },
    isMoving: function () {
        if (this.physicsObject.torso.body)
            return this.physicsObject.torso.body.velocity.x != 0.0 || this.physicsObject.torso.body.velocity.y != 0.0;
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