import {solution} from "./part1.js"

const input = `467..114..
...*......
..35...633
.......#..
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

test('it works', () => {
    expect(solution(input)).toBe(4361);
})
