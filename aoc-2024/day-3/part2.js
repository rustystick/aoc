const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

function solve(input) {
    let on = true;
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don\'t\(\)/g;
    let res = 0;
    for(const [instruction, left, right] of input.matchAll(regex)) {
        if(instruction === 'do()') {
            on = true;
        } else if(instruction === "don't()") {
            on = false;
        } else {
            if(on) {
                res += (left * right);
            }
        }
    }
    return res;
}

console.log(solve(input));
