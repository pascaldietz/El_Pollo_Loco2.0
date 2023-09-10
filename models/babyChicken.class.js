class BabyChicken extends MovebleObject {

    width = 80;
    height = 80;
    y = 380;
    speed = 3;
    health = 5;
    attack = 0.07;

    IMAGES_WALKING_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGES_DEAD_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    currentImage = 0;

    constructor(start) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = start;
        this.speed = 1 + Math.random() * 5;
        this.loadImages(this.IMAGES_WALKING_CHICKEN)
        this.loadImages(this.IMAGES_DEAD_CHICKEN)
        this.animate()
    }

    /**
    * Handles the animation behavior for the chicken character.
    * Moves the character left continuously and plays walking or dead animation based on character's state.
    */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft()
            }
        }, 1000 / 30);
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING_CHICKEN);
            }
            else{
                this.playAnimation(this.IMAGES_DEAD_CHICKEN);
            }
        }, 1000 / 7);
    }
}