import * as fs from 'fs'

/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const grid = input.split('\n').map(row => row.split(''));
    let total = 0;


    const set = new Set();
    const map = new Map();

    let toCycle = grid;

    let period = 0;
    let cycleStart;

    while (true) {
        // north
        toCycle = cycleOnce(toCycle);
        const str = toCycle.map(x => x.join('')).join('');
        period += 1;
        if (set.has(str)) {
            cycleStart = map.get(str);
            break;
        }
        set.add(str);
        map.set(str, period);
    }


    const timesToCycle = (1000000000 - cycleStart) % (period - cycleStart) + cycleStart

    toCycle = input.split('\n').map(row => row.split(''));

    for(let i = 0; i < timesToCycle; i++) {
        toCycle = cycleOnce(toCycle)
    }


    transpose(toCycle).forEach((row, _) => {
        row.forEach((x, i) => {
            if (x === 'O') {
                total += row.length - i;
            }

        })

    })

    // two pointer
    return total;
}

function cycleOnce(grid) {
    let toCycle = grid;
    toCycle = transpose(tiltWest(transpose(toCycle)));
    // west
    toCycle = tiltWest(toCycle);
    // south
    toCycle = transpose(tiltWest(transpose(toCycle.reverse().map(r => r.reverse()))));
    // east
    return tiltWest(toCycle).reverse().map(x => x.reverse());

}

function tiltWest(grid) {
    return grid.map(row => {
        let [slow, fast] = [0, 1];
        while (fast < row.length && slow < row.length) {
            while (row[slow] !== '.' && slow < row.length) {
                slow += 1;
                fast = slow + 1;
            }
            if (row[fast] === '#') {
                slow = fast + 1;
                fast = slow + 1;
            } else if (row[fast] === 'O') {
                [row[slow], row[fast]] = [row[fast], row[slow]];
                slow = slow + 1;
                fast = fast + 1;
            } else {
                fast += 1;
            }
        }
        return row;
    })
}


/**
 * transposes a matrix
 *
 * @param {string[][]} matrix - input matrix
 * @returns {string[][]} transposed matrix;
 */
function transpose(matrix) {
    return matrix[0].map((_, c) => matrix.map((_, r) => matrix[r][c]));
}

const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 2 is: ${solution(input.trim())}`);

export { solution }
