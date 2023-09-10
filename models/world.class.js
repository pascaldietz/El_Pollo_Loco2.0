class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoins = new StatusBarCoins();
    endScreen = new EndScreen();
    gameOverScreen = new GameOverScreen();
    throwableObjects = []
    endBossIsSpawn = false;
    collectibles = []
    bottleThrown = false
    chicken_sound = new Audio('audio/chickens.mp3')
    bottle_break_sound = new Audio('audio/bottle_break.mp3')




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.spawnBottlesAndCoins();
        this.chicken_sound.volume = 0.3;
        this.chicken_sound.play()
    }
    /**
     * Runs the game loop, handling collisions and game events.
     */
    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkBottleUnderGround();
            this.spawnEndBoss();
            this.checkCharPosToBoss()
        }, 30)

        setInterval(() => {
            if (isMobileDevice) { checkBtnPressed() }
            this.checkThrowObjects();
        }, 150)
    }
    /**
     * Checks the character's position relative to the end boss.
     */
    checkCharPosToBoss() {
        if (world.level.enemies[world.level.enemies.length - 1].x < this.character.x && this.endBossIsSpawn) {
            world.level.enemies[world.level.enemies.length - 1].charcterIsLeft = false;
        }
        else {
            world.level.enemies[world.level.enemies.length - 1].charcterIsLeft = true;
        }
    }
    /**
     * Checks for throwing objects based on player input.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0 && !this.bottleThrown) {
            this.bottleThrown = true
            let bottle = new ThrowableObject(this.character.x + (this.character.width / 2), this.character.y + (this.character.height / 2))
            this.throwableObjects.push(bottle)
            this.character.bottles--;
            this.statusBarBottle.setPercentage(this.character.bottles / 15 * 100);
            this.throwableObjects.forEach((obj) => {
                obj.world = this;
            })
            setTimeout(() => {
                this.bottleThrown = false
            }, 800);
        }
    }
    /**
     * Checks if throwable objects are under the ground and removes them.
     */
    checkBottleUnderGround() {
        this.throwableObjects.forEach(tO => {
            if (tO.y > 750) {
                this.throwableObjects.splice(0, 1);
            }

        });
    }
    /**
     * Draws the game on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addMoreToMap(this.level.backgroundObjects);
        this.addMoreToMap(this.level.clouds);
        this.addMoreToMap(this.collectibles);
        this.addToMap(this.character);
        this.addMoreToMap(this.level.enemies);
        this.addMoreToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoins);
        if (this.character.isDead()) { this.addToMap(this.endScreen); }
        if (this.endBossIsSpawn) {
            if (world.level.enemies[world.level.enemies.length - 1].health <= 0) {
                this.addToMap(this.gameOverScreen);
                setTimeout(clearAllIntervals, 1000);
            }
        }
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };
    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }
    /**
     * Adds an object to the canvas for drawing.
     * @param {Drawable} mo - The object to be drawn.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    /**
     * Adds multiple objects to the canvas for drawing.
     * @param {Drawable[]} MoAr - A list of objects to be drawn.
     */
    addMoreToMap(MoAr) {
        MoAr.forEach(mo => {
            this.addToMap(mo);
        });
    }
    /**
     * Flips the image horizontally to draw objects in the other direction.
     * @param {Drawable} mo - The object to be drawn.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    /**
     * Reverts the flipped image back to its original direction.
     * @param {Drawable} mo - The object to be drawn.
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
    /**
     * Checks collisions in the game.
     */
    checkCollision() {
        this.checkEnemyCollision();
        this.checkEndBossCollision();
        this.checkThrowableObjectCollision();
        this.checkCollectibleCollision();
    }
    /**
     * Checks collisions with enemies in the game.
     */
    checkEnemyCollision() {
        this.level.enemies.forEach((enemy, y) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (this.character.speedY < 0 && this.character.isAboveGround()) {
                    if (enemy instanceof Chicken || enemy instanceof BabyChicken) {
                        enemy.hit(5);
                    }
                    enemy.squeak_sound.play();
                } else {
                    this.character.hit(enemy.attack);
                    this.statusBar.setPercentage(this.character.health);
                }
            }
        });
    }
    /**
     * Checks collisions with the end boss in the game.
     */
    checkEndBossCollision() {
        const lastEnemy = this.level.enemies[this.level.enemies.length - 1];
        if (lastEnemy.isColliding(this.character) && this.endBossIsSpawn) {
            lastEnemy.isCollidingCharakter = true;
        }
    }
    /**
     * Checks collisions with throwable objects in the game.
     */
    checkThrowableObjectCollision() {
        if (this.endBossIsSpawn && this.throwableObjects.length > 0) {
            const lastEnemy = this.level.enemies[this.level.enemies.length - 1];
            this.throwableObjects.forEach((obj) => {
                if (lastEnemy.isColliding(obj)) {
                    lastEnemy.hit(obj.attack);
                    this.throwableObjects.splice(0, 1);
                    this.bottle_break_sound.play();
                }
            });
        }
    }
    /**
     * Checks collisions with collectible objects in the game.
     */
    checkCollectibleCollision() {
        this.collectibles.forEach((clb, index) => {
            if (this.character.isColliding(clb)) {
                if (clb instanceof Bottle) {
                    this.character.bottles++;
                    this.collectibles.splice(index, 1);
                    this.statusBarBottle.setPercentage(this.character.bottles / 8 * 100);
                }
                if (clb instanceof Coins) {
                    this.character.coins++;
                    this.collectibles.splice(index, 1);
                    this.statusBarCoins.setPercentage(this.character.coins / 11 * 100);
                }
            }
        });
    }
    /**
     * Spawns the end boss in the game.
     */
    spawnEndBoss() {
        if (this.character.x > this.level.level_end_x / 2 && !this.endBossIsSpawn) {
            this.level.enemies.push(new Endboss(this.level.level_end_x + 400));
            this.endBossIsSpawn = true;
        }
    }
    /**
     * Spawns bottles and coins in the game.
     */
    spawnBottlesAndCoins() {
        for (let i = 0; i < 15; i++) {
            this.collectibles.push(new Bottle(i, this.level.level_end_x))
        }
        for (let i = 0; i < 11; i++) {
            this.collectibles.push(new Coins(i, this.level.level_end_x))
        }
    }
}