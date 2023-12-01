import {solution} from "./part1.js"

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

test('it works', () => {
    expect(solution(input)).toBe(142);
})
