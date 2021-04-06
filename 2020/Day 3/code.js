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

function getColumn(xIndex) {
    if (xIndex + 3 <= 30) { return xIndex + 3; }
    else { return (xIndex + 3) - 31; } // start again at [0] if currentColumn goes past [30]
}

function solveFirstQuestion(map) {
    let column = 0, row = 0, treesHit = 0;

    while (row < map.length - 1) { // traverse map until mapInput.length - 1, which is the last row of the map 
        column = getColumn(column);
        row++; // increment row + 1 until it reaches bottom of the map
        
        if (map[row][column] == '#') { treesHit++; } // can be turned into function to reduce repetitive code, see notes.txt
    }

    console.log(`First Answer: ${treesHit}`); // First Answer: 250
}

solveFirstQuestion(dataArray);

/*  Part 2:

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?

*/
function getNextColumn(currentColumn, amountRight) {
    if (currentColumn + amountRight <= 30) { return currentColumn + amountRight; } // instead of hardcoding # to increment, pass a variable instead to be more flexible
    else { return (currentColumn + amountRight) - 31; } // start again at [0] if currentColumn goes past [30]
}

function getNextRow(currentRow, amountDown) {
    return currentRow + amountDown;
}

function checkTreesHit(map, rightValue, downValue) {
    let column = 0, row = 0, treesHit = 0;
    while (row + downValue <= map.length - 1) { // check if (row + # to go down) does not go past row 322 BEFORE doing any calculations
        column = getNextColumn(column, rightValue)
        row = getNextRow(row, downValue);

        if (map[row][column] == '#') { treesHit++; } // can be turned into function to reduce repetitive code, see notes.txt
    }

    return treesHit;
}

function solveSecondQuestion(mapInput) {
    console.log('Second Answer: ' + checkTreesHit(mapInput, 1, 1)*checkTreesHit(mapInput, 3, 1)*checkTreesHit(mapInput, 5, 1)*checkTreesHit(mapInput, 7, 1)*checkTreesHit(mapInput, 1, 2));
    // Second Answer: 1592662500
}

solveSecondQuestion(dataArray);