//Date Completed: May 2019

/*
Sherlock and Anagrams by darkshadows
https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem

Difficulty: Medium

Description:
Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string. Given a string, find the number of pairs of substrings of the string that are anagrams of each other.

Parameters:
s: a string

Number of solution attempts: 2 (second was just adding annotations)
*/

function sherlockAndAnagrams(s) {
    const arr = []; //array of all possible substrings
    const str = Array.from(s); //array of each letter
    let result = 0; //number of anagrams
    
    for (let x = 1; x < str.length; x++) { //each possible number of letters
        let ana = 0;
        for (let y = x; y <= str.length; y++) { //loop through array, making substrings
            if (y > 1) { //sort letters alphabetically to match different combinations
                arr.push(str.slice(ana, y).sort().join(''));
            } else {
                arr.push(str.slice(ana, y).join(''));
            }
            ana++;
        }
        ana = 0;
    }

    while (arr.length > 1) { //check first index against subsequent to find all matches, then remove first index, start again until finished
        for (let z = 0; z < arr.length; z++) {
            if (arr[0] === arr[z + 1]) {
                result++;
            }
        }
        arr.shift();
    }

    return result;
}