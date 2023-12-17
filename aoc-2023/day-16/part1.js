import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const map = input.split('\n').map(x => x.split(''));

    const queue = [[0, -1, 0, 1]];
    const seen = new Set();

    while(queue.length) {
        let [r, c, dr, dc] = queue.shift();
        
        r += dr;
        c += dc;

        const key = [r, c, dr, dc].join('|');

        if(r < 0 || c < 0 || r >= map.length || c >= map[0].length || seen.has(key)) {
            // out of bound or seen;
            continue;
        }

        const char = map[r][c];
        seen.add(key);

        if(char === '.' || (dr === 0 && char === '-') || (dc === 0 && char === '|')) {
            queue.push([r, c, dr, dc]);
        }else if(char === '/') {
            // flip direction
            [dr, dc] = [-dc, -dr];
            queue.push([r, c, dr, dc]);
        } else if(char === '\\') {
            [dr, dc] = [dc, dr];
            queue.push([r, c, dr, dc]);
        } else if(char === '|') {
            queue.push([r, c, 1, 0]);
            queue.push([r, c, -1, 0]);
        } else if(char === '-') {
            queue.push([r, c, 0, 1]);
            queue.push([r, c, 0, -1]);
        }
    }

    const consolidatedSet = new Set();
    for(const item of seen) {
        const [r, c, _, __] = item.split('|');
        consolidatedSet.add([r, c].join('|'));
    }
    return consolidatedSet.size;
}


const input = fs.readFileSync('./input.txt','utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
