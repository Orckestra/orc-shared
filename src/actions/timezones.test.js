import { RSAA } from "redux-api-middleware";
import { GET_TIMEZONES_REQUEST, GET_TIMEZONES_SUCCESS, GET_TIMEZONES_FAILURE, getTimezones } from "./timezones";

jest.mock("../utils/buildUrl", () => {
  const modExport = {};
  modExport.loadConfig = () => Promise.resolve({});
  modExport.buildUrl = (path = []) => "URL: " + path.join("/");
  return modExport;
});

describe("getTimezones", () => {
  it("creates a RSAA to get timezones", () =>
    expect(getTimezones, "when called", "to exhaustively satisfy", {
      [RSAA]: {
        types: [GET_TIMEZONES_REQUEST, GET_TIMEZONES_SUCCESS, GET_TIMEZONES_FAILURE],
        endpoint: "URL: timezones",
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
