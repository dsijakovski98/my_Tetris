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

    showNext(x, y) {
        for(let b of this.blocks) {
            b.show(x, y);
        }
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(20);
        text("NEXT", nextX + 30, nextY - 20);
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
                currentT = nextT;
                nextT = new Tetromino();
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
        if(this.canRotate()){
            this.rotateGrid();
            this.blocks = this.generateBlocks(this.grid);
        }
    }

    canRotate() {
        // generate a rotated copy:
        //  - grid
        let g = JSON.parse(JSON.stringify(this.grid));
        let N = g.length;
        g = rotateGridFunc(g, N);
        //  - blocks
        let blocks = this.generateBlocks(g);
        
        // if any of the blocks can still move, great
        // otherwise, cant rotate
        for(let b of blocks) {
            if(!b.canMoveDown(this.x, this.y)){
                return false;
            }
        }
        return true;
    }

    rotateGrid() { 
        let N = this.grid.length;
        this.grid = rotateGridFunc(this.grid, N); 
    }

}