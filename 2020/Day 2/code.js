// Day 2: Password Philosophy

/*  Part 1:

Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid.
For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

How many passwords are valid according to their policies?

*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', 
    {encoding: 'utf8', flag:'r'});
const dataArray = data.split(/\n/);

let validPasswords = 0;

function getLetterLimits(limitString) {
    const limitFilter = limitString.split(/\-/); // split limit range by using the '-' character to indicate between lower limit [0] and upper limit [1]
    const parseLimitFilter = limitFilter.map(Number); // creates another array that stores the limits by their numerical values and not by characters
    
    return [parseLimitFilter[0], parseLimitFilter[1]];
}

function getLetter(characterString) {
    return characterString.replace(/\:/, '');
}

function checkValidPassword(limitInfo, letter, passwordInfo) {
    let atLeast = 0, atMost = 0, actualAmount = 0;
    atLeast = limitInfo[0], atMost = limitInfo[1];

    if (passwordInfo.includes(letter)) {
        for (i = 0; i < passwordInfo.length; i++) {
            if(passwordInfo[i] == letter) actualAmount++;
        }

        if (actualAmount >= atLeast && actualAmount <= atMost) {
            validPasswords++;
        }
    }
}

function solveFirstQuestion(numberArray) {
    
    numberArray.forEach(password => {
        if(password) {
            let passwordInfo = password.split(/\s/); // splits the information into limits [0], character [1], and password sequence [2]
            let limits = getLetterLimits(passwordInfo[0]);
            let letter = getLetter(passwordInfo[1]);
            checkValidPassword(limits, letter, passwordInfo[2]);
        }
    });

    console.log(`First Answer: ${validPasswords}`); // First Answer: 582
}

solveFirstQuestion(dataArray);

/*  Part 2:

Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have
no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

How many passwords are valid according to the new interpretation of the policies?

*/

let recheckedValidPasswords = 0;

function recheckValidPassword(limitInfo, letter, passwordInfo) {
    let firstIndex = limitInfo[0] - 1, secondIndex = limitInfo[1] - 1; // indexes weren't given with 0 as the start (they started at 1), so just subtract by 1
        if (passwordInfo[firstIndex] == letter || passwordInfo[secondIndex] == letter) { // check if the correct letter is in either location its supposed to be in
            if (!(passwordInfo[firstIndex] == letter && passwordInfo[secondIndex] == letter)) { // check if the correct letter is not in both locations
                recheckedValidPasswords++;
            }
        }
}

function solveSecondQuestion(numberArray) {

    numberArray.forEach(password => {
        if(password) {
            let passwordInfo = password.split(/\s/); // splits the information into limits, character, and password sequence
            let limits = getLetterLimits(passwordInfo[0]); // instead of the number of times a letter should appear, limits now refers to the locations a letter should appear
            let letter = getLetter(passwordInfo[1]);
            recheckValidPassword(limits, letter, passwordInfo[2]);
        }
    });

    console.log(`Second Answer: ${recheckedValidPasswords}`); // Second Answer: 729
}

solveSecondQuestion(dataArray);