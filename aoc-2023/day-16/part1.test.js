import {solution} from "./part1.js"

const input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

test('it works', () => {
    expect(solution(input)).toBe(46);
})
