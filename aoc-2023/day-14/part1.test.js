import {solution} from "./part1.js"

const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

test('it works', () => {
    expect(solution(input)).toBe(136);
})
