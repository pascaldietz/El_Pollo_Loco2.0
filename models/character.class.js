class Character extends MovebleObject {

    width = 150
    height = 300
    y = 160
    speed = 5
    bottles = 0;
    idleTimer = 0;
    coins = 0;
    deadCount = 0;



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

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    walking_sound = new Audio('audio/walkingSand.mp3');
    world;
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate()
        this.applyGravity();

    }

    animate() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt()) {
                if (!this.isAboveGround()) {
                    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                        this.playAnimation(this.IMAGES_WALKING);
                        this.idleTimer = 0;
                    }
                    if (this.world.keyboard.LEFT && this.x > 20) {
                        this.playAnimation(this.IMAGES_WALKING);
                        this.idleTimer = 0;
                    }
                }
            }


        }, 1000 / 10);

        setInterval(() => {

            if (!this.isDead()) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    
                }
                if (this.world.keyboard.LEFT && this.x > 20) {
                    this.moveLeft()
                    this.otherDirection = true;

                }
                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                }
                this.world.camera_x = -this.x + 250;
            }

        }, 1000 / 60);

        setInterval(() => {

            if (!this.isDead()) {
                if(this.isHurt(0.5)){
                    this.playAnimation(this.IMAGES_HURT);
                    this.idleTimer = 0;
                }

                else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMP);
                    this.idleTimer = 0;
                }

                

                else if (this.idleTimer > 0.5) {
                    if (!this.world.keyboard.RIGHT && this.idleTimer < 300) {
                        this.playAnimation(this.IMAGES_IDLE);
                        this.idleTimer++;
                    }

                    if (!this.world.keyboard.LEFT && this.idleTimer < 300) {
                        this.playAnimation(this.IMAGES_IDLE);
                        this.idleTimer++;
                    }

                    if (this.idleTimer >= 300) {
                        this.playAnimation(this.IMAGES_IDLE_LONG);
                    }
                }
            }



            this.idleTimer++;

        }, 1000 / 5);

        setInterval(() => {
            if (this.isDead()) {
                if (this.deadCount < 7) {
                    let path = this.IMAGES_DEAD[this.deadCount];
                    this.img = this.imageCache[path];
                    this.deadCount++;
                }
            }
        }, 1000/6)

    }
}