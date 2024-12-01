const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

function solve(textInput) {
    const arr1 = [];
    const arr2 = [];
    for(const line of textInput.split('\n')) {
        const [item1, item2] = line.split('   ');
        arr1.push(item1);
        arr2.push(item2);
    }
    const sortFun = (a, b) => a - b

    arr1.sort(sortFun)
    arr2.sort(sortFun)

    let res = 0;
    for(const [i, item] of arr1.entries()) {
        res += Math.abs(item - arr2[i]);
    }
    return res;
}

console.log(solve(input));


