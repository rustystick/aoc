const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');


function solve(input) {
    let res = 0;
    const grid = input.split('\n').map(x => x.split(''));

    const count = (r, c) => {
        const item = ['M', 'S'];
        
        const lt = grid[r - 1][c - 1];
        const lb = grid[r + 1][c - 1];
        const rt = grid[r - 1][c + 1];
        const rb = grid[r + 1][c + 1];
        if(lt === rb || !item.includes(lt) || !item.includes(rb)) {
            return 0;
        }
        if(lb === rt || !item.includes(rt) || !item.includes(lb)) {
            return 0;
        }
        return 1;
    }

    for (const [r, row] of grid.entries()) {
        for (const [c, val] of row.entries()) {
            if (val !== 'A' || r === 0 || r === grid.length - 1 || c === 0 || c === grid[0].length - 1) {
                continue;
            }
            res += count(r, c);
        }
    }
    return res;
}

console.log(solve(input));
