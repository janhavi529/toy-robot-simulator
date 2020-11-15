const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');   
const helmet = require('helmet');  

const simulation = require('./simulation');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));      
app.use(compression()); // To compress HTTP responses back to the client, improve load time
app.use(helmet());  // To protect the app against vulnerabilities

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
    res.status(404).send({ message: 'Command not found' });
});

module.exports = app;