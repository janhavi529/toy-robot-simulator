const readline = require('readline');

const simulation = require('./src/simulation');
const movements = require('./src/movements');

const simulateRobotMovement = () => {  
    let isPlaced = false, x, y, direction;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

  //  console.log('ENTER COMMANDS TO MOVE THE ROBOT...');

    // Read commands from standard input
    rl.on('line', (command) => {
            if (command && !isPlaced) {
                isPlaced = simulation.checkIfRobotIsPlaced(isPlaced, command);
            }

            // Allow robot movement only after it is placed on the tabletop and if the command is valid.
            if (isPlaced && simulation.checkCommandValidity(command)) {
                const newPosition = simulation.moveRobot(command, x, y, direction);
                x = newPosition.coordinates[0];
                y = newPosition.coordinates[1];
                direction = newPosition.direction;
            }
    });
  };

  simulateRobotMovement();