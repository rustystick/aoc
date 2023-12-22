import * as fs from 'fs'


/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    /**
     * @type {Map<string, Module}
     */
    const modules = new Map();
    for (let line of input.trim().split('\n')) {
        const [from, to] = line.split(' -> ');
        if (from === 'broadcaster') {
            modules.set(from, new Module(from, from, to.split(', ')));
        } else {
            let [type, name] = [from[0], from.slice(1)];
            modules.set(name, new Module(name, type, to.split(', ')));
        }
    }

    modules.set('output', new Module('output','output',[]));


    for (let module of modules.values()) {
        for (const targetName of module.targetNames) {
            const targetModule = modules.get(targetName);
            if (targetModule && targetModule.type === '&') {
                targetModule.memory.set(module.name, 'lo');
            }
        }
    }

    const inputsToRx = [];
    for(const module of modules.values()) {
        if(module.targetNames?.includes('rx')) {
            inputsToRx.push(module);
        }
    }

    // the input to 'rx' is a '&' means all input into that needs to be 'hi'
    if(inputsToRx.length > 1) {
        throw new Error('wow, we have more than 1 input');
    }

    const inputToRx = inputsToRx[0];
    const seen = Array.from(inputToRx.memory.keys()).reduce((acc, curr)=> {acc.set(curr, false); return acc},new Map());
    const cycleLength = new Map();

    const queue = [];
    for (let i = 1; i < Infinity; i++) {
        modules.get('broadcaster').targetNames.forEach(name => {
            queue.push(['broadcaster', modules.get(name), 'lo']);
        })

        while (queue.length) {
            const [from, module, pulse] = queue.shift();

            let toSend;

            if(module?.name === inputToRx.name && pulse === 'hi' & !seen.get(from)) {
                seen.set(from, true);
                cycleLength.set(from, i);
            }

            if(Array.from(seen.values()).every(x=>x)) {
                return lcm(Array.from(cycleLength.values()));
            }

            if (module?.type === '%') {
                if (pulse === 'lo') {
                    if (module.state) {
                        toSend = 'lo'
                    } else {
                        toSend = 'hi';
                    }
                    module.state = !module.state;
                }

            } else if (module?.type === '&') {
                module.memory.set(from, pulse);
                toSend = Array.from(module.memory.values()).every(x => x === 'hi') ? 'lo' : 'hi';
            } else {
                // this case is 'output'
                // no op;
            }

            if (toSend) {
                module.targetNames.forEach(targetName => {
                    queue.push([module.name, modules.get(targetName), toSend]);
                })
            }
        }
    }

}

class Module {
    /**
     * constructor
     *
     * @param {string} name - name of the module
     * @param {'%' | '&' | 'broadcaster' | 'output'} type - type of the module
     * @param {string[]} targets - array of target names
     */
    constructor(name, type, targets) {
        this.name = name;
        this.type = type;
        this.targetNames = [...targets];
        this.memory = new Map();
        this.state = false;
    }

}


function lcm(arr) {
    const gcd = (x, y) => !y ? x : gcd(y, x % y);
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return arr.reduce((acc, curr)=>_lcm(acc, curr));
}


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 2 is: ${solution(input.trim())}`);

export { solution }
