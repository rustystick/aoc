import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const transposedGrid = transpose(input.split('\n').map(row => row.split('')));
    let total = 0;
    // two pointer
    for(const row of transposedGrid) {
        let[slow, fast] = [0, 1];
        while(fast < row.length && slow < row .length) {
            while(row[slow] !== '.' && slow < row.length) {
                slow += 1;
                fast = slow + 1;
            }
            if(row[fast] === '#') {
                slow = fast + 1;
                fast = slow + 1;
            } else if(row[fast] === 'O') {
                [row[slow], row[fast]] = [row[fast], row[slow]];
                slow = slow + 1;
                fast = fast + 1;
            } else {
                fast += 1;
            }
        }
        row.forEach((x, i) => {
            if(x === 'O') {
                total += row.length - i;
            }
        })
    }
    return total;
}


/**
 * transposes a matrix
 *
 * @param {string[][]} matrix - input matrix
 * @returns {string[][]} transposed matrix;
 */
function transpose(matrix) {
    return matrix[0].map((_, c) => matrix.map((_,r) => matrix[r][c]));
}

const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
