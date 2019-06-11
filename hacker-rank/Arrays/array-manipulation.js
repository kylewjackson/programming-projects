/*
Array Mainpulation by amititkgp
https://www.hackerrank.com/challenges/crush/problem

Difficulty: Hard

Description:
Starting with a 1-indexed array of zeros and a list of operations, for each operation add a value to each of the array element between two given indices, inclusive. Once all operations have been performed, return the maximum value in your array.

Parameters:
n - the number of elements in your array
queries - a two dimensional array of queries where each queries[i] contains three integers, a, b, and k.

Number of solution attempts: 8 (1 until timeout, 7 until final)
*/

function arrayManipulation(n, queries) {
    const arr = Array(n).fill(0);
    queries.forEach(x => { //learned prefix sum array for this
        let a = x[0] - 1;
        let b = x[1];
        let k = x[2];
        arr[a] += k;
        if (b < arr.length) {
            arr[b] -= k;
        }
    })

    let biggest = 0;

    arr.forEach((e, i, a) => {
        if (i > 0) {
            arr[i] += arr[i - 1];
        }
        if (biggest < arr[i]) {
            biggest = arr[i];
        }
    })

    return biggest;

    //timeout solution
    // let biggest = 0;
    // queries.forEach(x => {
    //     let y = x[0] - 1;
    //     while (y < x[1]) {
    //         arr[y] += x[2];
    //         if (arr[y] > biggest) {
    //             biggest = arr[y];
    //         }
    //         y++;
    //     }
    // })
    // return biggest;
}