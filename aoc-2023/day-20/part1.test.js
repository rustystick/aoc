import {solution} from "./part1.js"

const input1 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const input2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

test('it works', () => {
    expect(solution(input1)).toBe(32000000);
    expect(solution(input2)).toBe(11687500);
})
