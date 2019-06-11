/*
New Year Chaos by Shafaet
https://www.hackerrank.com/challenges/new-year-chaos/problem

Difficulty: Medium

Description:
It's New Year's Day and everyone's in line for the Wonderland rollercoaster ride! There are a number of people queued up, and each person wears a sticker indicating their initial position in the queue. Initial positions increment by 1 from 1 at the front of the line to n at the back.

Any person in the queue can bribe the person directly in front of them to swap positions. If two people swap positions, they still wear the same sticker denoting their original places in line. One person can bribe at most two others. For example, if n = 8 and Person 5 bribes Person 4, the queue will look like this: [1, 2, 3, 5, 4, 6, 7, 8].

Fascinated by this chaotic queue, you decide you must know the minimum number of bribes that took place to get the queue into its current state!

Paramters:
q: an array of integers

Number of solution attempts: 11 (6 until timeout, 5 until final)

*/

function minimumBribes(q) {
    let bribe = 0;
    //first solution, but ran into timeout errors
    // for (let y = q.length; y > 0; y--) {
    //     if (Math.abs(y - 1 - q.indexOf(y)) > 2) {
    //         console.log('Too chaotic');
    //         return;
    //         } else {
    //             if (q.indexOf(y) !== y - 1) {
    //                 bribe += Math.abs(y - 1 - q.indexOf(y));
    //                 q.concat(q.splice(q.indexOf(y), 1));
    //             }
    //         }
    //     }
    for (let x = 0; x < q.length - 1; x++) {
        if (Math.abs(q[x] - 1 - x) > 2) {
            console.log('Too chaotic');
            return;
        } else {
            if (q[x] > q[x + 1]) {
                let y = q[x];
                q[x] = q[x + 1];
                q[x + 1] = y;
                bribe++;
                x -= 2;
            }
        }
    }

    console.log(bribe);
    return;
}