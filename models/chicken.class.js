class Chicken extends MovebleObject {

    width = 80;
    height = 80;
    y = 380;
    speed = 3;
    health = 5;
    attack = 0.1;
    

    IMAGES_WALKING_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    currentImage = 0;

    constructor(start) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = start;
        this.speed = 1 + Math.random() * 4;
        this.loadImages(this.IMAGES_WALKING_CHICKEN)
        this.loadImages(this.IMAGES_DEAD_CHICKEN)
        this.animate()
    }



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