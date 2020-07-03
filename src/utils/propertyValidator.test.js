import { isStringNullOrWhitespace } from "./propertyValidator"

describe("isStringNullOrWhitespace", () => {
  it("Retrieves true if passed string is undefined", () => {
    const result = isStringNullOrWhitespace();

    expect(result, "to be true");
  });

  it("Retrieves true if passed string is whitespace", () => {
    const string = "               ";
    const result = isStringNullOrWhitespace(string);

    expect(result, "to be true");
  });

  it("Retrieves false if passed string is not null or whitespace", () => {
    const string = "       15        ";
    const result = isStringNullOrWhitespace(string);

    expect(result, "to be false");
  });
});