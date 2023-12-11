import { assert } from 'console';
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
    const visited = new Set();

    const coordToString = (r, c) => {
        return [r, c].join('|');
    }
    
    visited.add(coordToString(start[0], start[1]));

    let possible_S = ['-', '|', '7', 'F', 'L', 'J']

    const isInbound = (r, c) => {
        return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
    }

    const isValid = ([dr, dc], curr, val) => {
        if (dr === 1 && dc === 0 && ['S', '|', '7', 'F'].includes(curr) && ['|', 'J', 'L'].includes(val)) {
            // this will collapse on the first iteration
            if (curr === 'S') possible_S = possible_S.filter(x => ['|', '7', 'F'].includes(x));
            return true;
        }
        if (dr === -1 && dc === 0 && ['S', '|', 'J', 'L'].includes(curr) && ['|', '7', 'F'].includes(val)) {
            if (curr === 'S') possible_S = possible_S.filter(x => ['|', 'J', 'L'].includes(x));
            return true;
        }
        if (dr === 0 && dc === 1 && ['S', '-', 'L', 'F'].includes(curr) && ['-', 'J', '7'].includes(val)) {
            if (curr === 'S') possible_S = possible_S.filter(x => ['-', 'L', 'F'].includes(x));
            return true;
        }
        if (dr === 0 && dc === -1 && ['S', '-', 'J', '7'].includes(curr) && ['-', 'L', 'F'].includes(val)) {
            if (curr === 'S') possible_S = possible_S.filter(x => ['-', '7', 'J'].includes(x));
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

    // replace S with its char
    grid[start[0]][start[1]] = possible_S[0];

    grid.forEach((row, ri) => {
        row.forEach((_, ci) => {
            if (!visited.has(coordToString(ri, ci))) {
                grid[ri][ci] = '.';
            }
        })
    })

    const inSet = new Set();

    // going horizontally
    for (const [ri, row] of grid.entries()) {
        let [up, inside] = [undefined, false];
        for (const [ci, val] of row.entries()) {
            if (val === '|') {
                inside = !inside;
            } else if (['L', 'F'].includes(val)) { 
                up = val === 'L'
            } else if (['7', 'J'].includes(val)) {
                // L -> 7  || F -> J
                // if it's a valid loop above would always be true
                if ((up && val === '7') || (!up && val === 'J')) {
                    inside = !inside;
                }
                // for assertions if we care to 
                up = undefined;
            }
            if (inside && val === '.') {
                inSet.add(coordToString(ri, ci));
            }
        }
    }


    return inSet.size;
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

console.log(`the solution 2 is: ${solution(input.trim())}`);

export { solution }
