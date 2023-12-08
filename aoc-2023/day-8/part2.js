import * as fs from 'fs'


// todo: union find;
    
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const [path, mapStr] = input.split('\n\n');

    let heads = makeTree(mapStr);

    let [count, index] = [0, 0];

    let steps = [];
    while(heads.length) {
        count += 1;
        heads = heads.map(head => {
            let direction = path[index];
            return head[direction];
        }).filter(head => {
            if(head.onZ) {
                steps.push(count);
            }
            return !head.onZ;
        })
        index = index < path.length - 1 ? index + 1 : 0;
    }
    // need to find the least common multiple of the steps each ghost takes
    // as the the path they take is circular
    return steps.reduce((acc, curr) => lcm(acc, curr),1);
}


/**
 * make Tree
 *
 * @param {string} inputMap
 * @returns {TreeNode[]} head
 */
function makeTree(inputMap) {
    const treeMap = new Map();
    let heads = new Set();
    for(const line of inputMap.split('\n')) {
        let [nodeValue, childrenVal] = line.replace(/[()\s]/g, '').split('=');
        if(!treeMap.has(nodeValue)) {
            treeMap.set(nodeValue, new TreeNode(nodeValue));
        }
        const curr = treeMap.get(nodeValue);
        if(nodeValue.endsWith('A')) {
            heads.add(curr);
        }
        const [leftVal, rightVal] = childrenVal.split(',');
        if(!treeMap.has(leftVal)) {
            treeMap.set(leftVal, new TreeNode(leftVal));
        }
        if(!treeMap.has(rightVal)) {
            treeMap.set(rightVal, new TreeNode(rightVal));
        }
        [curr.L, curr.R] = [treeMap.get(leftVal), treeMap.get(rightVal)];
    }
    return Array.from(heads);
}


class TreeNode {
    constructor(value) {
        this.value = value;
    }

    get onZ() {
        return this.value.endsWith('Z');
    }

    /**
     * value
     * @type {string}
     */
    value;
    /**
     * left
     * @type {TreeNode}
     */
    L;

    /**
     * right
     * @type {TreeNode}
     */
    R;
}


function lcm(a, b) {
    let [large, small] = [Math.max(a, b), Math.min(a, b)];
    let res = large;
    while(res % small !== 0) {
        res += large
    }
    return res;
}


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 2 is: ${solution(input.trim())}`);

export {solution}

