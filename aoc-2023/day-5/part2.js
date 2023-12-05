// this is shitty... takes 20mins to run; optimize later
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

    const arr = parseAndMergeIntervals(seedLine);

    for(const range of arr) {
        let [seed, max] = range;
        console.log(seed)
        while(seed <= max) {
            let val = seed;
                mappers.forEach(mapper => {
                    val = mapper.map(val);
                })
            min = Math.min(val, min);
            seed += 1;
        }
    }
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
            const [min, max] = [range[1], range[1] + range[2] - 1];
            if(val < min) continue;
            if(val > max) continue;
            return(range[0] + (val - range[1]));
        }
        return val;
        
    }
}


function parseAndMergeIntervals(input) {
    const intervals = [];
    input.replace('seeds: ', '').split(' ').forEach((item, i, arr) => {
        if(i % 2 === 0) {
            intervals.push([parseInt(item), parseInt(item) + parseInt(arr[i + 1])])
        }
    })

    intervals.sort((a, b) => a[0] - b[0]);
    const res = [intervals[0]];

    for(let i = 1; i < intervals.length; i++) {
        const prevHigh = res[res.length - 1][1];
        const interval = intervals[i];
        if(interval[0] <= prevHigh ) {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], interval[1]);
        } else {
            res.push(interval);
        }
    }

    return res;
}


const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`solution : ${solution(input.trim())}`);

export {solution}
