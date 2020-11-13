const movements = require('./movements');

/**
* To check whether the toy robot has been placed on the board.
*/
const checkIfRobotIsPlaced = (isPlaced, command) => {
    // Only PLACE is allowed as the first command (Also checking if placement coordinates are on the tabletop).
    return isPlaced || /PLACE\s[0-4],[0-4],(NORTH|SOUTH|EAST|WEST).*$/.test(command);
}

/**
* To check whether the command entered is valid.
*/
const checkCommandValidity = (command) => {
    // Valid command formats: PLACE X,Y,DIRECTION; MOVE; LEFT; RIGHT; REPORT.
    return /PLACE\s[0-4],[0-4],[NORTH|SOUTH|EAST|WEST]|MOVE|LEFT|RIGHT|REPORT/.test(command); 
}

/**
* Move the robot based on the command entered.
*/
const moveRobot = (command, x, y, direction) => {
    let currentPosition = {
        coordinates: [x, y],
        direction
    };
    
    const commandName = /PLACE\s[0-4],[0-4],[NORTH|SOUTH|EAST|WEST]/.test(command) ? 'PLACE' : command;

    switch (commandName) {
        case 'PLACE':
            const [newX, newY, newDirection] = movements.placeRobot(command);
            currentPosition.coordinates[0] = parseInt(newX);
            currentPosition.coordinates[1] = parseInt(newY);
            currentPosition.direction = newDirection;
            break;
        case 'MOVE': 
            currentPosition.coordinates = movements.moveForward(x, y, direction);
            break;
        case 'LEFT': 
            currentPosition.direction = movements.changeDirection(command, direction);
            break;
        case 'RIGHT': 
            currentPosition.direction = movements.changeDirection(command, direction);
            break;
        case 'REPORT': 
            movements.reportLocation(x, y, direction);
            break;
    }

    return currentPosition;
}

module.exports = { checkIfRobotIsPlaced, checkCommandValidity, moveRobot };