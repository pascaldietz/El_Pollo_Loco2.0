class StatusBarCoins extends DrawableObjects {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]

    constructor() {
        super()
        this.loadImages(this.IMAGES)
        this.x = 20;
        this.y = 100;
        this.height = 50;
        this.width = 200;
        this.setPercentage(0);
    }
    /**
     * Sets the percentage value and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value to set.
     */

    setPercentage(percentage) {
        this.percentage = percentage;
        let pathIndex = this.resolveImageIndex();
        let path = this.IMAGES[pathIndex];
        this.img = this.imageCache[path];
    }
    /**
     * Resolves the index of the image based on the percentage value.
     * @returns {number} - The index of the image to use.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }
        else if (this.percentage > 80) {
            return 4;
        }
        else if (this.percentage > 60) {
            return 3;
        }
        else if (this.percentage > 40) {
            return 2;
        }
        else if (this.percentage > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
}