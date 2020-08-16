let pieces;
let types;

let w, h;
let offsetDisplay = 5;
let scl = 20;

let score = 0;
let scoreP;

let currentT, nextT;
let board;

let nextX, nextY;

let gameOver = false;

function preload(){
  pieces = loadJSON("json/pieces.json", () => {
    types = Object.keys(pieces);
  });
}

function setup() {
  createCanvas(400, 400);
  w = width / scl;
  h = height / scl;

  nextX = (w - offsetDisplay + 1) * scl;
  nextY = (offsetDisplay - 1) * scl / 2;
  

  restartGame();
}

function draw() {
  background(220);

  drawGrid();

  currentT.show();
  currentT.update();

  showNextPiece();
  displayScore();

  board.show();

  if(keyIsDown(DOWN_ARROW)){
    if(currentT.canMoveDown()){
      increaseScore();
      currentT.moveDown();
    }
  }

  if(gameOver){
    noLoop();
    textAlign(CENTER, CENTER);
    textSize(64);
    text("GAME OVER", width/2, height/2);
    let t = "Press R to restart game";
    textSize(20);
    text(t, width/2, height/2 + 50);
  }
}

function drawGrid() {
  for(let i = offsetDisplay; i < w - offsetDisplay; i++) {
    for(let j = 0; j < h; j++) {
      push();
      strokeWeight(0.3);
      stroke(10);
      rect(i * scl, j * scl, scl, scl, scl / 4);
      pop();
    }
  }

  for(let i = w - offsetDisplay + 1; i < w - 1; i++) {
    for(let j = 2; j < offsetDisplay + 1; j++) {
      push();
      noStroke();
      noFill();
      rect(i * scl, j * scl, scl, scl);
      pop();
    }
  }


}

function showNextPiece() {
  if(nextT.type == "square") {
    nextT.showNext(nextX + 10, nextY);
  }
  else if(nextT.type == "t") {
    nextT.showNext(nextX, nextY - 15);
  }
  else {
    nextT.showNext(nextX, nextY);
  }
}

function displayScore() {
  let t = "SCORE\n" + score;
  let tx = (offsetDisplay * scl / 2) - 5;
  let ty = nextY - 5;
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(20);
  text(t, tx, ty);
  // text(score, tx + 50, ty);
}

function increaseScore() {
  score++;
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

  if(key === "r"){
    if(gameOver){
      restartGame();
      loop();
    }
  }
}

function restartGame() {
  currentT = new Tetromino();
  nextT = new Tetromino();
  board = new Board();
  score = 0;
  gameOver = false;
}

function rotateGridFunc(grid, N) {
  for(let i = 0; i < N / 2; i++) { 
    for(let j = i; j < N - i - 1; j++) { 
        let temp = grid[i][j]; 
        grid[i][j] = grid[N - 1 - j][i]; 
        grid[N - 1 - j][i] = grid[N - 1 - i][N - 1 - j]; 
        grid[N - 1 - i][N - 1 - j] = grid[j][N - 1 - i]; 
        grid[j][N - 1 - i] = temp; 
    } 
  }
  return grid;
}


