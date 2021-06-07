import { createObjectWithKeysAndValues } from "./objectHelper";

describe("objectHelper", () => {
	it("Retrieves empty object if no keys were passed", () => {
		const result = createObjectWithKeysAndValues();

		expect(result, "to equal", {});
	});

	it("Retrieves keys with default values when values array not corresponds to keys array", () => {
		const keys = ["en-US", "en-CA", "fr-FR"];
		const result = createObjectWithKeysAndValues(keys);
		const expected = {
			"en-US": "",
			"en-CA": "",
			"fr-FR": "",
		};
		expect(result, "to equal", expected);
	});

	it("Retrieves keys with values when values array corresponds to keys array", () => {
		const keys = ["en-US", "en-CA", "fr-FR"];
		const values = ["Hello", "Pretty", "World"];
		const result = createObjectWithKeysAndValues(keys, values);
		const expected = {
			"en-US": "Hello",
			"en-CA": "Pretty",
			"fr-FR": "World",
		};
		expect(result, "to equal", expected);
	});

	it("Retrieves keys with values and default values when values array corresponds to keys array but some values are nulls", () => {
		const keys = ["en-US", "en-CA", "fr-FR"];
		const values = ["Hello", null, "World"];
		const result = createObjectWithKeysAndValues(keys, values);
		const expected = {
			"en-US": "Hello",
			"en-CA": "",
			"fr-FR": "World",
		};
		expect(result, "to equal", expected);
	});

	it("Retrieves keys with default values when values array not corresponds to keys array and there is custom default value", () => {
		const keys = ["en-US", "en-CA", "fr-FR"];
		const result = createObjectWithKeysAndValues(keys, [], "default");
		const expected = {
			"en-US": "default",
			"en-CA": "default",
			"fr-FR": "default",
		};
		expect(result, "to equal", expected);
	});
});
