class Chicken extends MovebleObject{

width = 80;
height = 80;
y = 380;
speed = 3;
health = 20;
attack = 5;

IMAGES_WALKING_CHICKEN = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
]

currentImage = 0;

    constructor(start){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = start;
        this.runSpeed = 1 + Math.random() * 3;
        this.loadImages(this.IMAGES_WALKING_CHICKEN)
        this.animate()
    }



    animate() {

        setInterval(() => {
            this.moveLeft()
        }, 1000 / 30);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING_CHICKEN);
        },1000/7);
    }
}