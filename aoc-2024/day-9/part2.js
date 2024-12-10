const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trim();

function solve(input) {
    let spaces = [];

    const idSpotMap = new Map();

    let block = 0;
    let id = 0;
    for(const [i, times] of input.split('').map(x => parseInt(x)).entries()) {
        let space = times;
        if(i % 2 === 0) {
            if(space === 0) throw new Error('shount be zero');
            idSpotMap.set(id, [block, space])
            id += 1;
        } else {
            if(space > 0) {
                spaces.push([block, space]);
            }
        }
        block += space;
    }
    
    while(id > 0) {
        id -= 1;
        const [pos, size] = idSpotMap.get(id);
        for(const [i, [blankLoc, blankSize]] of spaces.entries()) {
            if(blankLoc >= pos) {
                spaces = spaces.slice(0, pos);
                break;
            }
            if(size <= blankSize) {
                idSpotMap.set(id, [blankLoc, size])
                if(size === blankSize) {
                    spaces = spaces.filter((_, idx) => idx !== i);
                } else {
                    spaces[i] = [blankLoc + size, blankSize - size];
                }
                break;
            }
        }
    }

    let res = 0;

    for(let [id, [start, size]] of idSpotMap.entries()) {
        for(let i = start; i < start + size; i++) {
            res += id * i;
        }
    }
    return res;

}

console.log(solve(input));
