import {solution} from "./part2.js"

const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

test('it works', () => {
    expect(solution(input)).toBe(281);
})
