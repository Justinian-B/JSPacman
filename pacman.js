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
    orangeGostImage = new Image();
    pinkGhostImage = new Image();
    redGhostImage = new Image();
    pacmanDownImage = new Image();
    pacmanUpImage = new Image();
    pacmanLeftImage = new Image();
    pacmanRightImage = new Image();
    wallImage = new Image();
}

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

}