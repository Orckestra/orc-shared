import inputs from "./index";

describe("Input field collection", () => {
	it("contains a list of named inputs", () =>
		expect(inputs, "to exhaustively satisfy", {
			Button: expect.it("to be a function"),
			DateInput: expect.it("to be a function"),
			MultiSelector: expect.it("to be a function"),
			ReadOnly: expect.it("to be a function"),
			Selector: expect.it("to be a function"),
			SwitchInput: expect.it("to be a function"),
			TextInput: expect.it("to be a function"),
		}));
});
