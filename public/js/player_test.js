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
            key: 'sides',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001-rest ', start: 0, end: 7, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        manager.anims.create({
            key: 'sides',
            frames: manager.anims.generateFrameNames('brute_001', { prefix: 'Brute-001-torso ', start: 0, end: 7, suffix: '.aseprite', zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });
        mgrPlayer.setCollideWorldBounds(true);
    }

    function firePlayerMovement(){
        if (manager.cursors.left.isDown && manager.cursors.up.isDown){
            mgrPlayer.setVelocityX(-150);
            mgrPlayer.setVelocityY(-150);
            mgrPlayer.anims.play('sides', true);    
        }
        else if (manager.cursors.left.isDown && manager.cursors.down.isDown){
            mgrPlayer.setVelocityX(-150);
            mgrPlayer.setVelocityY(150);
            mgrPlayer.anims.play('sides', true);    
        }
        else if (manager.cursors.right.isDown && manager.cursors.up.isDown){
            mgrPlayer.setVelocityX(150);
            mgrPlayer.setVelocityY(-150);
            mgrPlayer.anims.play('sides', true);    
        }
        else if (manager.cursors.right.isDown && manager.cursors.down.isDown){
            mgrPlayer.setVelocityX(150);
            mgrPlayer.setVelocityY(150);
            mgrPlayer.anims.play('sides', true);    
        }
        else if (manager.cursors.left.isDown) {
            mgrPlayer.setVelocityX(-150);
            mgrPlayer.setVelocityY(0);
            mgrPlayer.anims.play('sides', true);
        } else if (manager.cursors.right.isDown) {
            mgrPlayer.setVelocityX(150);
            mgrPlayer.setVelocityY(0);
            mgrPlayer.anims.play('sides', true);
        } else if (manager.cursors.up.isDown){
            mgrPlayer.setVelocityY(-150);
            mgrPlayer.setVelocityX(0);
            mgrPlayer.anims.play('sides', true);
        } else if (manager.cursors.down.isDown) {
            mgrPlayer.setVelocityY(150);
            mgrPlayer.setVelocityX(0);
            mgrPlayer.anims.play('sides', true);
        } else {
            /*if (mgrPlayer.anims.currentAnim != null){
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
            }*/
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