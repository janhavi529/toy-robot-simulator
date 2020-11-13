const readline = require('readline');

const commands = require('./commands');

const simulateRobotMovement = () => {  
    let isPlaced = false, x = 0, y = 0, direction = '';

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Read commands from standard input
    rl.on('line', (command) => {
            isPlaced = command && commands.checkIfRobotIsPlaced(command, isPlaced);

            // Allow robot movement only after it is placed on the tabletop and if the command is valid.
            if (isPlaced && commands.checkCommandValidity(command)) {
                const newPosition = commands.moveRobot(command, x, y, direction);
                x = newPosition.coordinates[0];
                y = newPosition.coordinates[1];
                direction = newPosition.direction;
            }
    });
  };

  simulateRobotMovement();