const simulation = require('../src/simulation');
const movements = require('../src/movements');

describe('Simulation of robot according to commands entered', () => {
    it('Should return validity of the command entered', () => {
        const invalidCommands = ['PLACE 1,5,NORTH', 'TURN', 'RUN'];
        const validCommands = ['PLACE 1,3,EAST', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];

        invalidCommands.forEach((command) => expect(simulation.checkCommandValidity(command)).toBeFalsy());
        validCommands.forEach((command) => expect(simulation.checkCommandValidity(command)).toBeTruthy());
    });

    describe('Initial placing of robot on tabletop', () => {
        it('Should place the robot on tabletop if valid PLACE command is entered', () => {
            const validPlaceCommands = ['PLACE 1,4,SOUTH', 'PLACE 1,2,EAST', 'PLACE 3,4,WEST', 'PLACE 0,4,NORTH'];

            validPlaceCommands.forEach((command) => expect(simulation.checkIfRobotIsPlaced(false, command)).toBeTruthy());
        });
    
        it('Should not place the robot on tabletop if command other than PLACE is the first command', () => {
            const invalidCommands = ['MOVE', 'LEFT', 'RIGHT', 'REPORT', 'TURN', 'RUN'];
            
            invalidCommands.forEach((command) => expect(simulation.checkIfRobotIsPlaced(false, command)).toBeFalsy());
        });
    });
    
    describe('Move robot according to command entered', () => {
        it('Should call the placeRobot function to place the robot when valid PLACE command is entered', () => {
            const placeMock = jest.spyOn(movements, "placeRobot");
    
            simulation.moveRobot('PLACE 2,3,WEST', 1, 2, 'NORTH');
    
            expect(placeMock).toHaveBeenCalledWith('PLACE 2,3,WEST');
        });
    
        it('Should call the moveForward function to move the robot when valid MOVE command is entered', () => {
            const moveMock = jest.spyOn(movements, "moveForward");
    
            simulation.moveRobot('MOVE', 2, 3, 'WEST');
    
            expect(moveMock).toHaveBeenCalledWith(2, 3, 'WEST');
        });
    
        it('Should call the changeDirection function to rotate the robot when valid LEFT or RIGHT command is entered', () => {
            const directionMock = jest.spyOn(movements, "changeDirection");
    
            simulation.moveRobot('LEFT', 1, 3, 'WEST');
            expect(directionMock).toHaveBeenCalledWith('LEFT', 'WEST');
    
            simulation.moveRobot('RIGHT', 1, 3, 'WEST');
            expect(directionMock).toHaveBeenCalledWith('RIGHT', 'WEST');
        });
        
        it('Should call the reportLocation function to report the robot\'s direction when valid REPORT command is entered', () => {
            const reportMock = jest.spyOn(movements, "reportLocation");
    
            simulation.moveRobot('REPORT', 2, 3, 'WEST');
    
            expect(reportMock).toHaveBeenCalledWith(2, 3, 'WEST');
        });
    });
  });