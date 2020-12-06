# OpenSim Marketplace

## Introduction

OpenSim Marketplace is a marketplace for the OpenSim environment. Users can upload their creations and also download new ones to use. There are also multiple ways to locate assets, searching by type or
a search string.

## Installation

#### Prerequisites

- Must have `Node >= 8.10` and `npm >= 5.6`. If not, you can grab them from this link [here](https://nodejs.org/en/).

  - Check versions with `node --version` and `npm --version`.

- Optionally, you can also use [yarn](https://classic.yarnpkg.com/en/docs/install) instead of npm.

  - Check version with `yarn --version`.

- Must have a valid version of [Git](https://git-scm.com/).

  - Check version with `git --version`

#### Installing

1. **Install git repository**

In the command prompt or terminal, move the folder that you would like to keep the local repository. Once there type in the console:

`git clone https://gitlab.com/senior-design-project-12/opensim-marketplace.git`

This will create a local repository identical to the Gitlab repository.

type `cd opensim-marketplace` to enter the project folder. Within, there should be 2 folders: `opensim-marketplace` and `backend`

2. **Install packages for frontend**

In the command prompt or terminal, in the root of the local repository, type the following:

`cd opensim-marketplace`

In the folder, install the packages:

`npm install` or `yarn`

This will create a `node_modules` folder holding all third party libraries

3. **Install packages for backend**

In the command prompt or terminal, in the root of the local repository, type the following:

`cd backend`

In the folder, install the packages:

`npm install` or `yarn`

## Running

#### Environment Variables

Must ensure that there is a valid connection to the database. In order to connect to the database, modify the .env file in the `backend` root folder.

- `PORT` for changing port server runs on. Default is 5000
- `TEST_UUID` User ID for testing. **Used for testing only**
- `DB_URL` for the IP of the database or location name of the database.
- `DB_USERNAME` Username of connection
- `DB_PASSWORD` Password of connection
- `DB_NAME` Name of the database to connect to (Ex: 'opensim').

#### Frontend

In the command prompt or terminal, move to the `opensim-marketplace` directory.

**Note:** Before running the development react server, a location for the backend server must be specified. In the frontend directory, open the `package.json` file and change `proxy` from `http://localhost:5000/` to the where the server will be run.

To run the development react server, type:

`npm start`

**Note:** This will start the React at `http://localhost`. or at whatever port is specified in `package.json`. To change this port, find the scripts section of `package.json` and modify the `start` script to specified port.

**Note:** While editing the project in the code, any edits that are made to the `src` or `public` folder will be automatically updated on the browser window.

At any time, you can run `npm run build` or `yarn build`. This will create an optimized build in the folder within the frontend directory called `build`. The `build` folder is a static HTML file with vanilla javascript. This HTML is referenced by the backend Node.js server

**Note:** You can run this html file directory and see the website load, but it will not be functional even with the backend server running. To work correctly, it must be run through the backend server

#### Backend

In the command prompt or terminal, move to the `backend` directory and run the following command:

`npm run dev`

This will start a local Node.js server at **localhost:5000** or whatever port specified.

When accessing `http://localhost:{port}/` or wherever the backend server is started, the production build found in `opensim-marketplace/build` of the marketplace should load. This will work exactly as the React Development Server should if run.

**Note:** The backend requires that there be connection to the database to function properly

**Note:** The React development server will rely on the backend being up and running. Always make sure that both are running together to ensure that everything works as intended.

**Note:** Any time you pull or merge from the repository, make sure you run `npm install` or `yarn` to download any new modules
