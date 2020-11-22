import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import mockedAxios from 'axios';
import Cookies from 'js-cookie';

import App from "./App";
import NavigationBar from "./components/Navbar/Navbar";
import ItemScreen from "./components/ItemScreen/ItemScreen";
import SearchScreen from "./components/Search/SearchScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import InventoryScreen from "./components/InventoryScreen/InventoryScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import userEvent from '@testing-library/user-event';

import { render, cleanup, fireEvent, screen, wait} from "@testing-library/react";

afterEach(cleanup);

jest.mock('axios');

describe("App" , () => {
  test("Render App (Redirect Sign In Path)", () => {

    const { getByText } = render(<App />);
    expect(getByText(/Sign In/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('First name'), {
        target: { value: 'first' },
      });
    fireEvent.change(screen.getByPlaceholderText('Last name'), {
        target: { value: 'last' },
      });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: { value: 'password' },
      });
    fireEvent.click(screen.getByRole('button'));

  });
  /*
  test("Failure Render App (Not Logged in)", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("main")).toBeInTheDocument();
  });
*/
  test("Render App (Logged In Render) HomeScreen", () => {
    Cookies.get = jest.fn().mockImplementation(() => 'b07098d3-57e6-4e4c-a40f-7fae0eb65e4c');
       mockedAxios.get.mockResolvedValueOnce({
            name:"asdf",
           description:"asdf",
           assetType:0,
           id:1341341234,
           create_time:123412341,
           CreatorID:123412341234,
           useraccounts:{FirstName:"Johnny", LastName:"Test"}
         });
       const { getByText, findByTestId, getByTestId } = render(<HomeScreen />);
       wait(() => {
         //expect(getByTestId('itemss')).toBeInTheDocument();
         expect(getByText(/Creator:/i)).toBeInTheDocument();
      });
     expect(getByText(/Welcome/i)).toBeInTheDocument();
     expect(getByText(/Recently Updated Items/i)).toBeInTheDocument();

  });

  test("Render App (Logged In Render) NavigationBar", () => {
    Cookies.get = jest.fn().mockImplementation(() => 'b07098d3-57e6-4e4c-a40f-7fae0eb65e4c');
     const { getByText } = render(<Router><NavigationBar /></Router>);
     const linkElement = getByText(/OpenSim Marketplace/i);
     expect(linkElement).toBeInTheDocument();
  });

  test("Render App (Logged In Render) ItemScreen", async () => {
    Cookies.get = jest.fn().mockImplementation(() => 'b07098d3-57e6-4e4c-a40f-7fae0eb65e4c');


     mockedAxios.get.mockResolvedValueOnce({
         itemInfo: {
          name:"asdf",
         description:"asdf",
         assetType:0,
         id:1341341234,
         create_time:123412341,
         access_time:123412341,
         public:true,
         CreatorID:123412341234,},
         userInfo: {FirstName:"Johnny", LastName:"Test"},
         creator: false,
         invInfo: { inInventory: false },
       });
     const { getByText, findByTestId, getByTestId } = render(<ItemScreen />);
     wait(() => {
       //expect(getByTestId('itemss')).toBeInTheDocument();
       expect(getByText(/Creator Information/i)).toBeInTheDocument();
    });
     //const linkElement = await findByTestId("itemss");
     //expect(linkElement).toBeInTheDocument();
  });

  test("Render SearchScreen Asset Info", () => {
    Cookies.get = jest.fn().mockImplementation(() => 'b07098d3-57e6-4e4c-a40f-7fae0eb65e4c');
       mockedAxios.get.mockResolvedValueOnce({
            name:"asdf",
           description:"asdf",
           assetType:0,
           id:1341341234,
           create_time:123412341,
           CreatorID:123412341234,
           useraccounts:{FirstName:"Johnny", LastName:"Test"}
         });
       const { getByText, findByTestId, getByTestId } = render(<SearchScreen />);
       wait(() => {
         //expect(getByTestId('itemss')).toBeInTheDocument();
         expect(getByText(/Create Time:/i)).toBeInTheDocument();
      });
  });

  test("Render InventoryScreen Asset Info", () => {
  Cookies.get = jest.fn().mockImplementation(() => 'b07098d3-57e6-4e4c-a40f-7fae0eb65e4c');
     mockedAxios.get.mockResolvedValueOnce({
          assetID:"asdf",
         InventoryName:"asdf",
         assetType:0,
         InvType:0,
         InventoryID:1341341234,
         creationDate:123412341,
         CreatorID:123412341234,
       });
     const { getByText, findByTestId, getByTestId } = render(<InventoryScreen />);
     wait(() => {
       //expect(getByTestId('itemss')).toBeInTheDocument();
       expect(getByText(/Create Time:/i)).toBeInTheDocument();
    });
  });
});
