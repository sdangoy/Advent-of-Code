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
    else { 
        return (xIndex + 3) - 31; // start at 0 index
    }
}

function checkTree(character, treesHit) {
    if(character == '#') { return treesHit+=1; }
    else { return treesHit }
}

function solveFirstQuestion(mapInput) {
    let column = 0, row = 0, treesHit = 0;

    while (row < mapInput.length - 1) { // mapInput.length - 1 is the last row of the map 
        column = getColumn(column);
        row++; // increment row + 1 until it reaches bottom of the map
        treesHit = checkTree(mapInput[row][column], treesHit);
    }

    console.log(`First Answer: ${treesHit}`); // First Answer: 250
}

solveFirstQuestion(dataArray);