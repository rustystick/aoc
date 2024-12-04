const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');


function solve(input) {
    let res = 0;
    const grid = input.split('\n').map(x => x.split(''));

    const count = (r, c) => {
        let count = 0;
        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1], [-1, 1], [1, -1]];
        const target = ['M', 'A', 'S'];
        for (const [dr, dc] of dirs) {
            let i = 0;
            let [nr, nc] = [r, c];
            while (i < target.length) {
                nr += dr;
                nc += dc;
                if (nr < 0 || nc < 0 || nr === grid.length || nc === grid[0].length || grid[nr][nc] !== target[i]) {
                    break;
                }
                i += 1;
            }
            if (i === target.length) {
                count += 1;
            }
        }

        return count;
    }

    for (const [r, row] of grid.entries()) {
        for (const [c, val] of row.entries()) {
            if (val !== 'X') {
                continue;
            }
            res += count(r, c);
        }
    }
    return res;
}

console.log(solve(input));
