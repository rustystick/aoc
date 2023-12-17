import * as fs from 'fs'

import { MinPriorityQueue } from '@datastructures-js/priority-queue';

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    // dijkstra's shortest path
    const grid = input.trim().split('\n').map(x => x.split('').map(x => parseInt(x)));

    const queue = new MinPriorityQueue(x => x[0]);

    const seen = new Set();

    // initial
    queue.enqueue([0, 0, 0, 0, 0, 0]);

    function inBound([r, c]) {
        return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
    }

    while (queue.size()) {
        let [heat, r, c, dr, dc, stepSoFar] = queue.dequeue();


        if (r === grid.length - 1 && c === grid[0].length - 1) {
            return heat;
        }

        const key = [r, c, dr, dc, stepSoFar].join('|');
        if (seen.has(key)) {
            continue;
        }

        seen.add(key);

        if (stepSoFar < 3 && !(dr === 0 && dc === 0)) {
            let [nr, nc] = [r + dr, c + dc];
            if (inBound([nr, nc])) {
                queue.enqueue([heat + grid[nr][nc], nr, nc, dr, dc, stepSoFar + 1]);
            }

        }

        for (const [ndr, ndc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
            if (!((ndr === dr && ndc === dc) || (ndr === -dr && ndc === -dc))) {
                let [nnr, nnc] = [r + ndr, c + ndc];
                if (inBound([nnr, nnc])) {
                    queue.enqueue([grid[nnr][nnc] + heat, nnr, nnc, ndr, ndc, 1]);
                }
            }
        }
    }

}



const input = fs.readFileSync('./input.txt', 'utf8');

 console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
