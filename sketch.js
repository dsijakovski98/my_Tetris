let pieces;
let types;

let w, h;
let scl = 20;

let score = 0;
let scoreP;
// let canMoveDownFlag = true;

let currentT;
let board;

let gameOver = false;

function preload(){
  pieces = loadJSON("json/pieces.json", () => {
    types = Object.keys(pieces);
  });
}

function setup() {
  createCanvas(200, 400);
  w = width / scl;
  h = height / scl;

  currentT = new Tetromino();
  board = new Board();

  scoreP = createP("Score: " + score);
  scoreP.style("font-size: large;");
  scoreP.style("font-weight: bold;");
}

function draw() {
  background(220);

  drawGrid();

  currentT.show();
  currentT.update();

  board.show();

  if(keyIsDown(DOWN_ARROW)){
    if(currentT.canMoveDown()){
      increaseScore();
      currentT.moveDown();
    }
  }

  if(gameOver){
    noLoop();
    createP("GAME OVER");
  }
}

function drawGrid() {
  for(let i = 0; i < w; i++) {
    for(let j = 0; j < h; j++) {
      push();
      strokeWeight(0.3);
      stroke(10);
      rect(i * scl, j * scl, scl, scl, scl / 4);
      pop();
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if(currentT.canMove(-1)) {
      currentT.move(-1);
    }
  } else if (keyCode === RIGHT_ARROW) {
    if(currentT.canMove(1)) {
      currentT.move(1);
    }
  } else if (keyCode === UP_ARROW) {
    currentT.rotate();
  }
}

function increaseScore() {
  score++;
  scoreP.html("Score: " + score);
}
