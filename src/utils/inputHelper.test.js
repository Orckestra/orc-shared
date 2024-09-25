import { limitNumericValueLength, trimSpacesAndLeadingZeros } from "./inputHelper";

describe("Numeric Input Helper", () => {
	it("trimSpacesAndLeadingZeros trims spaces and leading zeros", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", ["  00013 "], "to equal", "13");
	});

	it("trimSpacesAndLeadingZeros trims spaces and leading zeros returning 0 when 000 value", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", [" 000  ", "def"], "to equal", "0");
	});

	it("trimSpacesAndLeadingZeros trims spaces and leading zeros returning fallback when empty string value", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", ["", "def"], "to equal", "def");
	});

	it("trimSpacesAndLeadingZeros trims spaces and leading zeros returning 0 when 0 value", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", [" 0 ", "def"], "to equal", "0");
	});

	it("trimSpacesAndLeadingZeros should work on floating values", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", ["042.2", "def"], "to equal", "42.2");
	});

	it("trimSpacesAndLeadingZeros should work on negative values", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", ["-0012.2", "def"], "to equal", "-12.2");
	});

	it("trimSpacesAndLeadingZeros returns fallback on null value", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", [null, "def"], "to equal", "def");
	});

	it("trimSpacesAndLeadingZeros returns fallback on undefined value", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", [undefined, "def"], "to equal", "def");
	});

	it("trimSpacesAndLeadingZeros returns fallback when value is not a number", () => {
		expect(trimSpacesAndLeadingZeros, "when called with", ["hello", "def"], "to equal", "def");
	});

	it("limitNumericValueLength trims extra characters", () => {
		expect(limitNumericValueLength, "when called with", ["01234567890"], "to equal", "012345678");
	});

	it("limitNumericValueLength trims extra characters with another maximum", () => {
		expect(limitNumericValueLength, "when called with", ["01234567890", 5], "to equal", "01234");
	});
});
