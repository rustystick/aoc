import * as fs from 'fs'


const numMap = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;
    const lines = input.split('\n');

    for(let line of lines) {
        let digits = '';
        let tempWord = '';
        for(const char of line.split('')) {
            if(!isNaN(char)) {
                digits += char;
                tempWord = '';
                continue;
            }
            tempWord += char;
            for(const [numWord, numStr] of Object.entries(numMap)) {
                if(tempWord.indexOf(numWord) === -1) continue;
                tempWord = char;
                digits += numStr;
            }

        }
        
        const numStr = digits[0] + digits[digits.length - 1];
        total += isNaN(numStr) ? 0 : parseInt(numStr);
    }

    return total
}

export {solution}

const a = fs.readFileSync('./input.txt','utf8');
console.log(solution(a));


