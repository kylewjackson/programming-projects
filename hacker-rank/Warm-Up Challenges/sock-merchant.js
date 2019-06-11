/* 
Sock Merchant by Shafaet
https://www.hackerrank.com/challenges/sock-merchant/problem

Difficulty: Easy

Description:
John works at a clothing store. He has a large pile of socks that he must pair by color for sale. Given an array of integers representing the color of each sock, determine how many pairs of socks with matching colors there are.

Parameters:
n: the number of socks in the pile
ar: the colors of each sock

Number of solution attempts: 1
*/


function sockMerchant(n, ar) {
    let pairs = 0;
    let sortedArr = ar.sort(function(a, b){return a - b});
    let skip = 0;
    for (let x = 0; x < sortedArr.length; x++) {
        if (sortedArr[x] !== sortedArr[x+1]) {
            let color = sortedArr.slice(x - skip, x + 1);
            pairs += Math.floor(color.length / 2);
            skip = 0;
        } else {
            skip += 1;
        }
    };
    return pairs;
}