import * as fs from 'fs'


function toNum(char) {
    const a = {
        'T' : 10,
        'J' : 1,
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

    let joker = 0;
    for(const char of chars ) {
        if(char === 'J') {
            joker += 1;
            continue;
        }
        map.set(char, map.has(char) ? map.get(char) + 1 : 1);
    }
    // to account for joker, just add joker value to the highest value
    let currMax = [0, 0];
    for(const [key, value] of map.entries()) {
        if(value > currMax[1]) {
            currMax = [key, value];
        }
    }
    map.set(currMax[0], currMax[1] + joker);

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
console.log(hands);

    return hands.reduce((acc, curr, idx) => {
        return acc + (curr[1] * (idx + 1));
    }, 0)

}


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 2 is: ${solution(input.trim())}`);

export {solution}
