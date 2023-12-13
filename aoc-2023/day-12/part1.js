import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;
    const lines = input.trim().split('\n');
    for (const line of lines) {
        let [springMap, nums] = line.split(' ');
        nums = nums.split(',');
        total += count(springMap, nums);

    }
    return total;
}

// recursion because ez
function count(springMap, nums) {
    // base case 1: no more nums
    if (nums.length === 0) {
        // if still #, then is not valid;
        if (springMap.includes('#')) {
            return 0;
        }
        return 1;
    }
    // all done processing map 
    if (springMap.length === 0) {
        if (nums.length) {
            return 0;
        }
        return 1;
    }

    let total = 0;

    const nextGroupLength = parseInt(nums[0]);

    // recursive case;
    if ('.?'.includes(springMap[0])) {
        total += count(springMap.slice(1), nums);
    }

    if ('#?'.includes(springMap[0])) {
        if (nextGroupLength <= springMap.length 
            && springMap.slice(0,nextGroupLength).split('').every(x => x !== '.')
            && (nextGroupLength === springMap.length || springMap[nextGroupLength] !== '#')){
            total += count(springMap.slice(nextGroupLength + 1), nums.slice(1));
        } 
    }


    return total;
}



const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
