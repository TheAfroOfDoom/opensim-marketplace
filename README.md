# Opensim Asset Marketplace

## Introduction
Opensim Asset Marketplace is a marketplace for the OpenSim environment. Users can upload their creations and also download new ones to use.

## Installation
#### Prerequisites
* Must have `Node >= 8.10` and `npm >= 5.6`. If not, you can grab them from this link [here](https://nodejs.org/en/).
Check versions with `node --version` and `npm --version`.

* Optionally, you can also use [yarn](https://classic.yarnpkg.com/en/docs/install) instead of npm.
Check version with `yarn --version`.

* Must have a valid version of [Git](https://git-scm.com/).
Check version with `git --version`

* Must have a valid connection the database. Make sure you are connected through [hamachi](https://www.vpn.net/) and the database PC is online. (or internet connection if we later move to the cloud).

* If you are logged into gitlab through github, then your username/password combination will not work for services in git. You must get an access token and substitute that for your password:
    1. Log into gitlab [here](https://gitlab.com/users/sign_in)
    2. Go to your settings by clicking your profile picture in the top right corner, and clicking settings.
    3. On the left side, click the tab for 'Access Tokens'
    4. Create a name, and optionally an expiration date, then select the box for 'api'. Click 'create personal access token', and you should be given an access code. Store it somewhere so you can access it later.


#### Installing
1. __Install git repository__
In the command prompt or terminal, move the the folder that you would like to keep the local repository. Once there type in the console: 
`git clone https://gitlab.com/senior-design-project-12/opensim-marketplace.git`

2. __Install packages for front-end__
In the command prompt or terminal, in the root of the local repository, type the following:
`cd opensim-marketplace`
In the folder, install the packages:
`npm install`
or
`yarn`

3. __Install packages for back-end__
In the command prompt or terminal, in the root of the local repository, type the following:
`cd back-end`
In the folder, install the packages:
`npm install`
or
`yarn`

## Usage
The front-end and back-end must both be run seperately.

##### Front-end
In the command prompt or terminal, move to the back-end directory and run the following command:
`npm start`
This will start the React at __localhost:3000__. 
While editing the project in the code, any edits that are made to the `src` folder will be automatically updated on the browser window.

##### Back-end
In the command prompt or terminal, move to the back-end directory and run the following command:
`node .`
This will start a local Node.js server at __localhost:5000__.

Optionally, there is an npm package you can download called [nodemon](https://www.npmjs.com/package/nodemon). When run with this package, changes to back-end code will automatically update and restart the server. Install with `npm install -g nodemon` then run the following command:
`nodemon .`

__Note:__ The backend requires that there be connection to the database to funcion properly
__Note:__ Features of the front-end will rely on the back-end being up and running. Always make sure that both are running together to ensure that evrything works as intended.

## Tools & Resources
In no particular order

#### Text Editor Packages
Use packages that can be added to make developing much easier and smoother. Many you can find will provide autocomplete, snippets, and syntax highlighting.

These are a few recommendations:
##### Atom
* [atom-beautify](https://atom.io/packages/atom-beautify) - Cleans up code to desired style. Works with nearly all languages.
* [atom-ide-ui](https://atom.io/packages/atom-ide-ui) - Provides visual syntax highlighting and error detection. Foundation for several packages supporting several languages.
* [atom-typescript](https://atom.io/packages/atom-typescript) - Provides IDE functionality for typescript, superset of javascript. We may not directly use typescript, but this package will be in the background if it is used in the project.
* [minimap](https://atom.io/users/atom-minimap) - A minimap that shows the whole file. These files can potentially get quite large and confusing so this can be helpful.
* [platformio-ide-terminal](https://atom.io/packages/platformio-ide-terminal) - A command prompt or terminal built into atom.
* [prettier-atom](https://atom.io/packages/prettier-atom) - Package to format files to the 'prettier' style.
* [react-snippets](https://atom.io/packages/react-snippets) - Package providing snippets for common React code

##### VSCode
* [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) - Excellent package that provides several snippets for common React code.
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Helps identify errors in javascript code. Works with JS and JSX files.
* [Prettier](https://marketeplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Package to format files to 'prettier' style


#### React Documentation
Documentation on the different pieces of [React](https://reactjs.org/docs/getting-started.html). This will explain how to get started with React along with the various elements that make it useful.

#### Postman
[Postman](https://www.postman.com/) is an online service that will allow for query testing of a local back-end. You can test out different endpoints and view the data recieved.

#### MySQL Workbench
MySQL Workbench is a software that allows for testing queries and database management. It is a GUI makes the process a lot more visual and streamlined.

