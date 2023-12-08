import * as fs from 'fs'


    
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const [path, mapStr] = input.split('\n\n');

    let head = makeTree(mapStr);

    
    return 3;

}


/**
 * make Tree
 *
 * @param {string} inputMap
 * @returns {TreeNode} head
 */
function makeTree(inputMap) {
    const map = new Map();
    let head;
    for(const line of inputMap.split('\n')) {
        let [nodeValue, childrenVal] = line.split(' = ');
        if(!map.has(nodeValue)) {
            map.set(nodeValue, new TreeNode(nodeValue));
        }
    }

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
