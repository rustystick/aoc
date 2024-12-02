const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

function solve(input) {
    const levels = input.split('\n');
    let res = 0;
    for(const level of levels) {
        const items = level.split(' ');
        let inc = (items[1] - items[0]) > 0;
        let safe = true;
        for(let i = 0; i < items.length - 1; i++) {
            const diff = items[i + 1] - items[i];
            if(diff === 0) {
                safe = false;
            } else if(diff > 0 && !inc) {
                safe = false;
            } else if(diff < 0 && inc) {
                safe = false;
            } else if(Math.abs(diff) > 3) {
                safe = false;
            }
        }
        res += safe ? 1 : 0;
    }
    return res;
}


console.log(solve(input));
