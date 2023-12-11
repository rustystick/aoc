import {solution} from "./part1.js"

const input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const input2 = `.....
.S-7.
.|.|.
.L-J.
.....`;

test('it works', () => {
    expect(solution(input)).toBe(8);
    expect(solution(input2)).toBe(4);
})
