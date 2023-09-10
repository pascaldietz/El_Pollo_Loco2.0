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
    squeak_sound = new Audio('audio/squeak.mp3')
    /**
     * Applies gravity to the object's vertical position and handles jumping.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.jumped && !this.isAboveGround()) {
                this.landing_sound.play()
                this.jumped = false;
            }

        }, 1000 / 25)
    }
    /**
     * Checks if the object is above the ground or not.
     * @returns {boolean} - `true` if the object is above the ground, `false` otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 160;
        }
    }
    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    };
    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }
    /**
     * Plays an animation by cycling through a set of images.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    /**
     * Initiates a jump for the object.
     */
    jump() {
        this.speedY = 25;
        this.jumped = true
    }
    /**
     * Checks if the object is colliding with another object.
     * @param {MoveableObject} mo - The other object to check for collision.
     * @returns {boolean} - `true` if the objects are colliding, `false` otherwise.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }
    /**
     * Plays a specific animation when the object is hurt.
     * @param {string[]} images - An array of image paths for the hurt animation.
     */
    itHurt(images) {
        this.playAnimation(images)
    }
    /**
     * Checks if the object is dead.
     * @returns {boolean} - `true` if the object's health is less than or equal to 0, `false` otherwise.
     */
    isDead() {
        return this.health <= 0;
    }
    /**
     * Inflicts damage to the object's health and records the time of the last hit.
     * @param {number} hit - The amount of damage to inflict.
     */
    hit(hit) {
        this.health -= hit;
        if (this.health < 0) {
            this.health = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
     * Checks if the object is hurt within a specified time frame.
     * @param {number} time - The time frame in seconds to consider for being hurt.
     * @returns {boolean} - `true` if the object is hurt within the time frame, `false` otherwise.
     */
    isHurt(time) {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < time;
    }
}