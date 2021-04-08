import { mapModel } from "./mapHelper";

describe("mapModel", () => {
	const model = {
		field1: {
			value: "Hello",
			wasModified: true,
		},
		field2: {
			value: "Bob",
			wasModified: true,
		},
		field3: {
			value: false,
			wasModified: true,
		},
		nestedField: {
			field: {
				value: "nestedValue",
				wasModified: true,
			},
		},
	};

	const initialModel = {
		field1: "Default greetings",
		name: "Carl",
		field4: "Prop to add",
	};

	it("Maps correctly when there aren't any specific map rules", () => {
		const resultModel = mapModel(model, initialModel);

		const expectedResultModel = {
			field1: "Hello",
			field2: "Bob",
			field3: false,
			field4: "Prop to add",
			name: "Carl",
			nestedField: { field: "nestedValue" },
		};

		expect(resultModel, "to equal", expectedResultModel);
	});

	it("Maps correctly when map rules are specified", () => {
		const mapRules = [
			{
				modelName: "field2",
				domainName: "name",
			},
		];

		const resultModel = mapModel(model, initialModel, mapRules);

		const expectedResultModel = {
			field1: "Hello",
			name: "Bob",
			field3: false,
			field4: "Prop to add",
			nestedField: { field: "nestedValue" },
		};

		expect(resultModel, "to equal", expectedResultModel);
	});

	it("Maps using a custom mapper", () => {
		const mapRules = [
			{
				modelName: "field2",
				transform: (objValue, srcValue, object) => {
					object.otherField = srcValue;
				},
			},
		];

		const resultModel = mapModel(model, initialModel, mapRules);

		const expectedResultModel = {
			field1: "Hello",
			name: "Carl",
			field3: false,
			field4: "Prop to add",
			otherField: "Bob",
			field2: "Bob",
			nestedField: { field: "nestedValue" },
		};

		expect(resultModel, "to equal", expectedResultModel);
	});

	it("Maps using a custom mapper with several rules", () => {
		const mapRules = [
			{
				modelName: "nestedField.field",
				transform: (objValue, srcValue, object) => {
					object.nestedField.field = `${srcValue} updated`;
				},
			},
			{
				modelName: "field1",
				transform: (objValue, srcValue, object) => {
					object.field1 = `${srcValue} updated`;
				},
			},
			{
				modelName: "field2",
				transform: (objValue, srcValue, object) => {
					object.name = srcValue;
				},
			},
		];

		const resultModel = mapModel(model, initialModel, mapRules);

		const expectedResultModel = {
			field1: "Hello updated",
			name: "Bob",
			field3: false,
			field4: "Prop to add",
			field2: "Bob",
			nestedField: { field: "nestedValue updated" },
		};

		expect(resultModel, "to equal", expectedResultModel);
	});

	it("Maps correctly when initial model is null", () => {
		const resultModel = mapModel(model);

		const expectedResultModel = {
			field1: "Hello",
			field2: "Bob",
			field3: false,
			nestedField: { field: "nestedValue" },
		};

		expect(resultModel, "to equal", expectedResultModel);
	});
});
