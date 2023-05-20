class Bottle extends MovebleObject {
    width = 100;
    height = 100;
    y = 350;


    constructor(start, end) {
        super()
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.x = (400 * start) + (Math.random() * (end - 2000));
    }
}