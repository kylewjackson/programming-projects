/*
Counting Valleys by pkacprzak
https://www.hackerrank.com/challenges/counting-valleys/problem

Difficulty: Easy

Description:
Gary is an avid hiker. He tracks his hikes meticulously, paying close attention to small details like topography. During his last hike he took exactly  steps. For every step he took, he noted if it was an uphill, , or a downhill,  step. Gary's hikes start and end at sea level and each step up or down represents a  unit change in altitude. We define the following terms:

A mountain is a sequence of consecutive steps above sea level, starting with a step up from sea level and ending with a step down to sea level.
A valley is a sequence of consecutive steps below sea level, starting with a step down from sea level and ending with a step up to sea level.
Given Gary's sequence of up and down steps during his last hike, find and print the number of valleys he walked through.

Parameters:
n: the number of steps Gary takes
s: a string describing his path

Number of solution attempts: 3
*/

function countingValleys(n, s) {
    let valleyCount = 0;
    let seaLvl = 0;
    let inValley = false;
    s.split('').forEach(x => {
        if (x === 'U') {
            seaLvl++;
        } else if (x === 'D') {
            seaLvl--;
        }
        if (seaLvl < 0) {
            if (!inValley) {
                valleyCount++;
                inValley = true;
            }
        } else if (seaLvl === 0 && valleyCount > 0) {
            inValley = false;
        }
    })
    return valleyCount;
}