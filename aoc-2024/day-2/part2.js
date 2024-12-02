const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

/**
    * @param {string} input
    *
    */
function solve(input) {
    const levels = input.split('\n');
    let res = 0;
    for(const level of levels) {
        const items = level.split(' ');
        res += isValid(items) ? 1 : 0;
    }
    return res;
}

function isValid(items) {
    const loop = (arr) => {
        let inc = arr[1] - arr[0] > 0;
        for(let i = 1; i < arr.length; i++) {
            const diff = arr[i] - arr[i - 1];
            if(Math.abs(diff) > 3 || diff === 0 || inc !== (diff > 0)) {
                return false;
            }
        }
        return true;
    }

    if(loop(items)) return true;
    for(let i = 0; i < items.length; i++) {
        if(loop(items.filter((_, j) => j !== i))) {
            return true;
        }
    }
    return false;
}



console.log(solve(input));
