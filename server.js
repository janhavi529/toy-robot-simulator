const express = require('express');
const bodyParser = require('body-parser');
const simulation = require('./src/simulation');

const app = express();
const port = 3000;

app.use(bodyParser.json({ extended: true }));

/**
* To handle GET traffic for MOVE, LEFT, RIGHT, REPORT commands.
*/
app.get(['/move','/left','/right','/report'], (req, res) => {
    let cmd = req.url.slice(1);    // Extracting only the command name (Removing '/')
    let { status, response } = simulation.simulateRobotMovement(cmd);

    res.status(status).send(response);
});

/**
* To handle POST requests for PLACE command.
*/
app.post('/place', (req, res) => {
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
app.get('/health', (req, res) => {
    res.status(200).send({ message: 'Robot is up and running...' });
});

/**
* Middleware to handle errors.
*/
app.use((req, res) => {
    res.status(400).send({ message: 'Bad Request' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});