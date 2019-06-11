/*
Jumping on the Clouds by Shafaet
https://www.hackerrank.com/challenges/jumping-on-the-clouds/problem

Difficulty: Easy

Description:
Emma is playing a new mobile game that starts with consecutively numbered clouds. Some of the clouds are thunderheads and others are cumulus. She can jump on any cumulus cloud having a number that is equal to the number of the current cloud plus  or . She must avoid the thunderheads. Determine the minimum number of jumps it will take Emma to jump from her starting postion to the last cloud. It is always possible to win the game.

For each game, Emma will get an array of clouds numbered  if they are safe or  if they must be avoided.

Parameters:
c: an array of binary integers

Number of solution attempts: 13
*/

function jumpingOnClouds(c) {
    let jumpCount = 0;
    let takeJump = 0;
    c.forEach((ele, i, arr) => {
        if (arr[i + 1] < 1) {
            if (arr[i] > 0) {
                jumpCount++;
            } else {
                takeJump++;
            }
        } else {
            takeJump = 0;
        }
        if (takeJump === 2) {
            takeJump = 0;
        }
        jumpCount += takeJump;
    })
    return jumpCount;
}