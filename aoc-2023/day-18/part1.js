import * as fs from 'fs'



const shoeLace = (points) => {
    // shoelace formula for area
    // 1 / 2 * SUM (x_i (y_pre - y_next));
    let area = 0;
    for (let [index, [x, _]] of points.entries()) {
        const prev_i = index - 1 >= 0 ? index - 1 : points.length - 1;
        const next_i = index + 1 < points.length ? index + 1 : 0;
        area += x * (points[prev_i][1] - points[next_i][1]);
    }
    return  Math.abs(area) / 2;
}


/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    const lines = input.split('\n');

    const dirMap = {
        'R': [0, 1],
        'L': [0, -1],
        'U': [-1, 0],
        'D': [1, 0]
    }

    const points = [[0, 0]];

    let totalLength = 0;

    for (const line of lines) {
        let [dir, length, _] = line.split(' ');
        length = parseInt(length);

        const [r, c] = points[points.length - 1];

        const [dr, dc] = [dirMap[dir][0] * length, dirMap[dir][1] * length];

        const [nr, nc] = [r + dr, c + dc];

        totalLength += Math.abs(dr + dc);

        points.push([nr, nc]);
    }

    // shoeLace to get area; but the boundary would be ~half unit too small due to where we dig
    // so we need to subtract the interior and then add the perimeter area back (which is 1 * perimeter)
    let A = shoeLace(points);
    // pick's theorem to find the interior area 
    // A = i (b/2) - 1;
    // need interior points 
    // A = i + (b/2) - 1
    // i = (A + 1) - (b/2)
    let i = A + 1 - (totalLength / 2);


    return i + totalLength;
}





const input = fs.readFileSync('./input.txt', 'utf8');

console.log(`the solution 1 is: ${solution(input.trim())}`);

export { solution }
