class Cloud extends MovebleObject{
    y = 0;
    width = 1440;
    height = 480;
    constructor(x){
        super().loadImage('img/5_background/layers/4_clouds/full.png');

        this.x = x;
        this.cloudsFlow()
        
    }

    cloudsFlow(){
        setInterval(() => {
            this.x -= 0.2;
        }, 1000/this.speed);
    }

}