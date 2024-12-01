const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

function solve(textInput) {
    const arr2 = [];
    const map = new Map();
    for(const line of textInput.split('\n')) {
        const [item1, item2] = line.split('   ');
        map.set(item1, 0);
        arr2.push(item2);
    }

    for(const item of arr2) {
        if(map.has(item)) {
            map.set(item, map.get(item) + 1);
        }
    }


    let res = 0;
    for(const [key, val] of map.entries()) {
        res += key * val;
    }
    return res;
}

console.log(solve(input));


