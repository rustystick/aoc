const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');

function solution(input) {
    const [rules, orders] = input.split('\n\n');
    const smaller = new Map();
    let res = 0;
    for(const rule of rules.split('\n')) {
        const [small, big] = rule.split('|');
        if(!smaller.has(big)) {
            smaller.set(big, []);
        }
        smaller.get(big).push(small);
    }
    
    for(const order of orders.split('\n')) {
        const prev = [];
        let works = true;
        const lineItems = order.split(',');
        for(const item of lineItems) {
            if(prev.some(x => (smaller.get(x) ?? []).includes(item))) {
                works = false;
                break;
            }
            prev.push(item);
        }
        res += works ? parseInt(lineItems[lineItems.length >> 1]) : 0;
    }
    return res;
}

console.log(solution(input));
