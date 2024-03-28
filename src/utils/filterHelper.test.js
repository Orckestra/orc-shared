import { allValue } from "~/constants";
import { substituteAllForNull, getValueWithAll, extractDropboxOptions } from "./filterHelper";
import Immutable from "immutable";

describe("getValueWithAll", () => {
	it("Retrieves allValue if value is null", () => {
		const result = getValueWithAll(null);

		expect(result, "to be", allValue);
	});

	it("Retrieves value if value is not null", () => {
		const result = getValueWithAll("value");

		expect(result, "to be", "value");
	});
});

describe("substituteAllForNull", () => {
	it("Retrieves null if value is allValue", () => {
		const result = substituteAllForNull(allValue);

		expect(result, "to be", null);
	});

	it("Retrieves value if value is not allValue", () => {
		const result = substituteAllForNull("value");

		expect(result, "to be", "value");
	});
});

describe("extractDropboxOptions", () => {
	it("Retrieves correct array if lookup is not null and is an immutable array", () => {
		const data = [
			{ value: "value1", isActive: true, label: "label1", sortOrder: 0, smth: "smth1" },
			{ value: "value2", isActive: false, label: "label2", sortOrder: 1, smth: "smth2" },
			{ value: "value3", isActive: true, label: "label3", sortOrder: 3, smth: "smth3" },
		];

		const lookup = Immutable.fromJS(data);

		const result = extractDropboxOptions(lookup);

		expect(result, "to equal", [
			{ value: "value1", label: "[value1]", sortOrder: 0 },
			{ value: "value3", label: "[value3]", sortOrder: 3 },
		]);
	});

	it("Retrieves correct array if lookup is not null and is an array", () => {
		const data = [
			{ value: "value4", isActive: true, label: "label4", sortOrder: 0, smth: "smth4" },
			{ value: "value5", isActive: false, label: "label5", sortOrder: 1, smth: "smth5" },
			{ value: "value6", isActive: true, label: "label6", sortOrder: 3, smth: "smth6" },
		];

		const lookups = data.map(x => Immutable.fromJS(x));

		const result = extractDropboxOptions(lookups);

		expect(result, "to equal", [
			{ value: "value4", label: "[value4]", sortOrder: 0 },
			{ value: "value6", label: "[value6]", sortOrder: 3 },
		]);
	});

	it("Retrieves correct array if lookup is not an array", () => {
		const data = {
			l1: { value: "value1", isActive: true, label: "label1", sortOrder: 0, smth: "smth1" },
			l2: { value: "value2", isActive: false, label: "label2", sortOrder: 1, smth: "smth2" },
			l3: { value: "value3", isActive: true, label: "label3", sortOrder: 3, smth: "smth3" },
		};

		const lookup = Immutable.fromJS(data);

		const result = extractDropboxOptions(lookup);

		expect(result, "to equal", [
			{ value: "value1", label: "[value1]", sortOrder: 0 },
			{ value: "value3", label: "[value3]", sortOrder: 3 },
		]);
	});

	it("Uses fallback label key", () => {
		const data = {
			l1: { value: "value1", isActive: true, label: "label1", sortOrder: 0, smth: "smth1" },
			l2: { value: "value2", isActive: false, label: "label2", sortOrder: 1, smth: "smth2" },
			l3: { value: "value3", isActive: true, label: "label3", sortOrder: 3, smth: "smth3" },
		};

		const lookup = Immutable.fromJS(data);

		const result = extractDropboxOptions(lookup, {
			fallbackLabelKey: "label",
		});

		expect(result, "to equal", [
			{ value: "value1", label: "label1", sortOrder: 0 },
			{ value: "value3", label: "label3", sortOrder: 3 },
		]);
	});

	it("Retrieves empty array if lookup is empty", () => {
		const result = extractDropboxOptions(Immutable.fromJS([]));

		expect(result, "to equal", []);
	});
});
