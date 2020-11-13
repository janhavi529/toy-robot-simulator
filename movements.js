/**
* Place robot at the specified X,Y coordinates on the tabletop and facing in the specified direction.
*/
const placeRobot = (command, x, y, direction) => {
    return command.trim().split(' ')[1].split(',');
}

/**
* Move the robot one position in the current direction.
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
*/
const changeDirection = (command, direction) => {
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    let directionIndex = directions.indexOf(direction);

    if ( command === 'RIGHT') {
        // Turn 90 degrees clockwise
        directionIndex = (directionIndex === 3) ? 0 : ++directionIndex;
    } else {
        // Turn 90 degrees anticlockwise
        directionIndex = (directionIndex === 0) ? 3 : --directionIndex;
    }
    
    return directions[directionIndex];
}

/**
* Report the current location of the robot.
*/
const reportLocation = (x, y, direction) => {
   console.log("NEW LOCATION: ", x,y,direction); // TODO
}

module.exports = { placeRobot, moveForward, changeDirection, reportLocation };