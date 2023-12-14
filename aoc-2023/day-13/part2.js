import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;

    const blocks = input.split('\n\n').map(n => n.split('\n').map(x => x.split('')));

    blocks.forEach((block, idx) => {
        
        let horizontal = findMid(block);
        let vertical = findMid(transpose(block));

        total += vertical ?? horizontal * 100;

    })

    return total;
}


/**
 * transposes a matrix
 *
 * @param {string[][]} matrix - input matrix
 * @returns {string[][]} transposed matrix;
 */
function transpose(matrix) {
    return matrix[0].map((_, c) => matrix.map((_,r) => matrix[r][c]));
}


function findMid(matrix) {
    let joint = matrix.map(x => x.join(''));

    let diffByOne = false;

    const ifDiffByOne = (s1, s2) => {
        let diffCount = 0;
        for(let i = 0; i < s1.length; i++) {
            if(s1[i] !== s2[i]) {
                diffCount += 1;
            }
            if(diffCount > 1) {
                return false;
            }
        }
        diffByOne = true;
        return true;
    }
    

    for(let i = 0; i < joint.length; i++) {
        let [l, r] = [i, joint.length - 1];
        while(l < r) {
            if(joint[l] === joint[r] || ifDiffByOne(joint[l], joint[r])) {
                if(l === r - 1 && diffByOne) {
                    return l + 1;
                }
                l += 1;
                r -= 1;
                continue;
            }
            diffByOne = false;
            break;
        }
    }
    
    for(let i = joint.length - 1; i >= 0; i--) {
        let [l, r] = [0, i];
        while(l < r) {
            if(joint[l] === joint[r] || ifDiffByOne(joint[l], joint[r])) {
                if(l === r - 1 && diffByOne) {
                    return l + 1;
                }
                l += 1;
                r -= 1;
                continue;
            }
            diffByOne = false;
            break;
        }
    }

    return undefined;
}

const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 2 is: ${solution(input.trim())}`);

export { solution }
