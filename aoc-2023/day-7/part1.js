import * as fs from 'fs'


function toNum(char) {
    const a = {
        'T' : 10,
        'J' : 11,
        'Q' : 12,
        'K' : 13,
        'A' : 14
    }
    if(isNaN(char)) {
        return a[char];
    }
    return parseInt(char);
}

function toKind(chars) {
    // 0 / 100 / 200 / 300 / 400 / 500 / 600
    const map = new Map();
    for(const char of chars ) {
        map.set(char, map.has(char) ? map.get(char) + 1 : 1);
    }
    let three;
    let two;
    for(const value of map.values()) {
        if(value === 5) {
            return 600;
        } else if(value === 4) {
            return 500;
        } else if(value === 3) {
            if(two) {
                return 400; 
            }
            three = true;
        } else if(value === 2) {
            if(three) {
                return 400;
            }
            if(two) {
                return 200;
            }
            two = true;
        }
    }
    if(three) {
        return 300;
    } else if(two) {
        return 100;
    }
    return 0;
}

    
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const hands = input.split('\n').map(line => {
        let [hand, points] = line.split(' ');
        return [hand, parseInt(points), toKind(hand)];
    });

    hands.sort((a, b) => {
        if(a[2] !== b[2]) {
            return a[2] - b[2];
        // 0 / 100 / 200 / 300 / 400 / 500 / 600
        } 
        for(let i = 0; i < a[0].length; i++) {
            if(toNum(a[0][i]) === toNum(b[0][i])) continue;
            return toNum(a[0][i]) - toNum(b[0][i]);
        }

    })

    return hands.reduce((acc, curr, idx) => {
        return acc + (curr[1] * (idx + 1));
    }, 0)

}


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export {solution}
