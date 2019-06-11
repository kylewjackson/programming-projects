//Date Completed: May 2019

/*
Hash Tables: Ransom Note by saikiran9194
https://www.hackerrank.com/challenges/ctci-ransom-note/problem

Difficulty: Easy

Description: Harold is a kidnapper who wrote a ransom note, but now he is worried it will be traced back to him through his handwriting. He found a magazine and wants to know if he can cut out whole words from it and use them to create an untraceable replica of his ransom note. The words in his note are case-sensitive and he must use only whole words available in the magazine. He cannot use substrings or concatenation to create the words he needs.

Given the words in the magazine and the words in the ransom note, print Yes if he can replicate his ransom note exactly using whole words from the magazine; otherwise, print No.

Parameters:
magazine: an array of strings, each a word in the magazine
note: an array of strings, each a word in the ransom note

Number of solution attempts: 1
*/

function checkMagazine(magazine, note) {
    let noMatch = false;
    let n = 0;
    while (!noMatch && n < note.length) {
        let match = false;
        let m = 0;
        while (m < magazine.length && !match) {
            if (magazine[m] === note[n]) {
                match = true;
                magazine[m] = 0;
            }
            m++;
        }
        if (!match) {
            noMatch = true;
        } else {
            n++;
        }
    }
    if (noMatch) {
        console.log('No');
    } else {
        console.log('Yes');
    }
}