// Day 1: Report Repair

/*  Part 1:

Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', 
    {encoding: 'utf8', flag:'r'});
const dataArray = data.split(/\r\n/);

const numberData = dataArray.map(Number); // Converts dataArray from array of strings to array of ints for calculations

function findCompliment(sum, number) {
    let compliment = sum - number;
    return compliment;
}

function solveFirstQuestion(numberArray) {
    let firstAnswer, secondAnswer = 0;

    for (let firstNumber of numberArray) {
        let secondNumber = findCompliment(2020, firstNumber);
        if (numberArray.includes(secondNumber)) {
            firstAnswer = firstNumber;
            secondAnswer = secondNumber;
            break;
        }
    }

    let product = firstAnswer * secondAnswer;
    console.log(`First Answer: ${product}`);
}

solveFirstQuestion(numberData); // Answer: 840324

/*  Part 2:

The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find
three numbers in your expense report that meet the same criteria.

In your expense report, what is the product of the three entries that sum to 2020?

*/

function solveSecondQuestion(numberArray) {
    let firstAnswer, secondAnswer, thirdAnswer = 0;

    for (let firstNumber of numberArray) {
        let firstCompliment = findCompliment(2020, firstNumber);
        for (let secondNumber of numberArray) {
            if (secondNumber < firstCompliment) {
                let thirdNumber = findCompliment(firstCompliment, secondNumber)
                if (numberArray.includes(thirdNumber)) {
                    firstAnswer = firstNumber;
                    secondAnswer = secondNumber;
                    thirdAnswer = thirdNumber;
                    break;
                }
            }
        }
    }
    let product = firstAnswer*secondAnswer*thirdAnswer;
    console.log(`Second Answer: ${product}`);
}

solveSecondQuestion(numberData);
