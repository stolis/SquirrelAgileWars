var GameObject = Class.extend({
    engine: {},
    transform: {
        x: 0,
        y: 0,
        rotation: 0
    },
    scale: {
        x: 0,
        y: 0
    },
    trace: null,
    collider: null,
    init: function(engine,transform) {
        this.engine = engine;
        this.transform = transform;
    },
    setTrace: function (sprite, location, size, origin) {
        this.trace = this.engine.physics.add.sprite(location.x, location.y, sprite).setAlpha(1);
        if (size)
            this.trace.setDisplaySize(size.width, size.height);
        if (origin)
            this.trace.setOrigin(origin.x,origin.y);
    },
    setCollider: function(sprite, location, size, origin) {
        this.collider = this.engine.physics.add.sprite(location.x, location.y, sprite).setTint(0xff0000).setAlpha(0);
        this.collider.offset = { x:0.0,y:0.0 };
        if (size)
            this.collider.setDisplaySize(size.width, size.height);
        if (origin)
            this.collider.setOrigin(origin.x,origin.y);

        this.collider.body.setImmovable(true);
        this.collider.enableBody = true;
        return this.collider;
    },
    getTransform: function() {
        return this.transform;
    },
    setTransform: function(transform) {
        this.transform = transform;
        if (this.collider){
            if (this.collider.body.velocity.y > 0.0 && this.collider.body.touching.none)
                this.collider.offset.y = 2;
            else if (this.collider.body.velocity.y < 0.0 && this.collider.body.touching.none)
                this.collider.offset.y = -2;
            else this.collider.offset.y = 0.0;
            if (this.collider.body.velocity.x > 0.0 && this.collider.body.touching.none)
                this.collider.offset.x = 2;
            else if (this.collider.body.velocity.x < 0.0 && this.collider.body.touching.none)
                this.collider.offset.x = -2;
            else this.collider.offset.x = 0.0;     
            this.collider.x = transform.x + this.collider.offset.x;
            this.collider.y = transform.y + this.collider.offset.y;
        }
        if (this.trace){
            this.trace.x = transform.x;
            this.trace.y = transform.y - 32;
        }
    },
    setVelocity: function(v){
        if ((this.collider.oldOverlapY < 0 && v.y < 0.0) || (this.collider.oldOverlapY > 0 && v.y > 0.0)){
            this.collider.setVelocityY(0);
            this.physicsObject.torso.setVelocityY(0);
            this.physicsObject.rest.setVelocityY(0);
        }
        else {
            this.collider.setVelocityY(v.y);
            this.physicsObject.torso.setVelocityY(v.y);
            this.physicsObject.rest.setVelocityY(v.y);
        }
        if ((this.collider.oldOverlapX < 0 && v.x < 0.0) || (this.collider.oldOverlapX > 0 && v.x > 0.0)){
            this.collider.setVelocityX(0);
            this.physicsObject.torso.setVelocityX(0);
            this.physicsObject.rest.setVelocityX(0);
        }
        else {
            this.collider.setVelocityX(v.x);
            this.physicsObject.torso.setVelocityX(v.x);
            this.physicsObject.rest.setVelocityX(v.x);
        }
    },
    setOverlap: function (targets){
        if (targets){
            if ( Array.isArray(targets) ){
                if (targets.length > 0){
                    for (var i = 0; i < targets.length; i++)
                        this.engine.physics.add.overlap(this.physicsObject.torso, targets[i], this.onAfterOverlap, this.onBeforeOverlap, this);
                }
            }
            else if (typeof targets === 'object'){
                this.engine.physics.add.overlap(this.physicsObject.torso, targets, this.onAfterOverlap, this.onBeforeOverlap, this);
            }
        }
        else console.log('You need to include a sprite or an array of sprites for overlap detection!');
    },
    setCollision: function(targets) {
        if (targets){
            this.engine.physics.add.collider(this.collider, targets.getChildren(), this.onBeforeCollide, this.onAfterCollide, this);
        }
        else console.log('You need to include a sprite or an array of sprites for collision detection!');
    },
    bringFront: function (){
        this.physicsObject.torso.depth = 1000000;
        this.physicsObject.rest.depth = 1000000;
    },
    sendBack: function (target){
        this.physicsObject.torso.depth = 1;
        this.physicsObject.rest.depth = 1;
    },
    resetDepth: function (target){
        this.physicsObject.torso.depth = this.physicsObject.torso.originalDepth;
        this.physicsObject.rest.depth = this.physicsObject.rest.originalDepth;
    },
    onBeforeOverlap: null,
    onAfterOverlap: null,
    onBeforeCollide: null,
    onAfterCollide: null
});