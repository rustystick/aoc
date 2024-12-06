const fs = require('fs');

const test = fs.readFileSync('./test.txt', 'utf8');
const input = fs.readFileSync('./input.txt', 'utf8');

function isLoop(grid) {

    let pos;
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
                grid[i][j] = 0;
            }
        }
    }

    while(true) {
        const [r, c] = pos;
        const [dr, dc] = dirs[currDir];
        const [nr, nc] = [r + dr, c + dc];
        if(nr < 0 || nc < 0 || nr === grid.length || nc === grid[0].length) {
            return 0;
        }
        const val = grid[nr][nc];
        if(val === '#') {
            currDir = (currDir + 1) % 4;
            continue;
        } 
        if(val === '.') {
            grid[nr][nc] = currDir;
        }
        if(val === currDir) {
            return 1;
        }
        pos = [nr, nc];
    }
}

function solve(input) {
    const grid = input.trim().split('\n').map(x => x.split(''));
    let res = 0;
    for(const [i, row] of grid.entries()) {
        for(const [j, val] of row.entries()) {
            if(val === '.') {
                const newGrid = grid.map((line, r) => line.map((v, c) => r === i && c ===j ? '#' : v));
                res += isLoop(newGrid);
            }
        }
    }
    return res;
}

//console.log(solve(test))

console.log(solve(input));
