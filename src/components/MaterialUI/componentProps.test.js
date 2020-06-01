import ComponentProps from "./componentProps";

describe("Component Props", () => {
	it("Sets the prop value", () => {
		const componentProps = new ComponentProps();

		componentProps.componentProps.set("key1", null);

		componentProps.set("key1", "value1");

		expect(componentProps.componentProps.get("key1"), "to equal", "value1");
	});

	it("Throws if prop key is missing", () => {
		const componentProps = new ComponentProps();

		const missingKey = () => {
			componentProps.set("key1", "value1");
		};

		expect(missingKey, "to throw");
	});

	it("Gets the prop value by key", () => {
		const componentProps = new ComponentProps();

		componentProps.componentProps.set("key1", null);

		componentProps.set("key1", "value1");

		expect(componentProps.get("key1"), "to equal", "value1");
	});

	it("Sets the style value", () => {
		const componentProps = new ComponentProps();

		componentProps.componentClasses.set("key1", null);

		componentProps.setStyle("key1", "value1");

		expect(componentProps.componentClasses.get("key1"), "to equal", "value1");
	});

	it("Throws if style key is missing", () => {
		const componentProps = new ComponentProps();

		const missingKey = () => {
			componentProps.setStyle("key1", "value1");
		};

		expect(missingKey, "to throw");
	});

	it("Gets the style value by key", () => {
		const componentProps = new ComponentProps();

		componentProps.componentClasses.set("key1", null);

		componentProps.setStyle("key1", "value1");

		expect(componentProps.getStyle("key1"), "to equal", "value1");
	});
});
