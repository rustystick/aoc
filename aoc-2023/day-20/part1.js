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


    const queue = [];

    let [lo, hi] = [0, 0];

    for (let _ = 0; _ < 1000; _++) {
        // for button press;
        lo += 1;
        modules.get('broadcaster').targetNames.forEach(name => {
            queue.push(['broadcaster', modules.get(name), 'lo']);
        })

        while (queue.length) {
            const [from, module, pulse] = queue.shift();
            if (pulse === 'lo') {
                lo += 1;
            } else {
                hi += 1;
            }
            let toSend;

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

    return lo * hi;

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
        this.incoming = [];
        this.targetNames = [...targets];
        this.memory = new Map();
        this.state = false;
    }

}




const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
