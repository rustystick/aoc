import {solution} from "./part2.js"

const input = `Time:      7  15   30
Distance:  9  40  200`;

test('it works', () => {
    expect(solution(input)).toBe(71503);
})
