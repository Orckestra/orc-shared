import PaperProps, { isPaperProps } from "./paperProps";

describe("Paper Props", () => {
	it("Contains necessary rule and prop names", () => {
		const propNames = ["elevation", "square", "variant"];
		const rulesNames = ["root"];

		expect(PaperProps.propNames, "to have keys", propNames);
		expect(PaperProps.ruleNames, "to have keys", rulesNames);
	});

	it("Puts keys in component props and classes maps", () => {
		const propNames = ["elevation", "square", "variant"];
		const rulesNames = ["root"];

		const paperProps = new PaperProps();

		const propNameKeys = Array.from(paperProps.componentProps.keys());
		const ruleNameKeys = Array.from(paperProps.componentClasses.keys());

		expect(propNameKeys, "to equal", propNames);
		expect(ruleNameKeys, "to equal", rulesNames);
	});
});

describe("isPaperProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isPaperProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isPaperProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is PaperProps", () => {
		expect(isPaperProps(new PaperProps()), "to be true");
	});

	it("Returns true if passed value has property _isPaperProps and it's true", () => {
		expect(isPaperProps({ _isPaperProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isPaperProps and it's false or missing", () => {
		expect(isPaperProps({}), "to be false");
		expect(isPaperProps({ _isPaperProps: false }), "to be false");
	});
});
