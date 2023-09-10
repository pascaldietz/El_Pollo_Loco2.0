class MovebleObject extends DrawableObjects {


    speed = 30;
    runSpeed = 2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    health = 100;
    attack = 20;
    lastHit = 0;
    jumped = false
    landing_sound = new Audio('audio/land_sand_snow.mp3')
    squeak_sound = new Audio ('audio/squeak.mp3')

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if(this.jumped && !this.isAboveGround()){
                this.landing_sound.play()
                this.jumped = false;
            }

        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 160;
        }


    }

    moveRight() {
        this.x += this.speed;

    };

    moveLeft() {
        this.x -= this.speed;

    }



    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 25;
        this.jumped = true
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    itHurt(images) {
        this.playAnimation(images)
    }

    isDead() {
        return this.health <= 0;
    }

    hit(hit) {
        this.health -= hit;
        if (this.health < 0) {
            this.health = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(time) {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < time;
    }
}