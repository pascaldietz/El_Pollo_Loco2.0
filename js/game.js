let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('./audio/latin-reggaeton-hip-hop-mexican-background-music-caliente-flow-146085.mp3')
let isMobile = isMobileDevice()
let mobileButtons = false;
backgroundMusic.volume = 0.2;
/**
 * Initialize the game by getting the canvas element and adding CSS classes.
 * Also, start checking if the game is being played on a phone.
 */
function init() {
    canvas = document.getElementById('canvas');
    canvas.classList.add('canvasStart')
    isPhoneCheckInterval();
}
/**
 * Start the game by creating a new world, designing the level, removing CSS classes, and setting up buttons.
 */
function startGame() {
    world = new World(canvas, keyboard);
    levelDesign();
    canvas.classList.remove('canvasStart')
    document.getElementById('headerButtons').innerHTML = inputSoundButton('volume','muteSound()');
    document.getElementById('headerButtons').classList.add('headerButtonsInGame')
    document.getElementById('playButton').innerHTML = '';
    backgroundMusic.play()
    backgroundMusic.loop
}
/**
 * Check if virtual buttons on mobile devices are pressed and update the keyboard state accordingly.
 */
function checkBtnPressed() {
    if (isMobile) {
        isButtonPressed('btnLeft', 'LEFT');
        isButtonPressed('btnRight', 'RIGHT');
        isButtonPressed('btnJump', 'SPACE');
        isButtonPressed('btnThrow', 'D');
    }
}
/**
 * Listen for touch events on virtual buttons and update the keyboard state accordingly.
 * @param {string} BtnID - The ID of the virtual button element.
 * @param {string} keyboardID - The corresponding key in the keyboard state.
 */
function isButtonPressed(BtnID, keyboardID) {
    document.getElementById(BtnID).addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[keyboardID] = true;
    });
    document.getElementById(BtnID).addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[keyboardID] = false;
    });
}

/**
 * Listen for keydown events and update the keyboard state based on the pressed keys.
 * @param {Event} event - The keydown event object.
 */
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
/**
 * Listen for keyup events and update the keyboard state based on the released keys.
 * @param {Event} event - The keyup event object.
 */
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


/**
 * Clear all JavaScript intervals with IDs from 1 to 9999.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Mute the game sound and update the sound control button in the header.
 */
function muteSound() {
    document.getElementById('headerButtons').innerHTML = inputSoundButton('mute','unmuteSound()')
    backgroundMusic.pause()
}

/**
 * Unmute the game sound and update the sound control button in the header.
 */
function unmuteSound() {
    document.getElementById('headerButtons').innerHTML = inputSoundButton('volume','muteSound()')
    backgroundMusic.play()
}

/**
 * Check if the current device is a mobile device based on the user agent.
 * @returns {boolean} - True if the device is a mobile device, otherwise false.
 */
function isMobileDevice() {
    const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobilePattern.test(navigator.userAgent);
}

/**
 * Determine if the game should display mobile or desktop buttons and update the UI accordingly.
 */
function inputBottomButtonsMobileOrNot() {
    isMobile = isMobileDevice()
    if (isMobile) {
        if (!mobileButtons) {
            insertMobileHUD();
            mobileButtons = true;
        }
    }
    else {
        if (mobileButtons) {
            insertDesktopDeskription();
            mobileButtons = false;
        }
    }
}

/**
 * Check if the device is in landscape mode (orientation is 90 or -90 degrees).
 * @returns {boolean} - True if the device is in landscape mode, otherwise false.
 */
function isLandscapeMode() {
    return Math.abs(window.orientation) === 90;
}

/**
 * Show or hide a notification about landscape mode based on device orientation and type.
 */
function showNotificationLandscape() {
    if (!isLandscapeMode() && isMobile) {
        document.getElementById('landscapeNote').classList.remove('d-none')
    }
    else {
        document.getElementById('landscapeNote').classList.add('d-none')
    }
}

/**
 * Periodically check and update the mobile device status and landscape mode notification.
 */
function isPhoneCheckInterval() {
    setInterval(() => {
        inputBottomButtonsMobileOrNot();
        showNotificationLandscape();
    }, 1000)
}

/**
 * Insert desktop description text and CSS classes into the bottom buttons section.
 */
function insertDesktopDeskription() {
    document.getElementById('bottomButtons').innerHTML = insertDesktopDescriptionText();
    document.getElementById('bottomButtons').classList.add('desktopDescription')
    document.getElementById('bottomButtons').classList.remove('mobileHUD')
}

/**
 * Insert mobile HUD text and CSS classes into the bottom buttons section.
 */
function insertMobileHUD() {
    document.getElementById('bottomButtons').innerHTML = insertMobileHUDText()
    document.getElementById('bottomButtons').classList.add('mobileHUD')
    document.getElementById('bottomButtons').classList.remove('desktopDescription')
}
