/**
* Place robot at the specified X,Y coordinates on the tabletop and facing in the specified direction.
* 
* @param {string} command Command entered by the user.
*/
const placeRobot = (command) => {
    return command.trim().split(' ')[1].split(',');
}

/**
* Move the robot one position in the current direction.
* 
* @param {int} x X-coordinate position of the robot.
* @param {int} y Y-coordinate position of the robot.
* @param {string} direction Direction in which the robot is facing.
*/
const moveForward = (x, y, direction) => {
    let coordinates = [x, y];
    switch (direction) {
        case 'NORTH':
            if (y+1 <= 4)   // Checking if position of robot is valid after movement
                coordinates[1]++;   // Moving one position in positive y direction
            break;
        case 'SOUTH':
            if (y-1 >= 0)   
                coordinates[1]--;   // Moving one position in negative y direction
            break;
        case 'EAST':
            if (x+1 <= 4)
                coordinates[0]++;  // Moving one position in positive x direction
            break;
        case 'WEST':
            if (x-1 >= 0)
                coordinates[0]--;  // Moving one position in negative x direction
            break;
    }

   return coordinates;
}

/**
* Turn 90 degrees clockwise or anticlockwise based on the command provided.
* 
* @param {string} command Command entered by the user.
* @param {string} direction Direction in which the robot is facing.
*/
const changeDirection = (command, direction) => {
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    let directionIndex = directions.indexOf(direction);

    if ( command === 'RIGHT') {
        // Turn 90 degrees clockwise/right
        directionIndex = (directionIndex === 3) ? 0 : ++directionIndex;
    } else {
        // Turn 90 degrees anticlockwise/left
        directionIndex = (directionIndex === 0) ? 3 : --directionIndex;
    }
    
    return directions[directionIndex];
}

module.exports = { placeRobot, moveForward, changeDirection };