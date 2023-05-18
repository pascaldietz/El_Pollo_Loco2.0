class Character extends MovebleObject {

    width = 150
    height = 300
    y = 160
    speed = 5



    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    walking_sound = new Audio('audio/walkingSand.mp3');

    currentImage = 0;
    world;
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING)
        this.animate()

    }

    jump() {

    };

    animate() {
        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.playAnimation(this.IMAGES_WALKING);
            }

            if (this.world.keyboard.LEFT && this.x > 20) {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 1000 / 10);

        window.addEventListener('keyup', (event) => {this.walking_sound.pause();})

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 20) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

    }
}