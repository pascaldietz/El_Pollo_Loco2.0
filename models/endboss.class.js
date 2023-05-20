class Endboss extends MovebleObject {
    width = 400;
    height = 400;
    y = 80;
    health = 200;
    attack = 5;
    isCollidingCharakter = false;
    attackCounter = 0;
    charcterIsLeft = true;
    deadCount = 0;

    IMAGES_WALKING_CHICKEN = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]
    IMAGES_ALERT_CHICKEN = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    IMAGES_ATTACK_CHICKEN = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_HURT_CHICKEN = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD_CHICKEN = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    currentImage = 0;

    constructor(start) {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.x = start;
        this.loadImages(this.IMAGES_WALKING_CHICKEN)
        this.loadImages(this.IMAGES_ALERT_CHICKEN)
        this.loadImages(this.IMAGES_ATTACK_CHICKEN)
        this.loadImages(this.IMAGES_HURT_CHICKEN);
        this.loadImages(this.IMAGES_DEAD_CHICKEN);
        this.animate()
    }



    animate() {
        setInterval(() => {
            if (!this.isCollidingCharakter && !this.isDead()) {
                if (this.isHurt(2)) {
                    this.playAnimation(this.IMAGES_HURT_CHICKEN);
                    this.attack = 0;
                }


                else if(this.charcterIsLeft) {
                    this.playAnimation(this.IMAGES_WALKING_CHICKEN);
                    this.moveLeft();
                    this.otherDirection = false;
                    this.attack = 15;
                }
                else{
                    this.playAnimation(this.IMAGES_WALKING_CHICKEN);
                    this.moveRight();
                    this.otherDirection = true;
                    this.attack = 15;

                }
            }
        }, 1000 / 6);

        setInterval(() => {
            if (this.isDead()) {
                if (this.deadCount < 3) {
                    let path = this.IMAGES_DEAD_CHICKEN[this.deadCount];
                    this.img = this.imageCache[path];
                    this.deadCount++;
                }
                this.attack = 0;
            }
        }, 1000/6)


        setInterval(() => {
            if (this.isCollidingCharakter && !this.isDead() && !this.isHurt(1)) {
                if (this.attackCounter < 30) {
                    this.playAnimation(this.IMAGES_ATTACK_CHICKEN);
                    this.attackCounter++;
                    this.attack = 20;
                }
                else {
                    this.isCollidingCharakter = false;
                    this.attackCounter = 0;
                }
            }
        }, 1000/11);
    }
}
