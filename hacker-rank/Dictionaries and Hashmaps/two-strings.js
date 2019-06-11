/*
Two Strings by zxqfd555
https://www.hackerrank.com/challenges/two-strings/problem

Difficulty: Easy

Description:
Given two strings, determine if they share a common substring. A substring may be as small as one character.

Parameters:
s1, s2: two strings to analyze .

Number of solution attempts: 4 (2 until timeout, 2 until final)
*/

function twoStrings(s1, s2) {
    //it's crazy to think this much code can still be more efficient than code with fewer lines
    let alphaMax = false;
    function cleanUp(str) { //create object with each letter present in the string, plus the length of said object
        let objset = {};
        let split = str.split('');
        let x = 0;
        while (x < split.length && Object.keys(objset).length < 26) {
            if (!objset.hasOwnProperty(split[x])) {
                objset[split[x]] = true; //put current letter into object
            }
            x++;
        }
        if (Object.keys(objset).length >= 26) {
            alphaMax = true;
        }
        let result = {
            ob: objset,
            len: Object.keys(objset).length
        }
        return result;
    }

    const str1 = cleanUp(s1);
    const str2 = cleanUp(s2);
    const alpha = 'abcdefghijklmnopqrstuvwxyz'.split(''); //array of alphabet
    let match = false;
    let x = 0;

    if (alphaMax && str1.len > 0 && str2.len > 0) {
        return 'YES'; //return if the entire alphabet is present in one/both, and both have at least one letter
    } else if (str1.len <= 0 || str2.len <= 0) {
        return 'NO'; //if no letters are present in either
    }

    while (!match && x < alpha.length) {
        if (str1.ob[alpha[x]] && str2.ob[alpha[x]]) {
            match = true; //if the given letter is present in both objects
        } else {
            x++; //check next letter in alphabet
        }
    } 

    if (match) {
        return 'YES';
    } else {
        return 'NO';
    }

    //timeout solution
    // function cleanUp(str) {
    //     return str.split('').map(x => x = x.charCodeAt()).sort((a, b) => a - b).filter((e, i, arr) => arr.indexOf(e) >= i);
    // }
    // const split = {
    //     c1: 0,
    //     c2: 0,
    //     s1: cleanUp(s1),
    //     s2: cleanUp(s2)
    // };
    // let match = false;
    // while (!match && split.c1 < split.s1.length) {
    //     while (!match && split.c2 < split.s2.length) {
    //         if (split.s1[split.c1] === split.s2[split.c2]) {
    //             match = true;
    //         } else {
    //             split.c2++;
    //         }
    //     }
    //     if (!match) {
    //         split.c2 = 0;
    //         split.c1++;
    //     }
    // }
    // if (match) {
    //     return 'YES';
    // } else {
    //     return 'NO';
    // }
}