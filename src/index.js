const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 300;

let TRex = new Image();
let cactus = new Image();

let TRexX = 50;
let TRexY = 225;
let jump = false;
let bow = false;
let move = 1;

let TRexImg = [
    "../asset/img/T-Rex.png",
    "../asset/img/T-RexMove1.png",
    "../asset/img/T-RexMove2.png",
    "../asset/img/DeadT-Rex.png"
];

let cactusImg = [
    "../asset/img/cactus1.png",
    "../asset/img/cactus2.png",
    "../asset/img/cactus3.png",
    "../asset/img/cactus4.png",
    "../asset/img/cactus5.png",
    "../asset/img/cactus6.png",
    "../asset/img/bigCactus1.png",
    "../asset/img/bigCactus2.png",
    "../asset/img/bigCactus3.png",
    "../asset/img/bigCactus4.png",
    "../asset/img/bigCactus5.png",
];

setInterval (function () {
    TRex.src = TRexImg[move];
    draw();
    if (move == 1) {
        move++;
    }
    else if (move == 2) {
        move--;
    }
}, 100);

function keyEvent(event) {
    console.log(event.key);
    if (event.key == ' ') {
        jump = true;
    }
    if (event.key == 'ArrowUp') {
        jump = true;
    }
    if (event.key == 'ArrowDown') {
        bow = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(TRex, TRexX, TRexY);
}

document.addEventListener('keydown', keyEvent);