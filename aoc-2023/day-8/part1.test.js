import {solution} from "./part1.js"

const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

test('it works', () => {
    expect(solution(input)).toBe(6);
})
