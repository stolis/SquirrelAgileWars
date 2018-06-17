var Player = function () {
    var manager;
    var mgrPlayer;

    function init(mgr){
        manager = mgr;
        initPlayerAnims();
    }

    function initPlayerAnims() {
        mgrPlayer = manager.physics.add.sprite(200, 200, 'brute_001');
        mgrPlayer.setCollideWorldBounds(true);
        manager.anims.create({
            key: 'walkleft',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 48, end: 55, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'walkright',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 8, end: 15, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'walkup',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 40, end: 47, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'walkdown',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 32, end: 39, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'walkupleft',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 64, end: 71, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'walkdownleft',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 56, end: 63, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'walkupright',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 24, end: 31, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'walkdownright',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 16, end: 23, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'standleft',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 1, end: 1, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        manager.anims.create({
            key: 'standright',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 5, end: 5, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        manager.anims.create({
            key: 'standup',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 7, end: 7, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        manager.anims.create({
            key: 'standdown',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 3, end: 3, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        manager.anims.create({
            key: 'standupleft',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 0, end: 0, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        manager.anims.create({
            key: 'standupright',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 6, end: 6, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        manager.anims.create({
            key: 'standdownleft',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 2, end: 2, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        manager.anims.create({
            key: 'standdownright',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001 ', start: 4, end: 4, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: 0
        });
        mgrPlayer.setCollideWorldBounds(true);
    }

    function firePlayerMovement(){
        if (manager.cursors.left.isDown && manager.cursors.up.isDown){
            mgrPlayer.setVelocityX(-150);
            mgrPlayer.setVelocityY(-150);
            mgrPlayer.anims.play('walkupleft', true);    
        }
        else if (manager.cursors.left.isDown && manager.cursors.down.isDown){
            mgrPlayer.setVelocityX(-150);
            mgrPlayer.setVelocityY(150);
            mgrPlayer.anims.play('walkdownleft', true);    
        }
        else if (manager.cursors.right.isDown && manager.cursors.up.isDown){
            mgrPlayer.setVelocityX(150);
            mgrPlayer.setVelocityY(-150);
            mgrPlayer.anims.play('walkupright', true);    
        }
        else if (manager.cursors.right.isDown && manager.cursors.down.isDown){
            mgrPlayer.setVelocityX(150);
            mgrPlayer.setVelocityY(150);
            mgrPlayer.anims.play('walkdownright', true);    
        }
        else if (manager.cursors.left.isDown) {
            mgrPlayer.setVelocityX(-150);
            mgrPlayer.setVelocityY(0);
            mgrPlayer.anims.play('walkleft', true);
        } else if (manager.cursors.right.isDown) {
            mgrPlayer.setVelocityX(150);
            mgrPlayer.setVelocityY(0);
            mgrPlayer.anims.play('walkright', true);
        } else if (manager.cursors.up.isDown){
            mgrPlayer.setVelocityY(-150);
            mgrPlayer.setVelocityX(0);
            mgrPlayer.anims.play('walkup', true);
        } else if (manager.cursors.down.isDown) {
            mgrPlayer.setVelocityY(150);
            mgrPlayer.setVelocityX(0);
            mgrPlayer.anims.play('walkdown', true);
        } else {
            if (mgrPlayer.anims.currentAnim != null){
                if (mgrPlayer.anims.currentAnim.key == 'walkleft'){
                    mgrPlayer.anims.play('standleft', true);
                }
                else if (mgrPlayer.anims.currentAnim.key == 'walkright'){
                    mgrPlayer.anims.play('standright', true);
                }
                else if (mgrPlayer.anims.currentAnim.key == 'walkup'){
                    mgrPlayer.anims.play('standup', true);
                }
                else if (mgrPlayer.anims.currentAnim.key == 'walkdown'){
                    mgrPlayer.anims.play('standdown', true);
                }
                else if (mgrPlayer.anims.currentAnim.key == 'walkupleft'){
                    mgrPlayer.anims.play('standupleft', true);
                }
                else if (mgrPlayer.anims.currentAnim.key == 'walkupright'){
                    mgrPlayer.anims.play('standupright', true);
                }
                else if (mgrPlayer.anims.currentAnim.key == 'walkdownleft'){
                    mgrPlayer.anims.play('standdownleft', true);
                }
                else if (mgrPlayer.anims.currentAnim.key == 'walkdownright'){
                    mgrPlayer.anims.play('standdownright', true);
                }
            }
            mgrPlayer.anims.stop();
            mgrPlayer.setVelocity(0);
        }
        //setOldPosition(mgrPlayer.x, mgrPlayer.y, mgrPlayer.rotation);
    }
    function getX(){
        return mgrPlayer.x;
    }
    function getY(){
        return mgrPlayer.y;
    }
    function getRot(){
        return mgrPlayer.rotation;
    }
    function getOldPosition(){
        return mgrPlayer.oldPosition;
    }
    function setOldPosition(){
        mgrPlayer.oldPosition = {
            x: mgrPlayer.x,
            y: mgrPlayer.y,
            rotation: mgrPlayer.rotation
        };
    }
    function playerHasMoved() {
        return (mgrPlayer.oldPosition && (mgrPlayer.x !== mgrPlayer.oldPosition.x || mgrPlayer.y !== mgrPlayer.oldPosition.y || mgrPlayer.rotation !== mgrPlayer.oldPosition.rotation)); 
    }

    return {
        init: init,
        move: firePlayerMovement,
        hasMoved: playerHasMoved,
        x: getX,
        y: getY,
        rotation: getRot,
        oldPosition: getOldPosition,
        setOldPosition: setOldPosition
    }
}