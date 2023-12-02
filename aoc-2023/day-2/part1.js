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
    const max = {'red' : 12, 'green': 13, blue: 14};
    for(const line of input.split('\n')) {
        if(!line) {
            continue;
        }
        // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        let [gameNum, game] = line.split(':');
        gameNum = gameNum.replace('Game', '').trim();
        let possible = true;
        for(const round of game.split(';')){
            if(!possible) {
                break;
            }
            for(const hand of round.split(',')) {
                if(!possible) {
                    break;
                }
                for(const color of colors) {
                    if(hand.indexOf(color) === -1) {
                        continue;
                    }
                    const count = parseInt(hand.replace(color, '').trim());
                    if(count > max[color]) {
                        possible = false;
                        break;
                    }
                }
            }

        }

        total += possible ? parseInt(gameNum) : 0;
    };


    return total; 
}

export {solution}

const a = fs.readFileSync('./input.txt','utf8');
console.log(solution(a));

