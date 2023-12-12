import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;
    const grid = input.trim().split('\n').map(row => row.split(''));

    const getEmptyRows = (gridToCheck) => {
        const empties = [];
        gridToCheck.forEach((row, idx) => {
            if(row.every(x=> x === '.')) {
                empties.push(idx);
            }
        })
        return empties;
    }

    const [emptyRows, emptyCols] = [grid, transpose(grid)]
            .map(gridToCheck => getEmptyRows(gridToCheck));

    console.log(emptyRows.length)
    console.log(emptyCols.length)

    const galaxies = [];

    grid.forEach((row, ri) => row.forEach((val, ci) => {if(val === '#') {
        galaxies.push([ri, ci]);
    }}))

    while(galaxies.length > 1) {
        const [currR, currC] = galaxies.pop();
        for(const [nextR, nextC] of galaxies) {
            total += Math.abs(nextR - currR) + Math.abs(nextC - currC);
            emptyRows.forEach(emptyRow => {if(inRangeOf([currR, nextR], emptyRow)) {
                total += 1;
            }});
            emptyCols.forEach(emptyCol => {if(inRangeOf([currC, nextC], emptyCol)){
                total += 1;
            }});
        }
    }

    return total;
}

function inRangeOf([from, to], num) {
    if(from > to) {
        [from, to] = [to, from];
    }
    return num > from && num < to;
}

function transpose(matrix) {
  return matrix.reduce((prev, next) => next.map((_, i) =>
    (prev[i] || []).concat(next[i])
  ), []);
}



const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
