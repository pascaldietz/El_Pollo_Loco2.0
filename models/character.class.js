class Character extends MovebleObject {

    width = 150
    height = 300
    y = 160
    speed = 5

    idleTimer = 0;



    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    walking_sound = new Audio('audio/walkingSand.mp3');

    currentImage = 0;
    world;
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.animate()

    }

    jump() {

    };

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleTimer = 0;
            }
            if (this.world.keyboard.LEFT && this.x > 20) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleTimer = 0;
            }

        }, 1000 / 10);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 20) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {

            if(this.idleTimer > 0.5){
                if (!this.world.keyboard.RIGHT && this.idleTimer < 300) {
                    this.playAnimation(this.IMAGES_IDLE);
                    this.idleTimer ++;
                }
    
                if (!this.world.keyboard.LEFT && this.idleTimer < 300) {
                    this.playAnimation(this.IMAGES_IDLE);
                    this.idleTimer ++;
                }
    
                if (this.idleTimer >= 300) {
                    this.playAnimation(this.IMAGES_IDLE_LONG);
                }
            }            

            this.idleTimer ++;

        }, 1000 / 5);

    }
}