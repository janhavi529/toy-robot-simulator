const movements = require('./movements');

let isPlaced = false, x, y, direction;

/**
* Function to simulate toy robot movement.
*
* @param {string} cmd Command entered by the user.
*/
const simulateRobotMovement = (cmd) => {
    let command = cmd.trim().toUpperCase();
    let simulationResponse = {};

    if (!isPlaced) {
        isPlaced = checkIfRobotIsPlaced(isPlaced, command);
    } 
    
    if (isPlaced && checkCommandValidity(command)) {
        // Allow robot movement only after it is placed on the tabletop and if the command is valid.
        if (command === 'REPORT') {
            simulationResponse = { status: 200, response: { message: `Current location of the robot is: ${x}, ${y}, ${direction}`} };
        } else {
            const { coordinates: newCoordinates, direction: newDirection} = moveRobot(command, x, y, direction);
            
            x = newCoordinates[0];
            y = newCoordinates[1];
            direction = newDirection;
            simulationResponse = { status: 200, response: { message: 'Command successfully executed.'} };
        }
    } else if(!isPlaced) {
        simulationResponse = { status: 400, response: { message: 'You must first place the robot on the tabletop using a valid PLACE command e.g. PLACE 2,3,EAST'} };
    } else {
        simulationResponse = { status: 200, response: { message: 'Please enter a valid command. e.g. PLACE 1,2,NORTH | MOVE | LEFT | RIGHT | REPORT'} };
    }

    return simulationResponse;
}; 

/**
* Function to check whether the toy robot has been placed on the board.
* 
* @param {boolean} isPlaced Indicates whether the robot has already been placed on the tabletop.
* @param {string} command Command entered by the user.
*/
const checkIfRobotIsPlaced = (isPlaced, command) => {
    // Only PLACE is allowed as the first command (Also checking if placement coordinates are on the tabletop).
    return isPlaced || /PLACE\s[0-4],[0-4],(NORTH|SOUTH|EAST|WEST).*$/.test(command);
}

/**
* Function to check whether the command entered is valid.
* 
* @param {string} command Command entered by the user.
*/
const checkCommandValidity = (command) => {
    // Valid command formats: PLACE X,Y,DIRECTION; MOVE; LEFT; RIGHT; REPORT.
    return /PLACE\s[0-4],[0-4],(NORTH|SOUTH|EAST|WEST)|MOVE|LEFT|RIGHT|REPORT/.test(command); 
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
    }

    return currentPosition;
}

module.exports = { simulateRobotMovement, checkIfRobotIsPlaced, checkCommandValidity, moveRobot };