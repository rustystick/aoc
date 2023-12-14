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

    blocks.forEach(block => {
        
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

    for(let i = 0; i < joint.length; i++) {
        if(joint[i] !== joint[joint.length - 1]) {
            continue;
        }
        let [l, r] = [i, joint.length - 1];
        while(l < r) {
            if(joint[l] === joint[r]) {
                if(l === r - 1) {
                    return l + 1;
                }
                l += 1;
                r -= 1;
                continue;
            }
            break;
        }
    }
    
    for(let i = joint.length - 1; i >= 0; i--) {
        if(joint[i] !== joint[0]) {
            continue;
        }
        let [l, r] = [0, i];
        while(l < r) {
            if(joint[l] === joint[r]) {
                if(l === r - 1) {
                    return l + 1;
                }
                l += 1;
                r -= 1;
                continue;
            }
            break;
        }
    }

    return undefined;
}

const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
