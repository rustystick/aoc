import * as fs from 'fs'
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;

    let lines = input.split('\n');

    const getGearRatio = (i, j) => {
        const directions = [[i, j + 1], [i, j - 1], [i + 1, j], [i - 1, j], [i + 1, j + 1], [i - 1, j + 1], [i + 1, j - 1], [i - 1, j - 1]];
        const visited = new Set();
        const value = [];
        for(const [dirI, dirJ] of directions) {
            const line = lines[dirI];
            if(!line || isNaN(line[dirJ]) || visited.has([dirI, dirJ].join('|'))) {
                continue;
            }
            let charIdx = dirJ;
            let num = '';
            while(!isNaN(line[charIdx - 1])) {
                charIdx --;
            }
            while(!isNaN(line[charIdx])) {
                visited.add([dirI, charIdx].join('|'));
                num += line[charIdx];
                charIdx ++;
            }
            value.push(parseInt(num));
        }
        return value.length > 1 ? value[0] * value[1] : 0;
    }

    for(let i = 0; i < lines.length; i++) {
        if(!lines[i]) continue;
        for(let j = 0; j < lines[i].length; j++) {
            if(lines[i][j] === "*") {
                total += getGearRatio(i, j);
            }
        }
    }

    return total; 
}

export {solution}

const a = fs.readFileSync('./input.txt','utf8');
console.log(solution(a));

