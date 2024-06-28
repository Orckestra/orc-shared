import { limitNumericValueLength, trimSpacesAndLeadingZeros } from "./inputHelper";

describe("Numeric Input Helper", () => {
	it("trimSpacesAndLeadingZeros trims spaces and leading zeros", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", ["  00013 "], "to equal", "13");
	});

	it("trimSpacesAndLeadingZeros trims spaces and leading zeros returning fallback value", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", [" 000  ", "def"], "to equal", "def");
	});

	it("limitNumericValueLength trims extra characters", () => {
		expect(limitNumericValueLength, "when called with", ["01234567890"], "to equal", "012345678");
	});

	it("limitNumericValueLength trims extra characters with another maximum", () => {
		expect(limitNumericValueLength, "when called with", ["01234567890", 5], "to equal", "01234");
	});
});
