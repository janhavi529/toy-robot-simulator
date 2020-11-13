const readline = require('readline');
const chalk = require('chalk');

const simulation = require('./src/simulation');
const movements = require('./src/movements');

/**
* Function to simulate toy robot movement.
*
*/
const simulateRobotMovement = () => {  
    let isPlaced = false, x, y, direction;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(chalk.blue.bold('\nTOY ROBOT SIMULATOR\n'));
    console.log(chalk.magenta('Enter commands in the following format to move your robot on the tabletop:\n\nPLACE 1,2,NORTH\nMOVE\nLEFT\nRIGHT\nREPORT\n'));
    console.log(chalk.blue('\nNOTE: You must first place your robot on the tabletop using a valid PLACE command.\n'));
    console.log(chalk.green('\nEnter commands below:\n'));

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