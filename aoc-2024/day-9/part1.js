const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trim();

function solve(input) {
    const resArr = [];
    const spaces = [];

    let id = 0;
    for(const [i, times] of input.split('').entries()) {
        if(i % 2 === 0) {
            for(let i = 0; i < parseInt(times); i++) {
                resArr.push(id);
            }
            id += 1;
        } else {
            for(let i = 0; i < parseInt(times); i++) {
                spaces.push(resArr.length);
                resArr.push(-1);
            }
        }
    }
    for(let space of spaces) {
        if(space >= resArr.length) break;
        while(resArr.at(-1) === -1) {
            resArr.pop();
        }
        resArr[space] = resArr.pop();
    }

    return resArr.reduce((acc, curr, i) => acc + (curr * i), 0);
}

console.log(solve(input));
