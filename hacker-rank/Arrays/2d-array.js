//Date Completed: May 2019

/*
2D Array - DS by Shafaet
https://www.hackerrank.com/challenges/2d-array/problem

Difficulty: Easy

Description:
Given a 6x6 2D Array, r, We define an hourglass in A to be a subset of values with indices falling in this pattern in arr's graphical representation: [hour-glass shape]

There are 16 hourglasses in arr, and an hourglass sum is the sum of an hourglass' values. Calculate the hourglass sum for every hourglass in arr, then print the maximum hourglass sum.

Parameters:
arr: an array of integers

Number of solution attempts: 3
*/

function hourglassSum(arr) {
    const hourGlassArr = [];
    const yAxis = arr.length;
    const xAxis = arr[0].length;

    for (let y = 0; y < yAxis; y++) {
        if (arr[y + 2]) {
            for (let x = 0; x < xAxis; x++) {
                if (typeof arr[y][x - 1] === 'number' && typeof arr[y][x + 1] === 'number') {
                    let currentHG = {
                        top: 0,
                        middle: 0,
                        bottom: 0
                    }
                    currentHG.top += arr[y][x - 1] + arr[y][x] + arr[y][x + 1];
                    currentHG.middle += arr[y + 1][x];
                    currentHG.bottom += arr[y + 2][x - 1] + arr[y + 2][x] + arr[y + 2][x + 1]
                    hourGlassArr.push(currentHG.top + currentHG.middle + currentHG.bottom);
                }
            }
        }
    }

    return Math.max(...hourGlassArr);

}