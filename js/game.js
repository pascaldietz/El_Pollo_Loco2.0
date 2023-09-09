let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    /*world = new World(canvas, keyboard);*/
    canvas.classList.add('canvasStart')
    /*levelDesign();*/
    let isMobile = isMobileDevice()
    if (isMobile) {
        document.getElementById('bottomButtons').innerHTML = `
        <div><img src="./img/arrow_left.png" id="btnLeft"><img src="./img/arrow_right.png" id="btnRight"></div>
        <div><img src="./img/arrow_up.png" id="btnJump"><img src="./img/arrow_throw.png" id="btnThrow"></div>`

        document.getElementById('bottomButtons').style = 'position: relative; bottom: 3rem; z-index: 3; display: flex; justify-content: space-between; width: 100%;'
    }
    else {
        document.getElementById('bottomButtons').innerHTML = `
        <h2>"Pfeiltesten" zum Bewegen</h2>
        <h2>"Space" zum Springen</h2>
        <h2>"D" zum Flasche Werfen</h2>`
    }
}

function startGame() {
    world = new World(canvas, keyboard);
    levelDesign();
    canvas.classList.remove('canvasStart')
    document.getElementById('headerButtons').innerHTML = '<img src="./img/volume.png" onclick="muteSound()" style="width: 2rem; margin: 0 10px; cursor: pointer;">';
    document.getElementById('headerButtons').classList.add('headerButtonsInGame')
    document.getElementById('playButton').innerHTML = '';
}

function checkBtnPressed() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log('Taste Links ist gedrückt!')
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

}


window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});



function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function muteSound() {
    document.getElementById('headerButtons').innerHTML = '<img src="./img/mute.png" onclick="unmuteSound()" style="width: 2rem; margin: 0 10px; cursor: pointer;">'
}

function unmuteSound() {
    document.getElementById('headerButtons').innerHTML = '<img src="./img/volume.png" onclick="muteSound()" style="width: 2rem; margin: 0 10px; cursor: pointer;">'
}


// JavaScript zur Überprüfung des Gerätetyps
function isMobileDevice() {
    // Regulärer Ausdruck zur Identifizierung von Mobilgeräten
    const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    // Überprüfen, ob der User-Agent einen Mobilgerät-Muster enthält
    return mobilePattern.test(navigator.userAgent);
}