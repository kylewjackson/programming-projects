/*
Arrays: Left Rotation by Heraldo
https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem

Difficulty: Easy

Description:
A left rotation operation on an array shifts each of the array's elements 1 unit to the left. For example, if 2 left rotations are performed on array [1, 2, 3, 4, 5], then the array would become [3, 4, 5, 1, 2].

Given an array a of n integers and a number, d, perform d left rotations on the array. Return the updated array to be printed as a single line of space-separated integers.

Parameters:
An array of integers a.
An integer d, the number of rotations.

Number of solution attempts: 1
*/

function rotLeft(a, d) {
    return a.splice(d).concat(a);
}