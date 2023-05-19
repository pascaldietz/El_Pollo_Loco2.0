class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    statusBar = new StatusBar();
    endScreen = new EndScreen();
    throwableObjects = []
    endBossIsSpawn = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
            this.checkBottleUnderGround();
            this.spawnEndBoss();
            this.checkCharPosToBoss()
        }, 300)
    }

    checkCharPosToBoss() {
        if (world.level.enemies[world.level.enemies.length - 1].x < this.character.x && this.endBossIsSpawn) {
            world.level.enemies[world.level.enemies.length - 1].charcterIsLeft = false;
        }
        else {
            world.level.enemies[world.level.enemies.length - 1].charcterIsLeft = true;
        }

    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + (this.character.width / 2), this.character.y + (this.character.height / 2))
            this.throwableObjects.push(bottle)
            this.character.bottles--;
            this.throwableObjects.forEach((obj)=>{
                obj.world = this;
            })
        }
    }

    checkBottleUnderGround() {
        this.throwableObjects.forEach(tO => {
            if (tO.y > 750) {
                this.throwableObjects.splice(0, 1);
            }

        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addMoreToMap(this.level.backgroundObjects);
        this.addMoreToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addMoreToMap(this.level.enemies);
        this.addMoreToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        if (this.character.isDead()) { this.addToMap(this.endScreen); }
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    setWorld() {
        this.character.world = this;
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    addMoreToMap(MoAr) {
        MoAr.forEach(mo => {
            this.addToMap(mo);
        });
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(enemy.attack);
                this.statusBar.setPercentage(this.character.health);
            }

        });
        if (this.level.enemies[world.level.enemies.length - 1].isColliding(this.character) && this.endBossIsSpawn) {
            world.level.enemies[world.level.enemies.length - 1].isCollidingCharakter = true;
        }

        if(this.endBossIsSpawn && this.throwableObjects.length > 0){
            this.throwableObjects.forEach((obj) =>{
            if(this.level.enemies[world.level.enemies.length - 1].isColliding(obj)){
                this.level.enemies[world.level.enemies.length - 1].hit(obj.attack)
            }
            })
        }
    }

    spawnEndBoss() {
        if (this.character.x > this.level.level_end_x - this.canvas.width && !this.endBossIsSpawn) {
            this.level.enemies.push(new Endboss(this.level.level_end_x + 400));
            this.endBossIsSpawn = true;
            console.log('Der Endboss wurde Gespawnt!!!')

        }
    }
}