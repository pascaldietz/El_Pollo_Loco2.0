class MovebleObject {
    x = 120;
    y = 250;
    img;
    height = 200;
    width = 100;
    speed = 30;
    runSpeed = 2;
    imageCache = {};
    otherDirection = false;

    moveRight() {

    };

    moveLeft(runSpeed) {
        setInterval(() => {
            this.x -= runSpeed;
        }, 1000 / this.speed);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}