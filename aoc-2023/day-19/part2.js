import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const [block1, _] = input.split('\n\n');

    const workflows = new Map();

    for (let line of block1.split('\n')) {
        line = line.slice(0, line.length - 1);
        const [name, ins] = line.split('{');
        const ops = ins.split(',');
        const fallBack = ops.pop();
        workflows.set(name, [ops, fallBack]);
    }


    const inputRanges = "xmas".split("").reduce((acc, curr) => { acc.set(curr,[1, 4000]); return acc }, new Map());

    function findCombos(ranges, key = "in") {
        if (key === 'R') {
            return 0;
        }
        if (key === 'A') {
            return Array.from(ranges.values()).reduce((acc, [from, to]) => acc * (to - from + 1), 1);
        }
        const [opStrings, fallBack] = workflows.get(key);

        let total = 0;

        let [toProcess, toNext] = [undefined, undefined];
        for (const opString of opStrings) {
            const [name, op] = [opString[0], opString[1]];
            let [val, nextKey] = opString.slice(2, opString.length).split(':');
            val = parseInt(val);
            let [low, high] = ranges.get(name);
            // split range into to process and next;
            if (op === '>') {
                toProcess = [val + 1, high];
                toNext = [low, val];
            } else if (op === '<') {
                toProcess = [low, val - 1];
                toNext = [val, high];
            }
            // only process valid cases
            if(toProcess[0] <= toProcess[1]) {
                const rangesCopy = new Map(ranges);
                rangesCopy.set(name, toProcess);
                total += findCombos(rangesCopy, nextKey);
            }
            if(toNext[0] <= toNext[1]) {
                ranges = new Map(ranges);
                ranges.set(name, toNext);
            }
        }
        // if there is still values didn't fit into last filter
        if(toNext[0] <= toNext[1]) {
            total += findCombos(ranges, fallBack);
        }

        return total;
    }

    return findCombos(inputRanges);

}




const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 2 is: ${solution(input.trim())}`);

export { solution }
