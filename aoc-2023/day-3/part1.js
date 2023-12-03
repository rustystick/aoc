import * as fs from 'fs'
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;
    
    const lines = input.split('\n');

    for(let i = 0; i < lines.length; i++) {
        
        if(!lines[i]) {
            continue;
        }
        let num = '';
        let isPartNum = false;
        const checkPartNum = (i, j) => {
            const dir = [[i, j + 1], [i, j - 1], [i - 1, j + 1], [i - 1, j - 1], [i - 1, j], [i + 1, j], [i + 1, j + 1], [i + 1, j - 1]];
            dir.forEach(([iDir, jDir]) => {
                const line = lines[iDir];
                if(line) {
                    const char = line[jDir];
                    if(char && isNaN(char) && char !== '.') {
                        isPartNum = true;
                    }

                }
            })

        }
        const chars = lines[i].split('');
        for(let j = 0; j < chars.length; j++) {
            if(isNaN(chars[j])) {
                if(isNaN(chars[j - 1])) continue;
                if(isPartNum) {
                    isPartNum = false;
                    total += parseInt(num);
                };
                num = '';
                continue;
            }
            num += chars[j];
            checkPartNum(i, j);
            if(j + 1 === chars.length && isPartNum) {
                total += parseInt(num);
            }
        }

    }

    return total; 
}

export {solution}

const a = fs.readFileSync('./input.txt','utf8');
console.log(solution(a));

