import * as fs from 'fs'


/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const [block1, block2] = input.split('\n\n');

    const workflows = new Map();

    for (let line of block1.split('\n')) {
        line = line.slice(0, line.length - 1);
        const [name, ins] = line.split('{');
        const ops = ins.split(',');
        const fallBack = ops.pop();
        workflows.set(name, [ops, fallBack]);
    }

    const evaluator = {
        '>' : (a, b)=>a > b,
        '<' : (a, b)=> a < b
    }

    function accept(input, key='in') {
        if(key === 'A') {
            return true;
        }
        if(key === 'R') {
            return false;
        }
        const [ops, fallBack] = workflows.get(key);
        for(let op of ops) {
            const name = op[0];
            const opCode = op[1];
            const [val, nextKey] = op.slice('2').split(':');
            if(evaluator[opCode](input.get(name), parseInt(val))) {
                return accept(input, nextKey);
            }
        }
        return accept(input, fallBack);
    }

            let total = 0;

    for (let line of block2.split('\n')) {
        const input = line.slice(1, line.length - 1).split(',')
            .reduce((acc, curr) => {
                const [key, value] = curr.split('=');
                acc.set(key, parseInt(value));
                return acc;
            }, new Map());
        if(accept(input)) {
            total += [...input.values()].reduce((acc, curr)=>acc+curr, 0);
        }

    }

    return total;
}




const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
