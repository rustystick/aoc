import * as fs from 'fs'
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    
    const lines = input.split('\n');

    const copies = Array(lines.length).fill(1);

    for(const [i, line] of lines.entries()) {
        let acc = 0;
        if(!line) {
            continue;
        }
        const [_, round] = line.split(': ');
        const [winningNos, myNos] = round.split(' | ');
        const winningNoArray = winningNos.split(' ');
        for(const myNo of myNos.split(' ')) {
            if(myNo && winningNoArray.indexOf(myNo) !== -1) {
                acc += 1;
                copies[i + acc] += 1 * copies[i];
            }
        }
    }

    return copies.reduce((acc, item) => acc+=item, 0); 
}

export {solution}

const a = fs.readFileSync('./input.txt','utf8');
console.log(solution(a.trim()));

