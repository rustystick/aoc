const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

function solve(input) {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let res = 0;
    for(const [_, left, right] of input.matchAll(regex)) {
        res += (left * right);
    }
    return res;
}

console.log(solve(input));
