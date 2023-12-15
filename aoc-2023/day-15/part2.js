import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;

    const arr = Array.from({length: 256}, () => []);

    input.trim().split(',').forEach(x => {
        if(x.includes('-')) {
            // remove value;
            const name = x.slice(0, x.indexOf('-'));
            let hashVal = hash(name);
            arr[hashVal] = arr[hashVal].filter(x => x.name !== name);
        } else {
            const [name, val] = x.split('=');
            let hashVal = hash(name);
            let found = arr[hashVal].find(x => x.name === name);
            if(found) {
                found.val = parseInt(val);
            } else {
                arr[hashVal].push(new Lense(name, val));
            }
        }
    })

    arr.forEach((box, boxIdx) => {
        if(box && box.length > 0) {
            box.forEach(({val}, lenseIdx) => {
                total += (boxIdx + 1) * (lenseIdx + 1) * val;
            })
        }
    })
    return total;
}

class Lense {
    name;
    val;
    constructor(name, val) {
        this.name = name;
        this.val = parseInt(val)
    }
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

console.log(`the solution 2 is: ${solution(input.trim())}`);

export { solution }
