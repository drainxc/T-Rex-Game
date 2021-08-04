const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 300;

let TRex = new Image();
let obstacle = [];
let floor = new Image();
for (let i = 0; i < 2; i++) {
    obstacle[i] = new Image();
}

let TRexX = 50;
let TRexY = 225;
let floorX = 0;
let floorY = 260;
let obstacleX = [];
let obstacleY = [];
obstacleX[0] = 1350;
obstacleX[1] = 1750;

let jump = false;
let bow = false;
let move = 1;
let game = false;
let num = 9;

let TRexImg = [
    "../asset/img/T-Rex.png",
    "../asset/img/T-RexMove1.png",
    "../asset/img/T-RexMove2.png",
    "../asset/img/DeadT-Rex.png"
];

let obstacleImg = [
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
    "../asset/img/bigCactus5.png"
];

TRex.src = "../asset/img/T-Rex.png";
floor.src = "../asset/img/floor.png";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // 랜덤

setInterval(function () {
    if (game) {
        TRex.src = TRexImg[move];
        if (TRexY == 225) {
            if (move == 1) {
                move++;
            }
            else if (move == 2) {
                move--;
            }
        }
        else {
            TRex.src = TRexImg[0];
        }
    }
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

        if (floorX <= -2800) {
                floorX = 0
            }

        for (let i = 0; i < 2; i++) {
            if (obstacleX[i] <= -50) {
                if (getRandomIntInclusive(1, 2) == 1) {
                    obstacle[i].src = obstacleImg[getRandomIntInclusive(0, 5)];
                    obstacleY[i] = 235;
                }
                else {
                    obstacle[i].src = obstacleImg[getRandomIntInclusive(6, 10)];
                    obstacleY[i] = 220;
                }
                obstacleX[i] = 750;
            }
            obstacleX[i] -= 7;
        }
        floorX -= 7;
    }
    draw();
}, 20);

function keyEvent(event) {
    if (event.key == ' ' || event.key == 'ArrowUp') {
        game = true;
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
    ctx.drawImage(floor, floorX, floorY);
    ctx.drawImage(TRex, TRexX, TRexY);
    for (let i = 0; i < 2; i++) {
        ctx.drawImage(obstacle[i], obstacleX[i], obstacleY[i]);
    }
}

document.addEventListener('keydown', keyEvent);