class Endboss extends MovebleObject {
    width = 400;
    height = 400;
    y = 80;

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

    currentImage = 0;

    constructor(start) {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.x = start;
        this.loadImages(this.IMAGES_ALERT_CHICKEN)
        this.animate()
    }



    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT_CHICKEN);
        }, 1000 / 2);
    }
}