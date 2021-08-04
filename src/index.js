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
let game = false;
let num = 10;

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

TRex.src = "../asset/img/T-Rex.png";

setInterval(function () {
    if (game) {
        TRex.src = TRexImg[move];
        if (move == 1) {
            move++;
        }
        else if (move == 2) {
            move--;
        }
    }
    draw();
}, 100);

setInterval(function () {
    if (game) {
        if (jump) {
            TRexY -= num;
            num -= 0.5;
        }
        if (num == 0) {
            jump = false;
        }
        if (!jump && TRexY != 225) {
            num += 0.5;
            TRexY += num;
        }
    }
    draw();
}, 10);

function keyEvent(event) {
    console.log(event.key);
    if (event.key == ' ') {
        game = true;
    }
    if (event.key == 'ArrowUp') {
        if (TRexY == 225) {
            jump = true;
        }
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