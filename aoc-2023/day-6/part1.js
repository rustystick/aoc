import * as fs from 'fs'
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const [timeStr, distStr] = input.trim().split('\n');

    let res = 1;

    const times = timeStr.replace(/Time:\s+/, '').split(/\s+/);
    const dists = distStr.replace(/Distance:\s+/,'').split(/\s+/);


    // 1 * holdTIme * (totalTime - holdTime) - dist > 0

    for(let i = 0; i < times.length; i++) {
        const [time, dist] = [parseInt(times[i]), parseInt(dists[i])];
        let [left, right] = [0, time];
        while(right * (time - right) <= dist) {
            right --;
        }
        while(left * (time - left) <= dist) {
            left ++
        }
        res *= (right - left + 1);
    }


    return res;
}


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution is: ${solution(input.trim())}`);

export {solution}
