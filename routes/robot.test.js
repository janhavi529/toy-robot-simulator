const request = require("supertest");
const app = require('../server');

describe('Toy Robot Simulator', () => {
    it('Should not place the robot on the tabletop until a valid PLACE command is entered', async () => {
        const response = await request(app).post('/move');

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            isValid: false,
            message: 'You must first place the robot on the tabletop using a valid PLACE command e.g. PLACE 2,3,EAST'
        });
    });
  
    it('Should place robot on tabletop once valid PLACE command is entered', async () => {
        const response = await request(app).post('/place').send({
            xCoordinate: 2,
            yCoordinate: 3,
            direction: 'NORTH'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            isMoved: true,
            message: 'Command successfully executed.'
        });
    });

    it('Should throw error if invalid PLACE command is entered', async () => {
        const response = await request(app).post('/place').send({
            xCoordinate: 2,
            direction: 'NORTH'
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            isValid: false,
            message: 'Please enter a valid command. e.g. PLACE 1,2,NORTH | MOVE | LEFT | RIGHT | REPORT'
        });
    });

    it('Should MOVE robot once it is placed on tabletop', async () => {
        const response = await request(app).post('/move');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            isMoved: true,
            message: 'Command successfully executed.'
        });
    });
 
    it('Should rotate robot to the LEFT or RIGHT', async () => {
        const response = await request(app).post('/left');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            isMoved: true,
            message: 'Command successfully executed.'
        });
    });

    it('Should REPORT robot position', async () => {
        const response = await request(app).get('/report');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            xCoordinate: 2,
            yCoordinate: 4,
            direction: 'WEST',
            message: 'Current location of the robot is: 2, 4, WEST'
        });
    });

    it('Should throw error if invalid command is entered', async () => {
        const response = await request(app).post('/run');

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            message: 'Command not found'
        });
    });

    it('Should show health status of robot', async () => {
        const response = await request(app).get('/health');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            active: true,
            message: 'Robot is up and running...'
        });
    });

    it('Should display default message', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            active: true,
            message: 'Enter commands to place and move the robot on the tabletop.'
        });
    });
});