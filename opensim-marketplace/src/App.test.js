import React from "react";
import App from "./App";
import ItemScreen from "./components/ItemScreen/ItemScreen.jsx";
import axios from "axios";
jest.mock("axios");
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import Cookie from "js-cookie";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sign In/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Item Page", () => {
  test("Render ItemScreen Creator Info", async () => {
    Cookie.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          itemInfo: {
            name: "Rocks",
            assetType: 0,
            create_time: 1232324,
          },
          userInfo: {
            FirstName: "Jonas",
            LastName: "Wojtas",
          },
          invInfo: {
            inInventory: false,
          },
        },
      })
    );
    const { getByText, findByTestId } = render(<ItemScreen />);
    const linkElement = await findByTestId("items");
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Item Page", () => {
  test("Render ItemScreen Item Name Info", async () => {
    Cookie.get = jest
      .fn()
      .mockImplementation(() => "b07098d3-57e6-4e4c-a40f-7fae0eb65e4c");
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          itemInfo: {
            name: "Rocks",
            assetType: 0,
            create_time: 1232324,
          },
          userInfo: {
            FirstName: "Jonas",
            LastName: "Wojtas",
          },
          invInfo: {
            inInventory: false,
          },
        },
      })
    );
    const { getByText, findByTestId } = render(<ItemScreen />);
    const linkElement = await findByTestId("name");
    expect(linkElement).toBeInTheDocument();
  });
});
