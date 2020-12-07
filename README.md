# OpenSim Marketplace

## Introduction

OpenSim Marketplace is a marketplace for the OpenSim environment. Users can upload their creations and also download new ones to use. There are also multiple ways to locate assets, searching by type or
a search string.
=======

## Installation

#### Prerequisites

- Must have a preexisting OpenSim database (installation process found [here](http://opensimulator.org/wiki/Configuration)).

- Must have `Node >= 8.10` and `npm >= 5.6`. You can grab them from this link [here](https://nodejs.org/en/).

## Installation

#### Prerequisites

- Must have `Node >= 8.10` and `npm >= 5.6`. You can grab them from this link [here](https://nodejs.org/en/).

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

4. **Modify OpenSim `assets` table**

Run the following SQL script (`modify_table.sql`) on the database your OpenSim instance uses to add a new field to the `assets` table:

```sql
ALTER TABLE `opensim`.`assets`
ADD COLUMN `public` TINYINT(1) UNSIGNED ZEROFILL NOT NULL DEFAULT '0';
```

## Running

#### Environment Variables

Must ensure that there is a valid connection to the database. In order to connect to the database, modify the .env file in the `backend` root folder.

- `PORT` for changing port server runs on. Default is 5000
- `TEST_UUID` User ID for testing. **Used for testing only**
- `DB_URL` for the IP of the database or location name of the database.
- `DB_USERNAME` Username of connection
- `DB_PASSWORD` Password of connection
- `DB_NAME` Name of the database to connect to (e.g.: 'opensim').

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

**Note:**
- The backend requires that there be connection to the database to function properly
- The React development server will rely on the backend being up and running. Always make sure that both are running together to ensure that everything works as intended.
- Any time you pull or merge from the repository, make sure you run `npm install` or `yarn` to download any new modules


## Marketplace User Manuel:

#### Page Layouts

##### Login Page

The login page consists of a form submission to login with OpenSim credentials;  These being first and last name, and password.  The login page is accessible on launch, as well as after the user has logged out of the application via the logout button.

##### Home Page

After proceeding through the login process, the user will be greeted by the home page of the website.  This contains a navigation bar which will be talked about in the following section. The homepage has a welcome message greeting the user, as well as multiple search categories that enable the user to search by asset type (texture, model etc).  There is also a carousel of recently uploaded items on the homepage, showcasing some new items that the user may be interested in.

##### Navigation Bar

The navigation bar is the main way the user interacts with the website, given that it is available from every page except the login screen.  The navigation bar has a redirect that sends the user to the homepage, as well as to the inventory page.  The user can log out of the application which will redirect them to the login page.  Lastly, the user can search for items with text via a search box, preferably by the items name.

##### Search functionality

There are currently two types of search functionality available to the user.  The first one through the navigation bar, which allows the user to search by the name of the item.  Leaving the search box blank will show all available items in the database.  The second are the categories located on the homepage, which when selected will redirect to the search page and search for only the asset type that was selected.  On this page selecting an item card will redirect to the items page.

##### Item page

The item page contains the most descriptive information about each asset, showing the name, asset type, creator, and date and time of upload.  The item page is the only page where an asset can be added to a users inventory.  If the user is the creator or already has the asset in their inventory, the “Add To Inventory” button will redirect to their inventory.  Otherwise, the user can simply add the asset to their inventory via the “Add To Inventory” button.  

##### Inventory Page

The inventory page is the only page where the user can manage the assets in their inventory.  They have the option to remove assets from their inventory, as well as view the item page.  The user also has many capabilities if they are the creator of the asset.  If the user is the creator of the asset, they can opt to make it public or private, which is like uploading and downloading.  Public makes the asset available to all users of the marketplace, and private makes an asset available to only the creating user.  All of this can be done from the buttons on each assets item card in the inventory screen.


#### Usage

1. Login:

    Upon opening / visiting the marketplace you will be redirected to a login page on which you will enter your OpenSim Account information, this includes your First Name,  Last Name, and Password, and click the submit button to gain access to the marketplace and its various functions.

    If your login information matches the servers saved credentials you will be redirected to the Home Page from which you will be able to access the rest of the marketplace.

2. Page Navigation:

    Once logged in to the marketplace all pages, including Search, Item, Home, and Inventory Pages, become accessible via the following navigation methods:

  * Home Page:

    You can access the Home Page via any other page by clicking the OpenSim Marketplace Brand or Logo located at the top-left of the screen in the dark colored Navigation Bar. Once clicked you will be redirected to the Home Page.

  * Search Page:

    You can access the Search Page via any other page by typing an asset name, or leaving it blank, into the search textbox located in the top-right corner of the screen in the dark colored Navigation Bar and simply clicking the green search button or hit enter on the keyboard. Once clicked you will be redirected to the search page which will contain the assets pertaining to what you entered in the search bar.

    The Search Page can also be accessed via the Home Page’s “Search Categories” Section. Clicking on any of the listed search categories, including material, texture, sound, etc., will redirect you to the search page. The assets, or lack thereof, will be of and only of the type you selected in the search categories section.   

**Note:** If instead of a search bar and search button, a square containing three horizontal lines is located in the top-right corner of the screen. Either expand the size of the browser window or simply click the three line box to reveal the search bar and search button.

  * Item Page:

    You can access an Item Page via the following:
      - The Home Page by clicking the title (top most text) of one of the cards(teal colored squares) located in the “Recently Updated Items section", doing so will redirect you to the selected item’s corresponding Item Page. 
      - The Search Page by clicking the title (top most text) of one of the cards(dark colored squares) or the “More Info” button, doing so will redirect you to the selected item’s corresponding Item Page.
      - The Inventory Page by clicking the “Inspect Item” button of one of the cards(dark colored squares), doing so will redirect you to the selected item’s corresponding Item Page.

**Note:** There is exactly one Item Page per asset in the Marketplace. Not every Item Page can be accessed via every other page. Only the Search Page may provide access to all Item Pages at once.  

  * Inventory Page:

    You can access the Inventory Page via any other page by simply clicking the “Inventory” text located in the top-right corner of the screen in the dark colored Navigation Bar. Once clicked you will be redirected to the Inventory Page.  

**Note:** If instead of “Inventory” text , a square containing three horizontal lines is located in the top-right corner of the screen. Either expand the size of the browser window or simply click the three line box to reveal the “Inventory” text.

3. Finding Assets:

There are several ways/places to find assets on the marketplace:

    On the Home Page:
        In the bottom section of the Home Page labeled “Recently Updated Items”  
    Search categories on the Home Page
        Selecting a category directs to the search page and displays its assets
    Search Page:
        Search for assets by name using navigation bar which redirects to search page with assets matching the search

4. Adding Item Inventory:

    Once you have found the asset you are looking for and have been redirected to  its corresponding Item Page, you can now add the asset to your inventory via the “Add To Inventory” button. Once clicked the asset will be added to your OpenSim Inventory where it can be viewed via the marketplace Inventory Page as well as the in-client inventory screen located in the OpenSim Client. You will also be redirected to your Inventory where your added asset will be displayed.

**Note:** Both the OpenSim Client and the OpenSim Marketplace share an Inventory. This is how items are “Downloaded” and “Uploaded”.

5. Uploading an Inventory Item:

    In order to upload an item, you must be the creator of said item, meaning you must have been the creator of the item in OpenSim. If you are the creator, you can go to your inventory page through the navbar, and locate the item that you wish to upload to the marketplace.  Once you have found the item, simply check the public button if it is currently private, and it will be “uploaded”.  If you would like to hide or “unupload” your item, hit the private button within the inventory page on the item you want to hide, and it will no longer be public on the marketplace.

6. Logout:

    Once you have finished using the marketplace you may logout of your OpenSim Account via the “Logout” text located in the top-right corner of the screen in the dark colored Navigation Bar. Once clicked you will be redirected to the Login Page where you can login once again. 

**Note:** If instead of “Logout” text , a square containing three horizontal lines is located in the top-right corner of the screen. Either expand the size of the browser window or simply click the three line box to reveal the “Logout” text.



