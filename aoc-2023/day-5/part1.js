import * as fs from 'fs'
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let min = Infinity;
    let [seedLine, _, ...mapLines] = input.trim().split('\n');
    const mappers = createMappers(mapLines);

    seedLine.replace('seeds: ', '').split(' ').forEach(seed => {
        let val = parseInt(seed);
        mappers.forEach(mapper => {
            val = mapper.map(val);
        })
        min = Math.min(val, min);
    })

    return min;


}


/**
 * generate mappers
 * 
 *@param {string} mapLines
 *@return {Mapper[]} functionArray
 *
 */
function createMappers(mapLines) {
    const res = [];
    let curr;

    for(const line of mapLines) {
        if(line === '') {
            res.push(curr);
            continue;
        }
        if(isNaN(line[0])) {
            curr = new Mapper();
            continue;
        }
        curr.build(line);
    }
    return res;
}

class Mapper {
    ranges = [];
    build(string) {
        let range = [];
        string.split(' ').forEach(val => {range.push(parseInt(val))});
        this.ranges.push(range);
    }

    map(val) {
        for(const range of this.ranges) {
            const [min, max] = [range[1], range[1] + range[2]];
            if(val < min) continue;
            if(val > max) continue;
            return(range[0] + (val - range[1]));
        }
        return val;
        
    }
}


// const input = fs.readFileSync('./input.txt', 'utf8');
// 
// console.log(solution(input.trim()));

export {solution}
