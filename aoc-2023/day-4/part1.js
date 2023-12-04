import * as fs from 'fs'
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;

    for (const line of input.split('\n')) {
        const [_, round] = line.split(': ');
        let [winningNos, myNos] = round.split(' | ');
        winningNos = winningNos.split(' ');
        let points;
        myNos.split(' ').forEach(no => {
           if(no !== '' && winningNos.indexOf(no)!==-1) {
               points = points === undefined ? 1 : points * 2;
           } 
        });
        total += points ?? 0;

    }

    return total; 
}

export {solution}

const a = fs.readFileSync('./input.txt','utf8');
console.log(solution(a.trim()));

