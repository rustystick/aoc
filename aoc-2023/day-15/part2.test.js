import {solution} from "./part2.js"

const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

test('it works', () => {
    expect(solution(input)).toBe(145);
})
