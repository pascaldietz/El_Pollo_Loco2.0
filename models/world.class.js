class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }
    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addMoreToMap(this.level.backgroundObjects);
        this.addMoreToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addMoreToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    };

    setWorld(){
        this.character.world = this;
    }

    addToMap(mo) {
        if(mo.otherDirection){
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img,mo.x,mo.y,mo.width,mo.height);
        if(mo.otherDirection){
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }

    addMoreToMap(MoAr){
        MoAr.forEach(mo => {
            this.addToMap(mo);
        });
    }
}