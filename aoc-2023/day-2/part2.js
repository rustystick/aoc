import * as fs from 'fs'
/**
 * solve the issue
 *
 * @param {string} input - string input
 * @returns {number} return values
 */
function solution(input) {
    let total = 0;
    const colors = ['red','green', 'blue'];
    for(const line of input.split('\n')) {
        if(!line) {
            continue;
        }
        // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        let [gameNum, game] = line.split(':');
        gameNum = gameNum.replace('Game', '').trim();
        const min = {'red': 0, 'green': 0, 'blue': 0};
        for(const round of game.split(';')){
            for(const hand of round.split(',')) {
                for(const color of colors) {
                    if(hand.indexOf(color) === -1) {
                        continue;
                    }
                    const count = parseInt(hand.replace(color, '').trim());
                    min[color] = Math.max(min[color], count);
                }
            }
        }
        let powerSet = 1;
        for(const val of Object.values(min)) {
            powerSet *= parseInt(val);
        }
        total += powerSet;

    };


    return total; 
}

export {solution}

const a = fs.readFileSync('./input.txt','utf8');
console.log(solution(a));

