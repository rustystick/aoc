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
        if(line === '') {
            continue;
        }
        let digits = '';
        line.split('').forEach(char => {
            if(!isNaN(char)) {
                digits += char;
            }
        })
        const numStr = digits[0] + digits[digits.length - 1];
        total += parseInt(numStr);
    }

    return total
}

export {solution}

const a = fs.readFileSync('./input.txt','utf8');
console.log(solution(a));

