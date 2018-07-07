var GameLevel = GameObject.extend({
    wallUX: 32,
    wallUY: 8,
    length: 0,
    width: 0,
    startX: 0,
    startY: 0,
    walls: {},
    wallCollisions: {},
    wallCollisionBlueprints: [],
    /*levelData:
    [[1,1,1,1,1,1],
    [1,0,0,0,0,1],
    [1,0,1,2,0,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,1,1,1,1,1]],*/
    init: function (engine){
        this.engine = engine;
        this.walls = this.engine.physics.add.staticGroup();
        this.wallCollisions = this.engine.physics.add.staticGroup();  
    },
    generateRoom2D: function (transform, scale) {
        var walls = this.walls;
        this.startX = transform.x;
        this.startY = transform.y;
        this.length = scale.length;
        this.width = scale.width;
        
        // top horizontal wall
        this.addWallCollisionBlueprint({ x: this.startX + this.wallUX, y: this.startY }, { width: 0.0, height: this.wallUY }, { x: 1.0, y:1.0 });
        for (var i = 1; i < this.length; i++){
            var wall = this.engine.add.sprite(this.startX + i * this.wallUX, this.startY, 'Wall-Concrete').setOrigin(0.0, 1.0).setData('type','wall').setData('should_fade', true); 
            wall.originalDepth = wall.depth = i + 10;
            walls.add(wall);
            this.wallCollisionBlueprints[this.wallCollisionBlueprints.length-1].location.x += this.wallUX;
            this.wallCollisionBlueprints[this.wallCollisionBlueprints.length-1].size.width += this.wallUX;
        }

        //left vertical wall
        this.addWallCollisionBlueprint({ x: this.startX + this.wallUX, y: this.startY }, { width: this.wallUX, height: this.wallUY }, { x: 1.0, y:1.0 });
        for (var i = 0; i <= this.width; i++){
            var wall = this.engine.add.sprite(this.startX, this.startY + i * this.wallUY, 'Wall-Concrete').setOrigin(0.0, 1.0).setData('type','wall'); 
            wall.originalDepth = wall.depth = i + 10;
            walls.add(wall);
            if (i < this.width){
                this.wallCollisionBlueprints[this.wallCollisionBlueprints.length-1].location.y += this.wallUY;
                this.wallCollisionBlueprints[this.wallCollisionBlueprints.length-1].size.height += this.wallUY;
            }
        }

        //right vertical wall
        /*for (var i = 0; i <= this.width; i++){
            var wall = this.engine.add.sprite(this.startX + this.length * this.wallUX, this.startY + i * this.wallUY, 'Wall-Concrete').setOrigin(0.0, 1.0).setData('type','wall'); 
            wall.originalDepth = wall.depth = i;
            walls.add(wall);
            this.wallCollisions.add(this.setCollider('Trace', { x: wall.x + wall.width, y: wall.y }, { width: wall.width, height: 8 }, { x: 1.0, y: 1.0 }));
        }*/

        //bottom horizontal wall
        this.addWallCollisionBlueprint({ x: this.startX + this.wallUX, y: this.startY + this.width * this.wallUY }, { width: 0.0, height: this.wallUY }, { x: 1.0, y:1.0 });
        var wallPatch = 0;
        var prevWallPatch = 0;
        for (var i = 1; i < this.length; i++){
            if (!(i > 3 && i < 6)){
                var wall = this.engine.add.sprite(this.startX + i * this.wallUX, this.startY + this.width * this.wallUY, 'Wall-Concrete').setOrigin(0.0, 1.0).setData('type','wall').setData('should_fade', true); 
                wall.originalDepth = wall.depth = i + 10;
                walls.add(wall);
                if (prevWallPatch != wallPatch){
                    prevWallPatch = wallPatch;
                    this.addWallCollisionBlueprint({ x: this.startX + i * this.wallUX, y: this.startY + this.width * this.wallUY }, { width: 0.0, height: this.wallUY }, { x: 1.0, y:1.0 });
                }
                this.wallCollisionBlueprints[this.wallCollisionBlueprints.length-1].location.x += this.wallUX;
                this.wallCollisionBlueprints[this.wallCollisionBlueprints.length-1].size.width += this.wallUX;
            }
            else {
                wallPatch++;
            }
            
        }
        //add wall collisions from blueprints
        for (var i = 0; i < this.wallCollisionBlueprints.length; i++){
            var wallBP = this.wallCollisionBlueprints[i];
            this.wallCollisions.add(this.setCollider('Trace', { x: wallBP.location.x, y: wallBP.location.y }, { width: wallBP.size.width, height: wallBP.size.height }, { x: wallBP.origin.x, y: wallBP.origin.y }));
        }

    },
    onBeforeOverlap: function (source, target) {
        console.log('BeforeOverlap');
    }, 
    onAfterOverlap: function (source, target) {
        console.log('AfterOverlap');
    },
    getPrevWall: function (target){
        var index = this.walls.getChildren().indexOf(target);
        if (index > 0)
            return this.walls.getChildren()[this.walls.getChildren().indexOf(target)-1];
        else return null;
    },
    getNextWall: function(target){
        var index = this.walls.getChildren().indexOf(target);
        if (index != -1 && index != this.walls.getChildren().length - 1)
            return this.walls.getChildren()[this.walls.getChildren().indexOf(target)+1];
        else return null;
    },
    maskWall: function (target, isMasked) {
        if (isMasked){
            target.setAlpha(0.4, 0.4, 0.4, 0.4);
            var prevWall = this.getPrevWall(target);  
            var nextWall = this.getNextWall(target);
            if (prevWall)
                prevWall.setAlpha(1, 0.4, 1, 0.4);
            if (nextWall)
                nextWall.setAlpha(0.4, 1, 0.4, 1);
        }
        else {
            target.clearAlpha();
            var prevWall = this.getPrevWall(target);  
            var nextWall = this.getNextWall(target);
            if (prevWall)
                prevWall.clearAlpha();
            if (nextWall)
                nextWall.clearAlpha();
        }
    },
    toggleWallDepth: function (target, sendBack) {
        if (sendBack){
            target.setDepth(-1); 
        }
        else {
            target.setDepth(target.originalDepth);
        }
    },
    addWallCollisionBlueprint: function (location, size, origin){
        this.wallCollisionBlueprints.push({
            location: {
                x: location.x,
                y: location.y
            },
            size: {
                width: size.width,
                height: size.height
            },
            origin: {
                x: origin.x,
                y: origin.y
            }
        });
    }
});




