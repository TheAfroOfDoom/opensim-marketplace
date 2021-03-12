# config

## Files

#### cache.js

Configuration for an LRU cache.

#### config.ini

.ini file for basic configuration of the server. Contains information such as
port, Database address information, and OpenSim address information.

#### database.js

Configuration of the OpenSim Database Connection.

#### index.js

Default file of config folder. This file exports any global variables found in
config .ini in a format usable by all files.

#### mockdatabase.js

Used for testing only. mocks the structure of a Sequelize Object to allow mocking of data when testing.
