import {solution} from "./part2.js"

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
    expect(solution(input)).toBe(51);
})
