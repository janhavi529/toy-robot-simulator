const movements = require('./movements');

describe('Movements of robot according to the command supplied', () => {
    it('Should place the robot at specified coordinates and direction when valid PLACE command is entered', () => {
        expect(movements.placeRobot('PLACE 1,4,NORTH')).toEqual(expect.arrayContaining(['1', '4', 'NORTH']));
    });

    describe('MOVE command', () => {
        it('Should move the robot one position in NORTH direction if new coordinates would still be on tabletop', () => {
            expect(movements.moveForward(2, 2,'NORTH')).toEqual(expect.arrayContaining([2,3]));
        });

        it('Should not move the robot in NORTH direction if new coordinates would result in destruction', () => {
            expect(movements.moveForward(2, 4,'NORTH')).toEqual(expect.arrayContaining([2,4]));
        });

        it('Should move the robot one position in SOUTH direction if new coordinates would still be on tabletop', () => {
            expect(movements.moveForward(2, 2,'SOUTH')).toEqual(expect.arrayContaining([2,1]));
        });
        
        it('Should not move the robot in SOUTH direction if new coordinates would result in destruction', () => {
            expect(movements.moveForward(2, 0,'SOUTH')).toEqual(expect.arrayContaining([2,0]));
        });

        it('Should move the robot one position in EAST direction if new coordinates would still be on tabletop', () => {
            expect(movements.moveForward(2, 2,'EAST')).toEqual(expect.arrayContaining([3,2]));
        });

        it('Should not move the robot in EAST direction if new coordinates would result in destruction', () => {
            expect(movements.moveForward(4, 2,'EAST')).toEqual(expect.arrayContaining([4,2]));
        });

        it('Should move the robot one position in WEST direction if new coordinates would still be on tabletop', () => {
            expect(movements.moveForward(2, 2,'WEST')).toEqual(expect.arrayContaining([1,2]));
        });

        it('Should not move the robot in WEST direction if new coordinates would result in destruction', () => {
            expect(movements.moveForward(0, 2,'WEST')).toEqual(expect.arrayContaining([0,2]));
        });
    });

    describe('LEFT or RIGHT commands', () => {
        it('Should rotate the robot 90 degrees clockwise if RIGHT command is entered', () => {
            expect(movements.changeDirection('RIGHT','NORTH')).toEqual('EAST');
            expect(movements.changeDirection('RIGHT','WEST')).toEqual('NORTH');
        });
        
        it('Should rotate the robot 90 degrees anti-clockwise if LEFT command is entered', () => {
            expect(movements.changeDirection('LEFT','SOUTH')).toEqual('EAST');
            expect(movements.changeDirection('LEFT','NORTH')).toEqual('WEST');
        });
    });
});