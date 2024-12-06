const fs = require('fs');

const test = fs.readFileSync('./test.txt', 'utf8');
const input = fs.readFileSync('./input.txt', 'utf8');

function solve(input) {
    const grid = input.trim().split('\n').map(x => x.split(''));

    let pos;
    let res = 1;
    let currDir = 0;

    const dirs = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ]

    for(let [i, row] of grid.entries()) {
        for(let [j, val] of row.entries()) {
            if(val === '^') {
                pos = [i, j];
                grid[i][j] = 'X';
            }
        }
    }

    while(true) {
        const [r, c] = pos;
        const [dr, dc] = dirs[currDir];
        const [nr, nc] = [r + dr, c + dc];
        if(nr < 0 || nc < 0 || nr === grid.length || nc === grid[0].length) {
            return res;
        }
        const val = grid[nr][nc];
        if(val === '#') {
            currDir = (currDir + 1) % 4;
            continue;
        } 
        if(val === '.') {
            grid[nr][nc] = 'X';
            res += 1;
        }
        pos = [nr, nc];
    }
}

// console.log(solve(test))

console.log(solve(input));
