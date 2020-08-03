class Board {
    constructor() {
        this.grid = [];
        for(let i = 0; i < h; i++) {
            this.grid[i] = [];
            for(let j = 0; j < w; j++) {
                this.grid[i][j] = 0;
            }
        }
        this.blocks = [];
    }

    add(tetromino) {

        for(let b of tetromino.blocks) {
            let j = (tetromino.x + b.x) / scl;
            let i = (tetromino.y + b.y) / scl;
            this.grid[i][j] = 1;
            let newBlock = {
                block: b,
                posX: tetromino.x,
                posY: tetromino.y
            };
            this.blocks.push(newBlock);
        }
    }

    show() {
        for(let b of this.blocks) {
            b.block.show(b.posX, b.posY);
        }
    }

    update(lines) {
        for(let i = lines.length - 1; i >= 0; i--) {
            let row = lines[i];
            console.log("Updating for row: " + row);
            for(let i = 0; i < this.blocks.length; i++) {
                let b = this.blocks[i];
                let pos = (b.posY + b.block.y) / scl;
                if(pos <= row){
                    b.block.moveDown();
                }
            }
        }
    }

    checkLine() {
        let lines = [];
        for(let i = 0; i < h; i++) {
            let line = true;
            let row = i;
            for(let j = 0; j < w; j++) {
                if(this.grid[i][j] == 0) {
                    line = false;
                    break;
                }
            }

            if(line){
                console.log("LINE CLEARED: " + row + " row.");
                lines.push(row);
            }
        }
        if(lines.length > 0) {
            
            for(let i = this.blocks.length - 1; i >= 0; i--) {
                let b = this.blocks[i];
                let pos = (b.posY + b.block.y) / scl;
                if(lines.includes(pos)){
                    this.blocks.splice(i, 1);
                }
            }
            for(let r of lines) {
                for(let i = 0; i < w; i++) {
                    this.grid[r][i] = 0;
                }
            }
            this.updateGrid(lines);
            this.update(lines);

            increaseScore();
        }
    }

    updateGrid(lines) {
        for(let row of lines) {

            let currentRow = row;
            while(currentRow > 0) {
                for(let i = 0; i < w; i++) {
                    this.grid[currentRow][i] = this.grid[currentRow - 1][i];
                }
                currentRow--;
            }
        }
    }

    checkEnd() {
        if(this.grid[0].includes(1)){
            gameOver = true;
        }
    }
}