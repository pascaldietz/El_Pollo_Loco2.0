class Chicken extends MovebleObject{

width = 80;
height = 80;
y = 380;

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
        super.moveLeft(this.runSpeed);
        this.loadImages(this.IMAGES_WALKING_CHICKEN)
        this.animate()
    }



    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING_CHICKEN.length;
            let path = this.IMAGES_WALKING_CHICKEN[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        },1000/7);
    }
}