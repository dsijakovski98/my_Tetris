class Tetromino {

    constructor() {
        let index = int(random(0, types.length - 1));
        this.type = types[index];

        let t = pieces[this.type];
        let col = t.color;
        this.col = color(col[0], col[1], col[2]);
        this.x = (w/2) * scl - scl;
        this.y = 0;

        this.grid = t.blocks;
        this.blocks = this.generateBlocks(this.grid);
    }

    generateBlocks(grid) {
        let blocks = [];
        for(let j = 0; j < grid.length; j++) {
            let row = grid[j];
            for(let i = 0; i < row.length; i++) {
                if(row[i] == 1) {
                    let x = (i * scl);
                    let y = (j * scl);
                    blocks.push(new Block(x, y, this.col));
                }
            }
        }
        return blocks;
    }

    show() {
        for(let b of this.blocks) {
            b.show(this.x, this.y);
        }
    }

    update() {
        if(this.canMoveDown() && frameCount % 60 == 0) {
            this.moveDown();
        }
    }

    canMoveDown() {
        for(let i = this.blocks.length - 1; i >= 0; i--) {
            let b = this.blocks[i];
            if(!b.canMoveDown(this.x, this.y)) {
                board.add(this);
                board.checkLine();
                board.checkEnd();
                // console.table(board.grid);
                currentT = new Tetromino();
                return false;
            }
        }
        return true;
    }

    moveDown() {
        this.y += scl;
    }

    canMove(dir) {
        for(let i = this.blocks.length - 1; i >= 0; i--) {
            let b = this.blocks[i];
            if(!b.canMove(this.x, this.y, dir)) {
                return false;
            }
        }
        return true;
    }

    move(dir) {
        this.x += (scl * dir);
    }

    rotate() {
        this.rotateGrid();
        this.blocks = this.generateBlocks(this.grid);
    }

    rotateGrid() { 
        let N = this.grid.length;
        for(let i = 0; i < N / 2; i++) { 
            for(let j = i; j < N - i - 1; j++) { 
                let temp = this.grid[i][j]; 
                this.grid[i][j] = this.grid[N - 1 - j][i]; 
                this.grid[N - 1 - j][i] = this.grid[N - 1 - i][N - 1 - j]; 
                this.grid[N - 1 - i][N - 1 - j] = this.grid[j][N - 1 - i]; 
                this.grid[j][N - 1 - i] = temp; 
            } 
        } 
    }

}

//     constructor() {
//         let index = int(random(0, types.length - 1));
//         this.type = types[index];

//         let tetromino = pieces[this.type];
//         let col = tetromino.color;
        
//         this.col = color(col[0], col[1], col[2]);
//         this.blocks = new Matrix(tetromino.rows, tetromino.cols);
//         this.blocks.populate(tetromino.blocks);



//         this.rotated = false;
//         this.stop = false;
//     }

//     show() {
//         push();
//         translate(this.x, this.y);
        
//         for(let i = 0; i < this.blocks.rows; i++) {
//             for(let j = 0; j < this.blocks.cols; j++) {
//                 if(this.blocks.data[i][j]){
//                     let block = this.blocks.data[i][j];
//                     if(block == 1){
//                         fill(this.col);
//                         rect(j * scl, i * scl, scl, scl);
//                     }
//                 }
//             }
//         }

//         pop();
//     }

//     canMoveDown() {
        
//     }

//     canMove(dir) {
//         let blocks = [];
//         for(let i = 0; i < this.blocks.cols; i++) {
//             for(let j = 0; j < this.blocks.rows; j++) {
//                 let block = this.blocks.data[j][i];
//                 if(block == 1) {
//                     let fi = (this.x + scl * i) / scl;
//                     let fj = (this.y + scl * j) / scl;
//                     blocks.push({i: fi, j: fj});
//                 }
//             }
//         }

//         let flag = true;
//         for(let i = blocks.length - 1; i >= 0; i--) {
//             let b = blocks[i];
//             if(b.i + dir >= w || b.i + dir < 0) {
//                 flag = false;
//                 break;
//             }
//             else {
//                 let spot = fallen.data[b.j][b.i + dir];
//                 if(spot == 1) {
//                     flag = false;
//                     break;
//                 }
//             }
//         }
//         return flag;
//     }

//     addToFallen() {
//         for(let i = 0; i < this.blocks.cols; i++) {
//             for(let j = 0; j < this.blocks.rows; j++) {
//                 let block = this.blocks.data[j][i];
//                 if(block == 1) {
//                     let fi = (this.x + scl * i) / scl;
//                     let fj = (this.y + scl * j) / scl;
//                     fallen.data[fj][fi] = block;
//                 }
//             }
//         }
//     }

//     update() {
//         if(frameCount % 30 == 0){
//             if(!this.stop){
//                 if(!this.canMoveDown()) {
//                     tetrominos.push(this);
//                     this.addToFallen();
//                     currentT = new Tetromino();
//                     this.stop = true;

//                     checkLine();
//                 }
//             }
//         }

//         if(frameCount % 60 == 0) {
//             if(!this.stop) {
//                 this.y += scl;
//             }
//         }
//     }

//     move(dir) {
//         if(this.canMove(dir)){
//             this.x += (scl * dir);
//         }
//     }

//     pushDown() {
//         if(!this.stop) {
//             this.y += scl;
//         }
//     }

//     rotate() {
//         if(this.type != "square") {
//             if(/line/.test(this.type)){

//                 this.rotated = !this.rotated;
//                 this.type = "line-" + this.rotated.toString();
//                 this.blocks.populate(pieces[this.type].blocks);
//             }
//             else{
//                 this.blocks.rotate();
//             }
//         }
//     }

// }