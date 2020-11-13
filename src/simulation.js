const movements = require('./movements');
const chalk = require('chalk');

/**
* Function to check whether the toy robot has been placed on the board.
* 
* @param {boolean} isPlaced Indicates whether the robot has already been placed on the tabletop.
* @param {string} command Command entered by the user.
*/
const checkIfRobotIsPlaced = (isPlaced, command) => {
    // Only PLACE is allowed as the first command (Also checking if placement coordinates are on the tabletop).
    const isValidFirstCommand = isPlaced || /PLACE\s[0-4],[0-4],(NORTH|SOUTH|EAST|WEST).*$/.test(command);

    if (!isValidFirstCommand) {
        console.log(chalk.red('\nYou must first place the robot on the tabletop using valid PLACE command e.g. PLACE 2,3,EAST\n'));
    } else {
        console.log(chalk.green('\nThe robot has been placed on the tabletop. You may now move the robot.\n'));
    }

    return isValidFirstCommand;
}

/**
* Function to check whether the command entered is valid.
* 
* @param {string} command Command entered by the user.
*/
const checkCommandValidity = (command) => {
    // Valid command formats: PLACE X,Y,DIRECTION; MOVE; LEFT; RIGHT; REPORT.
    const isValidCommand = /PLACE\s[0-4],[0-4],[NORTH|SOUTH|EAST|WEST]|MOVE|LEFT|RIGHT|REPORT/.test(command);

    if (!isValidCommand) {
        console.log(chalk.red('\nPlease enter a valid command. e.g. PLACE 1,2,NORTH | MOVE | LEFT | RIGHT | REPORT\n'));
    } 

    return isValidCommand; 
}

/**
* Function to move the robot based on the command entered.
* 
* @param {string} command Command entered by the user.
* @param {int} x X-coordinate position of the robot.
* @param {int} y Y-coordinate position of the robot.
* @param {string} direction Direction in which the robot is facing.
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