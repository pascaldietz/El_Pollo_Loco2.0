class Coins extends MovebleObject {
    width = 200;
    height = 200;
    y = 310; 


    constructor(start, end) {
        super()
        this.loadImage('img/8_coin/coin_1.png')
        this.x = (400 * start) + (Math.random() * (end - 2000));
    }
}