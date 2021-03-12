# src

## Folders

#### API

Contains all code for the REST API

#### Config

Contains configuration files for the entire backend.

#### Models

Contains models outlining the schemas of the OpenSim SQL tables. These files are
necessary for Sequelize to work. Sequelize is the npm package that lets us run
MySQL Commands to the OpenSim Database.

#### Tests

Where all backend tests are stored. For jest to run a test, it must end with `test.js`
(ex. `inventory.test.js`).

## Files

#### app.js <=== IMPORTANT

The core of the application. All routes and middleware must be declared in this
file.

#### openjpeg.js

([OpenJPEG GitHub](https://github.com/kripken/j2k.js/blob/master/openjpeg.js))
OpenJPEG port for JavaScript.

#### server.js

Entry point into application. Contains code for handling startup and shutdown
of server.
