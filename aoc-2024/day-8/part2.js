const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trim();

function solve(input) {
    const map = new Map();
    const grid = input.split('\n').map(r => r.split(''));

    const makeFreq = ([r1, c1], [r2, c2]) => {
        let [dr, dc] = [r2 - r1, c2 - c1];

        let [r, c] = [r1, c1];
        
        while(true) {
            const [nr, nc] = [r - dr, c - dc];
            if(nr < 0 || nc < 0 || nr >= grid.length || nc >= grid[0].length) {
                break;
            }
            [r, c] = [nr, nc];
        }
        const res = [];

        while(r >= 0 && c >= 0 && r < grid.length && c < grid[0].length) {
            res.push([r, c]);
            r += dr;
            c += dc;
        }
        return res;
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
    
    return new Set(nodes.map(([r, c]) => `${r}|${c}`)).size
}

console.log(solve(input));
