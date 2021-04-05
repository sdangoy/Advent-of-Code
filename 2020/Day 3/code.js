// Day 3: Toboggan Trajectory

/*  Part 1:

You start on the open square (.) in the top-left corner and need to reach the bottom (below the bottom-most row on your map).

The toboggan can only follow a few specific slopes (you opted for a cheaper model that prefers rational numbers); start by counting all the trees you would encounter for the slope
right 3, down 1:

From your starting position at the top-left, check the position that is right 3 and down 1. Then, check the position that is right 3 and down 1 from there, and so on until you go past
the bottom of the map.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?

*/

const fs = require('fs');
const data = fs.readFileSync('input.txt', {encoding: 'utf8', flag:'r'});
const dataArray = data.split(/\n/);

// let xIndex, yIndex = 0;
const sample = dataArray[1];

function getColumn(xIndex) {
    if (xIndex + 3 <= 30) { return xIndex + 3; }
    else { 
        return (xIndex + 3) - 31; // start at 0 index
    }
}

function getRow(input, yIndex) {
    if (yIndex + 1 <= input.length) {
        return yIndex + 1;
    }
    else {
        return yIndex;
    }
}

function checkTree(character, treesHit) {
    if(character == '#') { treesHit = treesHit + 1; }
}

function solveFirstQuestion(mapInput) {
    let column = 0, row = 0, treesHit = 0;
    column = getColumn(column);
    row = getRow(mapInput, row);
    checkTree(mapInput[row][column], treesHit);

    console.log(`xIndex: ${column}, yIndex: ${row}`);
    console.log(mapInput[row - 1]);
    console.log(mapInput[row]);
    console.log(`dataArray[${row}][${column}]`);
    console.log(treesHit);
}

solveFirstQuestion(dataArray);