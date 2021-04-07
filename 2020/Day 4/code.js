// Day 4: Passport Processing

/* Part 1:

The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

    - byr (Birth Year)          - hcl (Hair Color)
    - iyr (Issue Year)          - ecl (Eye Color)
    - eyr (Expiration Year)     - pid (Passport ID)
    - hgt (Height)              - cid (Country ID) (Optional)

Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?

*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', {encoding: 'utf8', flag:'r'});
const dataArray = data.split(/\n/);

function traversePassportArray(passports, startIndex) {
    let index = startIndex;

    while (passports[index] != '') { // while an empty string is not reached yet
        index++;
    }
    return index; // return the index that indicates the end of a passport entry
}

function getFullPassportInfo(passports, startIndex, endIndex) {
    let passportArray = passports.slice(startIndex, endIndex);  // slice out only one passport entry from the array of strings holding passport entries
    let passport = '';

    passportArray.forEach(item => { // for each line that a passport entry has, concatenate them together to make one string holding all fields, seperated by a space in between
        passport = passport + ' ' + item;
    })
    return passport;
}

function getPassportFields(fullPassport) {
    return fullPassport.trim().split(/\s/); // .trim() removes the white space before string and .split() seperates it into seperate fields
}

function checkPassportFields(fields) {
    if (fields.length < 7) { return 0; } // if there are less than the number of necessary fields, it is not valid
    else if (fields.length == 7) {
        for (let field of fields) {
            if (field.substring(0,3).includes('cid')) { return 0; }
        }
        return 1;
    }
    else { return 1; } // if there are more than the necessary fields (8 necessary + 'cid'), then it is valid
}

function solveFirstQuestion(passportInput) {
    let startIndex = 0, validPassports = 0;  

    while (startIndex < passportInput.length) { // while we haven't reached the bottom of the passportInput, keep executing. See notes.txt
        let endIndex = traversePassportArray(passportInput, startIndex);
        let passportInfo = getFullPassportInfo(passportInput, startIndex, endIndex);
        let passportFields = getPassportFields(passportInfo);
        let result = checkPassportFields(passportFields);
        validPassports = validPassports + result;
        startIndex = endIndex + 1; // set startIndex as the next line after the line break
    }

    console.log(`First Answer: ${validPassports}`); // First Answer: 239
}

solveFirstQuestion(dataArray);