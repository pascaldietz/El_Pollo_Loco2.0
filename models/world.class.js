class World {


    character = new Character();
    enemies = [
        new Chicken(720),
        new Chicken(1440),
        new Chicken(2000)
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png',0),
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png',0),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png',0)
    ]
    clouds = [
        new Cloud(0)
    ];
    canvas;
    ctx;
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.checkClouds();
    }
    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.addMoreToMap(this.backgroundObjects);
        this.addMoreToMap(this.clouds);
        this.addToMap(this.character);
        this.addMoreToMap(this.enemies);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    };

    addToMap(mo) {
        this.ctx.drawImage(mo.img,mo.x,mo.y,mo.width,mo.height);
    }
    addMoreToMap(MoAr){
        MoAr.forEach(mo => {
            this.addToMap(mo);
        });
    }

    checkClouds(){
        setInterval(() => {
            if(this.clouds[0].x <= -720 && this.clouds.length < 2){
                this.clouds.push(new Cloud(720))
                console.log('New Cloud hinzugefügt');
                console.log(this.clouds);
            }
            if(this.clouds[0].x <= -1440){
                this.clouds.splice(0,1);
                console.log(this.clouds);
            }
        }, 500);
    }
}