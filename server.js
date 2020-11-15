const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');   
const helmet = require('helmet');  
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const robotRoutes = require('./routes/robot');

const app = express();
const port = process.env.PORT || 3000;

// Create write stream for logging.
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});     

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));     
// To compress HTTP responses back to the client, improve load time. 
app.use(compression()); 
// To protect the app against vulnerabilities.
app.use(helmet());
// Append logs to access.log file.
app.use(morgan('combined', {stream: accessLogStream})); 

app.use(robotRoutes);

app.use((req, res) => {
    res.status(404).send({ message: 'Command not found' });
});

app.listen(port, err => {
    if (err) {
        throw new Error(err);
    } else {
        console.log(`Listening on port ${port}...`);
    }
});

module.exports = app;