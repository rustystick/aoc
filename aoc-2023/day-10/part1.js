import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const grid = input.split('\n').map(item => item.split(''));

    const start = findS(grid);
    const queue = [start];
    const visited = new Set(start);

    const coordToString = (r, c) => {
        return [r, c].join('|');
    }

    const isInbound = (r, c) => {
        return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
    }

    const isValid = ([dr, dc], curr, val) => {
        if (dr === 1 && dc === 0 && ['S', '|', '7', 'F'].includes(curr) && ['|', 'J', 'L'].includes(val)) {
            return true;
        }
        if (dr === -1 && dc === 0 && ['S', '|', 'J', 'L'].includes(curr) && ['|', '7', 'F'].includes(val)) {
            return true;
        }
        if (dr === 0 && dc === 1 && ['S', '-', 'L', 'F'].includes(curr) && ['-', 'J', '7'].includes(val)) {
            return true;
        }
        if (dr === 0 && dc === -1 && ['S', '-', 'J', '7'].includes(curr) && ['-', 'L', 'F'].includes(val)) {
            return true
        }
        return false
    }

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];


    while (queue.length) {
        const [currR, currC] = queue.shift();
        directions.forEach(([dr, dc]) => {
            const [nr, nc] = [currR + dr, currC + dc];
            if (!visited.has([nr, nc].join('|')) && isInbound(nr, nc) && isValid([dr, dc], grid[currR][currC], grid[nr][nc])) {
                queue.push([nr, nc]);
                visited.add(coordToString(nr, nc));
            }
        })
    }

    return visited.size >> 1;
}


/**
 * find starting pos
 *
 * @param {string[][]} input - input 2D array
 * @returns {[number, number]} coordinate of S
 */
function findS(grid) {
    for (const [rowIdx, row] of grid.entries()) {
        for (const [colIdx, val] of row.entries()) {
            ;
            if (val === 'S') {
                return [rowIdx, colIdx];
            }
        }
    }
}


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
