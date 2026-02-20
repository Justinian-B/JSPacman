//board
let board;
const rowCount = 21;
const columnCount = 19;
const tileSize = 32;
const boardWidth = columnCount*tileSize;
const boardHeight = rowCount*tileSize;
let Context;

function loadImages() {
    wallImage = new Image();
    wallImage.src = "./wall.png";
//images
    blueGhostImage = new Image();
    blueGhostImage.src = "./blueGhost.png";
    orangeGhostImage = new Image();
    orangeGhostImage.src = "./orangeGhost.png";
    pinkGhostImage = new Image();
    pinkGhostImage.src = "./pinkGhost.png";
    redGhostImage = new Image();
    redGhostImage.src = "./redGhost.png";

    pacmanDownImage = new Image();
    pacmanDownImage.src = "./pacmanDown.png";
    pacmanUpImage = new Image();
    pacmanUpImage.src = "./pacmanUp.png";
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./pacmanLeft.png";
    pacmanRightImage = new Image();
    pacmanRightImage.src = "./pacmanRight.png";
}

//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
    context.imageSmoothingEnabled = false;

    loadImages();
    loadMap();
    console.log(walls.size);
    console.log(foods.size);
    console.log(ghosts.size);

    update();
    document.addEventListener("keyup", movePacman);
}

class Block {

    constructor(image, x, y, width, height) {

        this.image = image;
        this.x=x;
        this.y=y;
        this.height = height;
        this.width = width;

        this.startx=x;
        this.starty=y;
    }
}

function loadMap() {
    walls.clear();
    foods.clear();
    ghosts.clear();
    
    for (let r=0; r < rowCount; r++){
        for (let c=0; c < columnCount; c++){
            const row = tileMap[r];
            const tileMapChar = row[c]

            const x=c*tileSize;
            const y=r*tileSize;

            if (tileMapChar == "X") {
                //block wall
                const wall = new Block(wallImage, x,y,tileSize,tileSize);
                walls.add(wall);
            }
            else if (tileMapChar == "b" ) {
                //blue ghost
                const ghost = new Block(blueGhostImage, x,y,tileSize,tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == "0") {
                //orange ghost
                const ghost = new Block(orangeGhostImage, x,y,tileSize,tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == "p") {
                //pink ghost
                const ghost = new Block(pinkGhostImage, x,y,tileSize,tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == "r") {
                //red ghost
                const ghost = new Block(redGhostImage, x,y,tileSize,tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == "P") {
            //pacman
                pacman = new Block(pacmanUpImage,x,y,tileSize,tileSize);
            }
            else if (tileMapChar ==" "){
                //empty is food
                const food = new Block(null,x+14,y+14,tileSize,tileSize);
                foods.add(food);
            }
        }
    }
}


function update(){
    move();
    draw();
    setTimeout(update, 50);
}

function draw(){
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for(let ghost of ghosts.values()){
        context.drawImage(ghost.image, ghost.x,ghost.y,ghost.width, ghost.height);
    }
    for(let wall of walls.values()){
        context.drawImage(wall.image,wall.x, wall.y, wall.width,wall.height)
    }
}

function move() {
    pacman.x= pacman.velocityX;
    pacman.Y= pacman.velocityY;
}

function movePacman(e) {
    if (e.code == "ArowUp" || e.code == "KeyW"){
        pacman.updateDirection('U');
    }
    else if (e.code == "ArowDown" || e.code == "KeyS"){
        pacman.updateDirection('D');
    }
    else if (e.code == "ArowLeft" || e.code == "KeyA"){
        pacman.updateDirection('L');
    }
    else if (e.code == "ArowRight" || e.code == "KeyD"){
        pacman.updateDirection('R');
    }
}

class Block{
    constructor(image, x,y, width, height){
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.startx = x;
        this.starty = y;

        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;
    }

    updateDirection(direction){
        this.direction = direction;
        this.updateVelocity();
    }

    updateDirection() {
        if(this.directon=='u') {
            this.velocityX = 0;
            this.velocityY = -tileSize/4;
        }
        else if(this.directon=='D') {
            this.velocityX = 0;
            this.velocityY = tileSize/4;
        }
        else if(this.directon=='L') {
            this.velocityX = -tileSize/4;
            this.velocityY = 0;
        }
        else if(this.directon=='R') {
            this.velocityX = tileSize/4;
            this.velocityY = 0;
        }
    }
}