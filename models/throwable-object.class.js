class ThrowableObject extends MovebleObject {
    world;
    lookRight = true;
    attack = 15;

    IMAGES_BOTTLE_SPIN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_SPIN);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100
        this.thow(this.x, this.y);
        this.animate()
        this.checkLook()
    }
    /**
    * Throws the object with a specified trajectory.
    * @param {number} x - The x-coordinate of the throw.
    * @param {number} y - The y-coordinate of the throw.
    */
    thow(x, y) {
        setTimeout(() => {
            this.x = x;
            this.y = y;
            this.speedY = 20;
            this.applyGravity();
            if (this.lookRight) {
                setInterval(() => {
                    this.x += 15;
                }, 25)
            }
            else {
                setInterval(() => {
                    this.x -= 15;
                }, 25)
            }
        }, 60)
    }
    /**
     * Animates the spinning of the throwable object.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPIN)
        }, 1000 / 30)
    }
    /**
     * Checks the direction to look based on the character's direction.
     */
    checkLook() {
        setTimeout(() => {
            this.lookRight = !this.world.character.otherDirection;
        }, 50)
    }
}