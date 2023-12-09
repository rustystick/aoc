import * as fs from 'fs'


    
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;
    const lines = input.split('\n');
    for(const line of lines) {
        total += findNext(line.split(' ').map(a => parseInt(a)));
    }
    return total;
}

function findNext(line) {
    if(line.every(x => x === 0)) {
        return 0;
    }
    const nextLine = line.slice(1).map((curr, idx) => curr - line[idx]);

    return line[line.length - 1] + findNext(nextLine);
}


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export {solution}
