const express = require('express');
const simulation = require('../controllers/simulation');

const router = express.Router();

/**
* To handle GET traffic for REPORT command.
*/
router.get(['/report'], (req, res) => {
    let cmd = req.url.slice(1);    // Extracting only the command name (Removing '/')
    let { status, response } = simulation.simulateRobotMovement(cmd);

    res.status(status).send(response);
});

/**
* To handle POST traffic for MOVE, LEFT, RIGHT commands.
*/
router.post(['/move','/left','/right'], (req, res) => {
    let cmd = req.url.slice(1);    // Extracting only the command name (Removing '/')
    let { status, response } = simulation.simulateRobotMovement(cmd);

    res.status(status).send(response);
});

/**
* To handle POST requests for PLACE command.
*/
router.post('/place', (req, res) => {
    const { xCoordinate, yCoordinate, direction } = req.body;
    let cmd = 'PLACE ';

    if(xCoordinate && yCoordinate && direction) {
        cmd += `${xCoordinate},${yCoordinate},${direction}`;
    }
    
    let { status, response } = simulation.simulateRobotMovement(cmd);

    res.status(status).send(response);
});

/**
* To check the status of robot.
*/
router.get('/health', (req, res) => {
    res.status(200).send({ active: true, message: 'Robot is up and running...' });
});

/**
* To handle default request.
*/
router.get('/', (req, res) => {
    res.status(200).send({ active: true, message: 'Enter commands to place and move the robot on the tabletop.' });
});

module.exports = router;