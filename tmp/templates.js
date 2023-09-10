function inputSoundButton(imgName,func){
    return `<img src="./img/${imgName}.png" onclick="${func}" style="width: 2rem; margin: 0 10px; cursor: pointer;">`
}

function insertDesktopDescriptionText(){
    return `<h2>"Pfeiltesten" zum Bewegen</h2>
            <h2>"Space" zum Springen</h2>
            <h2>"D" zum Flasche Werfen</h2>`
}

function insertMobileHUDText(){
    return `<div><img src="./img/arrow_left.png" id="btnLeft"><img src="./img/arrow_right.png" id="btnRight"></div>
            <div><img src="./img/arrow_up.png" id="btnJump"><img src="./img/arrow_throw.png" id="btnThrow"></div>`
}