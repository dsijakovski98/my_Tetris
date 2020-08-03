class Block {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
    }

    show(x, y) {
        push();
        translate(x, y);
        fill(this.col);
        rect(this.x, this.y, scl, scl, scl / 4);
        pop();
    }

    canMoveDown(x, y) {
        let myX = (x + this.x) / scl;
        let myY = (y + this.y) / scl;
        
        if(myY + 1 >= h || board.grid[myY + 1][myX] == 1) {
            return false;
        }
        return true; 
    }
     
    canMove(x, y, dir) {
        let myX = (x + this.x) / scl;
        let myY = (y + this.y) / scl;

        if(myX + dir >= w || myX + dir < 0 || board.grid[myY][myX + dir] == 1) {
            return false;
        }
        return true;
    }

    moveDown() {
        this.y += scl;
    }
}