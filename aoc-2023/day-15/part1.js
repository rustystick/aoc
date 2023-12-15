import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;

    input.trim().split(',').forEach(x => {
        total += hash(x);
    })
    return total;
}

function hash(input) {
    let curr = 0;
    for (let i = 0; i < input.length; i++) {
        curr += input.charCodeAt(i);
        curr *= 17;
        curr %= 256;
    }
    return curr;
}



const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
