/*
Minimum Swaps 2 by rishi_07
https://www.hackerrank.com/challenges/minimum-swaps-2/problem

Difficulty: Medium

Description:
You are given an unordered array consisting of consecutive integers [1, 2, 3, ..., n] without any duplicates. You are allowed to swap any two elements. You need to find the minimum number of swaps required to sort the array in ascending order.

Parameters:
arr: an unordered array of integers

Number of solution attempts: 10 (1 until timeout, 9 until final)
*/

function minimumSwaps(arr) {
    let swap = 0;
    const arrMap = {};
    arr.forEach((ele, i, a) => {
        arrMap[ele] = i;
    })
    for (let x = 0; x < arr.length - 1; x++) {
        if (arr[x] !== x + 1) {
            let pos = arrMap[x + 1];
            arr[pos] = arr[x];
            arr[x] = x + 1;
            arrMap[arr[pos]] = pos;
            arrMap[x + 1] = x;
            swap++;
        }
        //original code which had timeout errors
        // if (arr[x] !== x + 1) {
        //     let i = 0;
        //     while (i >= 0) {
        //         if (arr[i] === x + 1) {
        //             arr[i] = arr[x];
        //             arr[x] = x + 1;
        //             swap++;
        //             i = -1;
        //         } else {
        //             i++;
        //         }
        //     }
        // }
    }
    return swap;
}