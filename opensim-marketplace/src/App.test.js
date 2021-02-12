import React from "react";
import { HashRouter as Router, Route, Redirect, Link} from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import mockedAxios from "axios";
import Cookies from "js-cookie";

import App from "./App";
import NavigationBar from "./components/Navbar/Navbar";
import ItemScreen from "./components/ItemScreen/ItemScreen";
import SearchScreen from "./components/Search/SearchScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import InventoryScreen from "./components/InventoryScreen/InventoryScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import userEvent from "@testing-library/user-event";

import {
  render,
  cleanup,
  fireEvent,
  screen,
  wait,
} from "@testing-library/react";

afterEach(cleanup);

jest.mock("axios");

describe("App", () => {
  test("Render App (Redirect Sign In Path)", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Sign In/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "Jonas" },
    });
    expect(getByText(/first/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Wojtas" },
    });
    expect(getByText(/last/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    expect(getByText(/password/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

  });

  test("Failure Render App (Not Logged in)", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("main")).toBeInTheDocument();
  });

  test("Render App (Logged In Render) NavigationBar", () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    const { getByText } = render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const linkElement = getByText(/OpenSim Marketplace/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Render NavigationBar Advanced Search", () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    const { getByText } = render(
      <Router>
        <NavigationBar />
      </Router>
    );
    fireEvent.click(screen.getByText(/Advanced/i));
    const linkElement = getByText(/Limit/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Render NavigationBar Search Box", () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    const { getByText } = render(
      <Router>
        <NavigationBar />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Rocks" },
    });
    const linkElement = getByText(/OpenSim Marketplace/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Render App (Logged In Render) ItemScreen", async () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");

    mockedAxios.get.mockResolvedValueOnce({
      itemInfo: {
        name: "asdf",
        description: "asdf",
        assetType: 1,
        id: 1341341234,
        create_time: 123412341,
        access_time: 123412341,
        public: true,
        CreatorID: 123412341234,
      },
      userInfo: { FirstName: "Johnny", LastName: "Test" },
      creator: false,
      invInfo: { inInventory: false },
    });
    const { getByText, findByTestId, getByTestId } = render(<ItemScreen />);
    wait(() => {

      expect(getByText(/Creator Information/i)).toBeInTheDocument();
      expect(getByText(/Sound/i)).toBeInTheDocument();
    });

  });

  test("Render SearchScreen Asset Info", async () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    mockedAxios.get.mockResolvedValueOnce({
      name: "asdf",
      description: "asdf",
      assetType: 0,
      id: 1341341234,
      create_time: 123412341,
      CreatorID: 123412341234,
      useraccounts: { FirstName: "Johnny", LastName: "Test" },
    });
    const { getByText, findByTestId, getByTestId } = render(<SearchScreen />);
    wait(() => {
      //expect(getByTestId('itemss')).toBeInTheDocument();
      expect(getByText(/Create Time:/i)).toBeInTheDocument();
      expect(getByText(/asdf/i)).toBeInTheDocument();
    });
  });

  test("Render InventoryScreen Asset Info", async () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    mockedAxios.get.mockResolvedValueOnce({
      assetID: "asdf",
      InventoryName: "asdf",
      assetType: 1,
      InvType: 0,
      InventoryID: 112341234,
      creationDate: 123412341,
      CreatorID: 123412341234,
    });
    const { getByText, findByTestId, getByTestId } = render(
      <InventoryScreen />
    );
    wait(() => {
      expect(getByText(/Create Time:/i)).toBeInTheDocument();
      expect(getByText(/Sound/i)).toBeInTheDocument();
    });
  });

  test("Render ItemScreen Add To Inventory Button and Its Functions", async () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
      mockedAxios.get.mockResolvedValueOnce({invInfo: { inInventory: false },});
    const handleAdd = jest.fn();
    const {getByText} = render(<ItemScreen>
      <Button onClick={handleAdd}>Add To Inventory</Button>
    </ItemScreen>);
      wait(() => {
        fireEvent.click(screen.getByText(/Add To Inventory/i));
        expect(handleAdd).toHaveBeenCalledTimes(1);
      });
  });

  test("Render ItemScreen View In Inventory Button", async () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
      mockedAxios.get.mockResolvedValueOnce({invInfo: { inInventory: true },});

    const {getByText} = render(<ItemScreen>
      <Button>View In Inventory</Button>
    </ItemScreen>);
      wait(() => {
        fireEvent.click(screen.getByText(/View In Inventory/i));
      });
  });
});


describe("Home Screen", () => {

  test("Render HomeScreen Redirect", async () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    mockedAxios.get.mockResolvedValueOnce({
        assetType: 1,
    });
    const { getByText, getByTestId } = render(<HomeScreen />);
    wait(() => {
      fireEvent.click(screen.getByText("Material"));
      expect(getByTestId("Redirect")).toBeInTheDocument();
    });
  });

  test("Render HomeScreen noRedirect", async () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    const { getByText, getByTestId } = render(<HomeScreen />);
    expect(getByTestId("Redirect")).toBeInTheDocument();
  });

  test("Render App (Logged In Render) HomeScreen", async () => {
    Cookies.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    mockedAxios.get.mockResolvedValueOnce({
      name: "asdf",
      description: "asdf",
      assetType: 0,
      id: 1341341234,
      create_time: 123412341,
      CreatorID: 123412341234,
      useraccounts: { FirstName: "Johnny", LastName: "Test" },
    });
    const { getByText, findByTestId, getByTestId } = render(<HomeScreen />);
    wait(() => {
      //expect(getByTestId('itemss')).toBeInTheDocument();
      expect(getByText(/Creator:/i)).toBeInTheDocument();
      expect(getByText(/asdf/i)).toBeInTheDocument();
      expect(getByText(/Johnny/i)).toBeInTheDocument();
    });
    //expect(getByText(/Welcome/i)).toBeInTheDocument();
    //expect(getByText(/Recently Updated Items/i)).toBeInTheDocument();
  });

});
