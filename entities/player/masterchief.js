class MasterChief {

    constructor(game, position, collisionBlocks) {

        // Updated the constructor
        Object.assign(this, { game, position, collisionBlocks });

        this.scale = 3;
        //this.game = game;
        this.cache = [];

        this.level = ASSET_MANAGER.getAsset("./img/testmap.png");

        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/ChiefSprites.png");
        this.GunSpriteSheet = ASSET_MANAGER.getAsset("./sprites/Guns.png");

        this.lastBB = null;
        this.BB = null;
        this.BBXOffset = 10 * this.scale; //Offset for adjusting BB
        this.BBYOffset = 6 * this.scale; //Offset for adjusting BB

        //Animation states for chief's head/body
        this.state = 0; // 0 = Idle, 1 = walking
        this.helmet = 0; // 0 = Right, 1 = Down-Right, 2 = Up-Right

        //Animation states for chief's arms/gun firing
        this.isFiring = 0; // 0 = Not firing, 1 = Firing
        this.gunType = 1; // 0 = Sniper Rifle, 1 = Assault Rifle

        this.degrees = null;
        this.aimRight = true;


        this.walkingSpeed = 0.07;

        this.width = 40;
        this.height = 50;

        // Added for Jumping
        this.velocity = { x: 0, y: 0 };
        this.onGround = true;



        this.bodyAnimations = [];
        this.helmetAnimations = [];
        this.gunAnimations = [];
        this.animators = [];
        //Loads animations into array
        this.loadAnimations();

        //anytime we move we should call updateBB
        this.updateBB();

        // Keeps track of last key pressed
        this.lastKey;

        // Health Bar
        this.maxHP = 100;
        this.hp = 90;

        // Shield Bar
        this.maxShield = 100;
        this.shield = 25;
        this.regen = 400;

        this.healthBar = new MasterHealthBar(this, this.game);
        //Why does this get added to the beginning of the entity list when it should be at the
        //end with this syntax???
        //Update: oh duh, because chief gets declared first smh
        this.game.addEntity(this.healthBar);

    };

    loadAnimations() {

        for (let i = 0; i <= 1; i++) { // this.state
            this.bodyAnimations.push([]);
            this.helmetAnimations.push([]);
            for (let j = 0; j <= 2; j++) { // this.helmet
                this.bodyAnimations[i].push([]);
                //this.helmetAnimations[i].push([]); 
            }
        }

        for (let i = 0; i <= 1; i++) { // this.gunType
            this.gunAnimations.push([]);
            for (let j = 0; j <= 1; j++) { // this.isFiring
                this.gunAnimations[i].push([]);
            }
        }


        // ---- GUN ANIMATIONS ----
        // gunType: Sniper Rifle
        // isFiring: False
        this.gunAnimations[0][0] = new Animator(this.GunSpriteSheet,
            0, 0,
            180, 180,
            1, 1,
            0,
            false, true);

        // isFiring: True
        this.gunAnimations[0][1] = new Animator(this.GunSpriteSheet,
            0, 0,
            180, 180,
            3, 0.05,
            0,
            false, false);

        // gunType: Assault Rifle
        // isFiring: False
        this.gunAnimations[1][0] = new Animator(this.GunSpriteSheet,
            0, 180,
            180, 180,
            1, 1,
            0,
            false, true);

        // isFiring: True
        this.gunAnimations[1][1] = new Animator(this.GunSpriteSheet,
            0, 180,
            180, 180,
            3, 0.05,
            0,
            false, false);


        // ---- CHIEF BODY/HEAD ANIMATIONS ----
        // State: Idle
        // Helmet: Right
        this.bodyAnimations[0][0] = new Animator(this.SpriteSheet,
            0, 0,
            40, 50,
            1, 1,
            0,
            false, true);

        // Helmet: Down Right
        this.bodyAnimations[0][1] = new Animator(this.SpriteSheet,
            0, 50,
            40, 50,
            1, 1,
            0,
            false, true);
        // Helmet: Up Right
        this.bodyAnimations[0][2] = new Animator(this.SpriteSheet,
            0, 2 * 50,
            40, 50,
            1, 1,
            0,
            false, true);

        // State: Walking
        // Helmet: Right
        this.bodyAnimations[1][0] = new Animator(this.SpriteSheet,
            0, 0,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);
        // Helmet: Down Right
        this.bodyAnimations[1][1] = new Animator(this.SpriteSheet,
            0, 50,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);
        // Helmet: Up Right
        this.bodyAnimations[1][2] = new Animator(this.SpriteSheet,
            0, 2 * 50,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);


        //Load animators to be synced
        for (let i = 0; i < this.bodyAnimations[0].length; i++) {
            //console.log(this.bodyAnimations[i][j].currentFrame());
            this.animators.push(this.bodyAnimations[1][i]);
        }



    };

    updateBB() {
        this.lastBB = this.BB;

        this.BB = new BoundingBox(this.position.x + this.BBXOffset,
            this.position.y + this.BBYOffset,
            (this.width * this.scale) - (18 * this.scale),
            (this.height * this.scale) - (10 * this.scale));
    }

    update() {
        if (this.shield < this.maxShield) {
            this.regenShield();
        }

        // Updater properties
        const TICK = this.game.clockTick;

        //Calculate if player is aiming to right or left of player model
        if (this.game.mouse !== null) {
            let xOffset = 20 * this.scale;
            const x = this.game.mouse.x - (this.position.x - this.game.camera.x) - xOffset;
            if (x > 0) {
                this.aimRight = true;
            } else {
                this.aimRight = false;
            }
        }

        // Movement... kinda
        if (this.game.keys['d']) {

            //Check direction user is aiming to dictate walking forward or reverse
            if (this.aimRight) {
                this.reverseMovement(false);
            } else {
                this.reverseMovement(true);
            }

            this.state = 1;
            //this.x += 3;
            // this.velocity.x += PLAYER_PHYSICS.MAX_RUN * TICK;
            // this.position.x += this.velocity.x * TICK;
            // this.game.keys['d'] === false
        }

        else if (this.game.keys['a']) {

            //Check direction user is aiming to dictate walking forward or reverse
            if (this.aimRight) {
                this.reverseMovement(true);
            } else {
                this.reverseMovement(false);
            }

            this.state = 1;
        }


        // else if (this.game.keys[' '] || this.game.keys['Space']) { // Jumping TODO: JUMP WHILE RUNNING!
        //     this.velocity.y -= 4;
        //     console.log('UP')
        // }

        else {
            this.state = 0;
        }

        // *** Player Movement ***
        if (keys.a.pressed && lastKey === 'a') {
            this.velocity.x -= PLAYER_PHYSICS.MAX_WALK;
            this.position.x += this.velocity.x * TICK;
            //console.log('walking left')

            if (this.velocity.x < -PLAYER_PHYSICS.MAX_WALK) {
                this.velocity.x = 1;
            }
        }
        if (keys.d.pressed && lastKey === 'd') {
            this.velocity.x += PLAYER_PHYSICS.MAX_WALK;


            this.position.x += this.velocity.x * TICK;;

            if (this.velocity.x > PLAYER_PHYSICS.MAX_WALK) {
                this.velocity.x = PLAYER_PHYSICS.MAX_WALK;
            }
            //console.log('walking right')
        }

        // *** Player Movement ***
        if (keys.a.pressed && lastKey === 'a') {
            this.velocity.x = -3;
            this.position.x += -3;
            //console.log('walking left')
        }
        if (keys.d.pressed && lastKey === 'd') {
            this.velocity.x = 3;
            this.position.x += 3;
            //console.log('walking right')
        }
        if (keys[' '].pressed && this.onGround) {
            this.velocity.y = PLAYER_JUMP;
            this.onGround = false;
            // this.position.y += -PLAYER_JUMP;
            //console.log('up')
        }

  

        // Allow the player to fall

        //UNCOMMENT
        this.velocity.y += PLAYER_PHYSICS.MAX_FALL * TICK;
        this.velocity.y += GRAVITY;

        // Update the player x and y
        // this.position.x += this.velocity.x * TICK;
        //UNCOMMENT
        this.position.y += this.velocity.y * TICK;


        this.updateBB();

        this.collisionChecker();
    };

    collisionChecker() {

        this.game.collisionEntities.forEach(entity => {
            if (this !== entity  && entity.BB && this.BB.collide(entity.BB)) { //Collision
                
                if (this.velocity.y > 0) { //falling

                    if ((entity instanceof Tile) && this.lastBB.bottom <= entity.BB.top) {
                        this.position.y = entity.BB.top - this.BB.height - this.BBYOffset;
                        this.velocity.y = 0;
                        this.onGround = true;
                        this.updateBB();
                        return;
                    }

                }
                if (this.velocity.y < 0) { //Jumping

                    if ((entity instanceof Tile) && this.lastBB.top >= entity.BB.bottom) {
                        console.log("Collide top of tile");
                        this.position.y = entity.BB.bottom - this.BBYOffset;
                        this.velocity.y = 0;
                        this.updateBB();
                        return;

                    }
                }

                //Other cases for hitting tile
                if ((entity instanceof Tile)) {
                    //console.log("Check");

                    if (this.BB.left <= entity.BB.right
                        && this.BB.bottom > entity.BB.top
                        && this.velocity.x < 0) { //Touching right side

                        console.log("Touching right");
                        this.position.x = entity.BB.right - this.BBXOffset;

                        if (this.velocity.x < 0) this.velocity.x = 0;
                    }

                    if (this.BB.right >= entity.BB.left
                        && this.BB.bottom > entity.BB.top
                        && this.velocity.x > 0) {  //Touching left side

                        console.log("Touching left");
                        this.position.x = entity.BB.left - this.BB.width - this.BBXOffset;

                        if (this.velocity.x > 0) this.velocity.x = 0;
                    }

                }

       
            }
        });




    };

    draw(ctx) {

        this.findMouseAngle();

        if (this.aimRight) {
            this.bodyAnimations[this.state][this.helmet].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, this.scale, false);
            //this.helmetAnimations[this.state][this.helmet].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, this.scale, false);
        } else {
            this.bodyAnimations[this.state][this.helmet].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, this.scale, true);
            //this.helmetAnimations[this.state][this.helmet].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, this.scale, true);
        }

        this.drawGun(ctx);

        //draw ths BB
        ctx.strokeStyle = 'cyan';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

        //Draw the lastBB
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.lastBB.x - this.game.camera.x, this.lastBB.y - this.game.camera.y, this.BB.width, this.BB.height);





    };

    drawGun(ctx) {

        // ctx.strokeStyle = "Blue";
        // ctx.strokeRect(this.position.x - this.game.camera.x - 20, this.position.y - this.game.camera.y + 20, 40, 40);
        // ctx.save();

        let a = this.gunAnimations[this.gunType][this.isFiring];

        a.elapsedTime += this.game.clockTick;

        if (a.isDone()) {
            if (a.loop) {
                a.elapsedTime -= a.totalTime;
            }
            else {
                // If this is not a continually firing animation, isFiring gets toggled off and animation is reset.
                this.stopShooting();
                a.reset();

            }
        }

        let frame = a.currentFrame();
        if (a.reverse) frame = a.frameCount - frame - 1;

        let radians = -this.degrees / 360 * 2 * Math.PI;

        if (this.aimRight) {

            var offscreenCanvas = rotateImage(a.spritesheet,
                a.xStart + frame * (a.width + a.framePadding), a.yStart,
                a.width, a.height,
                radians, 5,
                false);

        } else {

            var offscreenCanvas = rotateImage(a.spritesheet,
                a.xStart + frame * (a.width + a.framePadding), a.yStart,
                a.width, a.height,
                -radians - Math.PI, 5,
                true);

        }


        //Adjust arm position depending on face
        if (this.aimRight) {
            var armXOffset = (76 * this.scale);
        } else {
            var armXOffset = (64 * this.scale);
        }
        var armYOffset = (72 * this.scale);

        ctx.drawImage(offscreenCanvas,
            (this.position.x - this.game.camera.x) - armXOffset, (this.position.y - this.game.camera.y) - armYOffset,
            this.scale * a.width, this.scale * a.width);


    };

    shootGun() {

        this.isFiring = 1;

        //Capture 
        const firingPosStatic = {
            x: this.position.x + (20 * this.scale),
            y: this.position.y + (15 * this.scale)
        }

        //Capture the static position
        const targetPosStatic = {
            x: gameEngine.mouse.x - (20 * this.scale) + this.game.camera.x,
            y: gameEngine.mouse.y + this.game.camera.y
        }

        let bullet = new Bullet(
            this,
            this.game,
            2,
            firingPosStatic,
            targetPosStatic,
            1);

        this.game.addCollisionEntity(bullet);
        this.game.addEntityToFront(bullet);

    };

    stopShooting() {
        this.isFiring = 0;
    };

    findMouseAngle() {

        //Calculating angle from mouse
        if (gameEngine.mouse !== null) {

            let yOffset = 24 * this.scale;
            let xOffset = 25 * this.scale;

            // console.log('this.position.x: ' + (this.position.x | 0) + ' game.camera.x: ' + (this.game.camera.x | 0) +
            // ' math: ' + ((this.position.x - this.game.camera.x) | 0) );

            let opp = -(gameEngine.mouse.y - (this.position.y - this.game.camera.y) - yOffset);
            let adj = gameEngine.mouse.x - (this.position.x - this.game.camera.x) - xOffset;

            //console.log('Opp: ' + -opp + ' Adj: ' + adj);
            let angle = Math.atan(opp / adj);
            this.degrees = Math.floor(angle * (180 / Math.PI));

            //Correct angle to represent 360 degrees around player
            if (opp >= 0 && adj < 0) {
                this.degrees += 180;
            } else if (opp < 0 && adj < 0) {
                this.degrees += 180;
            } else if (opp < 0 && adj >= 0) {
                this.degrees += 360;
            }

            //Record the current elapsed time of animation state
            let timeSync = this.bodyAnimations[this.state][this.helmet].elapsedTime;
            //Set helmet animation
            if ((this.degrees <= 90 && this.degrees > 30) || (this.degrees > 90 && this.degrees <= 150)) {

                this.helmet = 2;

            } else if ((this.degrees >= 270 && this.degrees < 330) || (this.degrees < 270 && this.degrees > 210)) {
                this.helmet = 1;
            } else {
                this.helmet = 0;
            }
            //Restore prev captured animation elapsed time (This will sync the animations)
            this.bodyAnimations[this.state][this.helmet].elapsedTime = timeSync;

        }

    };

    reverseMovement(cond) {
        this.bodyAnimations[this.state].reverse = cond;
        this.helmetAnimations[this.state].reverse = cond;
    };

    takeDMG() {
        this.regen = 400;
        if (this.shield != 0) {
            //TODO
            // subtract shield
        } else if (this.shield == 0 && this.hp > 0) {
            //TODO
            // subtract HP
        } else {
            // Dead
        }
    }

    addHealth() {
        // Add to Shield
        // Add to HP
    }

    regenShield() {
        if (this.shield < this.maxShield) {
            if (this.regen > 0) {
                this.regen--;
            } else {
                this.shield++;
            }
        } else {
            this.regen = 400;
        }
    }
};

// *** Keys ***
const keys = {
    a: { // Left key
        pressed: false
    },
    d: { // Right key
        pressed: false
    },
    ' ': { // Up key
        pressed: false
    }
}

// *** KeyDown ***
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Player Keys
        case 'd':
            keys.d.pressed = true
            this.lastKey = 'd';
            break
        case 'a':
            keys.a.pressed = true
            this.lastKey = 'a';
            break
        case ' ':
            keys[' '].pressed = true
            break
    }
})

// *** KeyUp ***
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // Player Keys
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case ' ':
            keys[' '].pressed = false;
            break
    }
})
