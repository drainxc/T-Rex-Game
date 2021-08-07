const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 300;

let TRex = new Image();
let obstacle = [];
let floor = new Image();
let point = [];

let TRexX = 50;
let TRexY = 225;
let floorX = 0;
let floorY = 260;
let obstacleX = [];
let obstacleY = [];
let TRexBowY = 240;

let jump = false;
let bow = false;
let game = false;
let move = 0;
let num = 9;
let gravity = 0.5;
let pointNum = [];
let randomNum;
let wingNum = [];
let wing = [];
for (let i = 0; i < 2; i++) {
    obstacle[i] = new Image();
    obstacleX[i] = 1350 + (i * 400);
    wing[i] = false;
    wingNum[i] = 11;
}
for (let i = 0; i < 5; i++) {
    point[i] = new Image();
    point[i].src = "../asset/img/0.png";
    pointNum[i] = 1;
}

let TRexImg = [
    "../asset/img/T-RexMove1.png",
    "../asset/img/T-RexMove2.png",
    "../asset/img/DeadT-Rex.png",
]; // 플레이어 이미지


let TRexBowImg = [
    "../asset/img/T-RexBow1.png",
    "../asset/img/T-RexBow2.png"
]

let obstacleImg = []; // 장애물 이미지

let pointImg = [];

for (let i = 0; i < 13; i++) {
    if (i < 6)
        obstacleImg.push(`../asset/img/cactus${i + 1}.png`);
    else if (i < 11)
        obstacleImg.push(`../asset/img/bigCactus${i - 5}.png`);
    else if (i < 13)
        obstacleImg.push(`../asset/img/bird${i - 10}.png`);
}

for (let i = 0; i < 10; i++) {
    pointImg.push(`../asset/img/${i}.png`);
}

TRex.src = "../asset/img/T-Rex.png";
floor.src = "../asset/img/floor.png";

let jumpSound = new Audio('../asset/sound/jumpSound.mp3');
let deathSound = new Audio('../asset/sound/deathSound.mp3');
let pointSound = new Audio('../asset/sound/pointSound.mp3');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // 랜덤

function keydownEvent(event) {
    if (event.key == ' ' || event.key == 'ArrowUp') {
        game = true;
        if (TRexY == 225) {
            jump = true;
            jumpSound.play();
        } // 점프
    }
    if (game) {
        if (event.key == 'ArrowDown') {
            if (TRexY == 225) {
                bow = true;
                TRex.src = TRexBowImg[move];
            }
            else {
                jump = false;
                gravity = 1;
                num = 9;
            }
        } // 숙이기
    }
    if (event.key == 'r') {
        location.reload();
    }
}

function keyupEvent(event) {
    if (game) {
        if (event.key == 'ArrowDown') {
            bow = false;
            gravity = 0.5;
            num = 9;
            TRex.src = TRexImg[move];
        }
    }
}

setInterval(function () {
    if (game) {
        if (!bow) {
            TRex.src = TRexImg[move];
        }
        if (TRexY == 225) {
            if (move == 0) {
                move++;
            }
            else if (move == 1) {
                move--;
            }
        } // 플레이어 애니메이션
        else {
            TRex.src = "../asset/img/T-Rex.png";
        } // 플레이어 점프 시 애니메이션
    }
}, 100);

setInterval(function () {
    for (let i = 0; i < 2; i++) {
        if (wing[i]) {
            obstacle[i].src = obstacleImg[wingNum[i]];
            if (wingNum[i] == 11) {
                wingNum[i]++;
            }
            else if (wingNum[i] == 12) {
                wingNum[i]--;
            }
        }
    } // 새 애니메이션
}, 200);

setInterval(function () {
    if (game) {
        if (jump) {
            TRexY -= num;
            num -= gravity;
        }
        if (num == 0) {
            jump = false;
        } // 점프
        if (!jump && TRexY != 225) {
            num += gravity;
            TRexY += num;
        } // 점프 후
        if (TRexY >= 225) {
            TRexY = 225;
        }

        if (floorX <= -2800) {
            floorX = 0
        }

        for (let i = 0; i < 2; i++) {
            randomNum = getRandomIntInclusive(0, 11);
            if (obstacleX[i] <= -50) {
                if (randomNum >= 1 && randomNum <= 5) {
                    obstacle[i].src = obstacleImg[randomNum];
                    wing[i] = false;
                    obstacleY[i] = 235;
                }
                else if (randomNum >= 6 && randomNum <= 10) {
                    obstacle[i].src = obstacleImg[randomNum];
                    wing[i] = false;
                    obstacleY[i] = 220;
                }
                else {
                    obstacle[i].src = obstacleImg[randomNum];
                    wing[i] = true;
                    obstacleY[i] = getRandomIntInclusive(150, 151);
                }
                obstacleX[i] = 750;
            } // 랜덤 장애물 생성
            obstacleX[i] -= 7; // 장애물 이동
        }
        floorX -= 7; //바닥 이동
    }
    draw();
}, 20);

for (let i = 100; i < 1000001; i *= 10) {
    setInterval(function () {
        for (j = 0; j < 5; j++) {
            if (i == (100 * (10 ** j))) {
                point[j].src = pointImg[pointNum[j]];
                pointNum[j]++;
            }
        }
        for (let j = 0; j < 5; j++) {
            if (pointNum[j] > 9) {
                pointNum[j] = 0;
            }
        }
    }, i);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(floor, floorX, floorY);
    if (!bow) {
        ctx.drawImage(TRex, TRexX, TRexY);
    }
    else if (bow) {
        ctx.drawImage(TRex, TRexX, TRexBowY);
    }
    for (let i = 0; i < 2; i++) {
        ctx.drawImage(obstacle[i], obstacleX[i], obstacleY[i]);
    }
    for (let i = 0; i < 5; i++) {
        ctx.drawImage(point[i], (650 - (i * 11)), 100);
    }
} // 그리기

document.addEventListener('keydown', keydownEvent);
document.addEventListener('keyup', keyupEvent);