/*
Repeated String by tunyash
https://www.hackerrank.com/challenges/repeated-string/problem

Difficulty: Easy

Description
Lilah has a string, s, of lowercase English letters that she repeated infinitely many times.

Given an integer, n, find and print the number of letter a's in the first n letters of Lilah's infinite string.

Parameters:
s: a string to repeat
n: the number of characters to consider

Number of solution attempts: 7
*/

function repeatedString(s, n) {
    let numA = s.split('').filter(x => x === 'a').length;
    if (Number.isInteger(n / s.length)) {
        return n / s.length * numA;
    } else {
        let extra = n - (Math.floor(n / s.length) * s.length);
        let plus = 0;
        s.split('').forEach((ele, i, a) => { 
            if (i < extra && ele === 'a') {
                plus++;
                console.log(plus);
            } 
        })
        return Math.floor(n / s.length) * numA + plus;
    }
}