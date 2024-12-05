const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

function solution(input) {
    const [rules, orders] = input.split('\n\n');
    const smaller = new Map();
    let res = 0;
    for (const rule of rules.split('\n')) {
        const [small, big] = rule.split('|');
        if (!smaller.has(big)) {
            smaller.set(big, []);
        }
        smaller.get(big).push(small);
    }

    for (const order of orders.split('\n')) {
        const prev = [];
        const lineItems = order.split(',');
        for (const item of lineItems) {
            if (prev.some(x => (smaller.get(x) ?? []).includes(item))) {
                lineItems.sort((a, b) => {
                    if ((smaller.get(a) ?? []).includes(b)) {
                        return 1;
                    } else if ((smaller.get(b) ?? []).includes(a)) {
                        return -1;
                    }
                    return 0;
                })
                res += parseInt(lineItems[lineItems.length >> 1]);
                break;
            }
            prev.push(item);
        }
    }

    return res;
}

console.log(solution(input));
