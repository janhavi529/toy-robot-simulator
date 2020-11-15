# toy-robot-simulator

Problem Statement
-----------
 
- The application is a simulation of a toy robot moving on a square tabletop,
  of dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be
  prevented from falling to destruction. Any movement that would result in the
  robot falling from the table must be prevented, however further valid
  movement commands must still be allowed.
 
The application can read in commands of the following form:
 
    PLACE X,Y,F
    MOVE
    LEFT
    RIGHT
    REPORT
 
- PLACE will put the toy robot on the table in position X,Y and facing NORTH,
  SOUTH, EAST or WEST.
- The origin (0,0) can be considered to be the SOUTH WEST most corner.
- The first valid command to the robot is a PLACE command, after that, any
  sequence of commands may be issued, in any order, including another PLACE
  command. The application should discard all commands in the sequence until
  a valid PLACE command has been executed.
- MOVE will move the toy robot one unit forward in the direction it is
  currently facing.
- LEFT and RIGHT will rotate the robot 90 degrees in the specified direction
  without changing the position of the robot.
- REPORT will announce the X,Y and F of the robot. This can be in any form,
  but standard output is sufficient.
- A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT
  and REPORT commands.
- The toy robot must not fall off the table during movement. This also
  includes the initial placement of the toy robot.
- Any move that would cause the robot to fall must be ignored.
 
Implementation
-----------
 - Used Node/Express to create REST API to handle command requests for robot simulation.
 - Used Jest for test cases.
 - Test coverage report can be obtained by running "npm test". 
 
 Usage
-----------
 - The code is deployed on Heroku at: https://stormy-plains-80695.herokuapp.com/
 - Request commands must be in the following form (can be fired from Postman):
 
    1. /place - POST request with request body containing xCoordinate, yCoordinate, direction. 
        Example: {
              "xCoordinate": 2,
              "yCoordinate": 4,
              "direction": "EAST"
        } 
    2. /move - GET request
    3. /left - GET request
    4. /right - GET request
    5. /report - GET request

