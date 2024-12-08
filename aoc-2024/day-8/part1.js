const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trim();

function solve(input) {
    const map = new Map();
    const grid = input.split('\n').map(r => r.split(''));

    const makeFreq = ([r1, c1], [r2, c2]) => {
        return [[r1 - (r2 - r1), c1 - (c2 - c1)], [r2 + (r2 - r1), c2 + (c2 - c1)]];
    }

    let nodes = [];


    for(const [i, line] of grid.entries()) {
        for(const [j, item] of line.entries()) {
            if('.'.includes(item)) {
                continue;
            }
            if(!map.has(item)) {
                map.set(item, []);
            }
            for(const pt of map.get(item)) {
                nodes.push(...makeFreq(pt, [i, j]));
            }
            map.get(item).push([i, j]);
        }
    }
    
    return new Set(nodes.filter(([r, c]) => {
        return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length
    }).map(([r, c]) => `${r}|${c}`)).size
}

console.log(solve(input));
