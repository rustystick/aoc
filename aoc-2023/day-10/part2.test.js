import {solution} from "./part2.js"

const input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

test('it works', () => {
    expect(solution(input)).toBe(4);
})
