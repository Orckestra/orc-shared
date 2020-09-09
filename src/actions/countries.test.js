import { RSAA } from "redux-api-middleware";
import { GET_COUNTRIES_REQUEST, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_FAILURE, getCountries } from "./countries";

jest.mock("../utils/buildUrl", () => {
  const modExport = {};
  modExport.loadConfig = () => Promise.resolve({});
  modExport.buildUrl = (path = []) => "URL: " + path.join("/");
  return modExport;
});

describe("getCountries", () => {
  it("creates a RSAA to get countries", () =>
    expect(getCountries, "when called", "to exhaustively satisfy", {
      [RSAA]: {
        types: [GET_COUNTRIES_REQUEST, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_FAILURE],
        endpoint: "URL: countries",
        method: "GET",
        body: undefined,
        credentials: "include",
        bailout: expect.it("to be a function"),
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json",
        },
        options: { redirect: "follow" },
      },
    }));
});
