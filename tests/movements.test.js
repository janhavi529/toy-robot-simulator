const movements = require('../src/movements');

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
    });

    

});