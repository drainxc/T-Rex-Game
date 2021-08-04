const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1520;
canvas.height = 600;

let TRex = new Image();
let cactus = new Image();

let jump = false;
let bow = false;

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

document.addEventListener('keydown', keyEvent);