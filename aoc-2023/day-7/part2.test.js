import {solution} from "./part2.js"

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

test('it works', () => {
    expect(solution(input)).toBe(5905);
})
