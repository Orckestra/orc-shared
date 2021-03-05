import { mapModel } from "./mapHelper";

describe("mapModel", () => {
	const model = {
		field1: {
			value: "Hello",
		},
		field2: {
			value: "Bob",
		},
		field3: {
			value: false,
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
		};

		expect(resultModel, "to equal", expectedResultModel);
	});

	it("Maps using a custom mapper", () => {
		const mapRules = [
			{
				modelName: "field2",
				transform: (model, modelValue, result) => {
					result.otherField = modelValue;
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
		};

		expect(resultModel, "to equal", expectedResultModel);
	});

	it("Maps correctly when initial model is null", () => {
		const resultModel = mapModel(model);

		const expectedResultModel = {
			field1: "Hello",
			field2: "Bob",
			field3: false,
		};

		expect(resultModel, "to equal", expectedResultModel);
	});
});
