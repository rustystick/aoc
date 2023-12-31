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

    let target = 'ZZZ';
    let head = makeTree(mapStr);

    let [count, index] = [0, 0];
    while(true) {
        const direction = path[index];
        head = head[direction];
        count += 1;
        if(head.value === target) {
            return count;
        }
        index = index < path.length - 1 ? index + 1 : 0;
    }
}


/**
 * make Tree
 *
 * @param {string} inputMap
 * @returns {TreeNode} head
 */
function makeTree(inputMap) {
    const treeMap = new Map();
    let head;
    for(const line of inputMap.split('\n')) {
        let [nodeValue, childrenVal] = line.replace(/[()\s]/g, '').split('=');
        if(!treeMap.has(nodeValue)) {
            treeMap.set(nodeValue, new TreeNode(nodeValue));
        }
        const curr = treeMap.get(nodeValue);
        if(nodeValue === 'AAA') {
            head = curr;
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
    return head;
}


class TreeNode {
    constructor(value) {
        this.value = value;
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


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export {solution}

