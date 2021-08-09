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
		nestedField2: {
			field: {
				value: [
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: {
							value: {
								nestedLevel2Prop1: {
									value: "testLevel2Value",
									wasModified: true,
								},
								nestedLevel2Prop2: "testLevel2",
							},
							wasModified: true,
						},
					},
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: [
							{
								nestedLevel2Prop1: {
									value: "testLevel2Value",
									wasModified: true,
								},
								nestedLevel2Prop2: "testLevel2",
							},
						],
					},
				],
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
			nestedField2: {
				field: [
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: {
							nestedLevel2Prop1: "testLevel2Value",
							nestedLevel2Prop2: "testLevel2",
						},
					},
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: [
							{
								nestedLevel2Prop1: "testLevel2Value",
								nestedLevel2Prop2: "testLevel2",
							},
						],
					},
				],
			},
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
			nestedField2: {
				field: [
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: {
							nestedLevel2Prop1: "testLevel2Value",
							nestedLevel2Prop2: "testLevel2",
						},
					},
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: [
							{
								nestedLevel2Prop1: "testLevel2Value",
								nestedLevel2Prop2: "testLevel2",
							},
						],
					},
				],
			},
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
			nestedField2: {
				field: [
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: {
							nestedLevel2Prop1: "testLevel2Value",
							nestedLevel2Prop2: "testLevel2",
						},
					},
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: [
							{
								nestedLevel2Prop1: "testLevel2Value",
								nestedLevel2Prop2: "testLevel2",
							},
						],
					},
				],
			},
		};

		expect(resultModel, "to equal", expectedResultModel);
	});

	it("Maps using a custom mapper rule where modeName is not correct", () => {
		const mapRules = [
			{
				modelName: "wrongField",
				transform: (objValue, srcValue, object) => {
					object.name = srcValue;
				},
			},
		];

		const resultModel = mapModel(model, initialModel, mapRules);

		const expectedResultModel = {
			field1: "Hello",
			field2: "Bob",
			field3: false,
			field4: "Prop to add",
			name: "Carl",
			nestedField: { field: "nestedValue" },
			nestedField2: {
				field: [
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: {
							nestedLevel2Prop1: "testLevel2Value",
							nestedLevel2Prop2: "testLevel2",
						},
					},
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: [
							{
								nestedLevel2Prop1: "testLevel2Value",
								nestedLevel2Prop2: "testLevel2",
							},
						],
					},
				],
			},
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
			nestedField2: {
				field: [
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: {
							nestedLevel2Prop1: "testLevel2Value",
							nestedLevel2Prop2: "testLevel2",
						},
					},
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: [
							{
								nestedLevel2Prop1: "testLevel2Value",
								nestedLevel2Prop2: "testLevel2",
							},
						],
					},
				],
			},
		};

		expect(resultModel, "to equal", expectedResultModel);
	});

	it("Maps correctly when some modified values are null", () => {
		const modelWithNull = { ...model, ...{ field1: { value: null, wasModified: true } } };
		const resultModel = mapModel(modelWithNull, initialModel);

		const expectedResultModel = {
			field1: null,
			field2: "Bob",
			field3: false,
			field4: "Prop to add",
			name: "Carl",
			nestedField: { field: "nestedValue" },
			nestedField2: {
				field: [
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: {
							nestedLevel2Prop1: "testLevel2Value",
							nestedLevel2Prop2: "testLevel2",
						},
					},
					{
						nestedLevel1Prop1: "test",
						nestedLevel1Prop2: [
							{
								nestedLevel2Prop1: "testLevel2Value",
								nestedLevel2Prop2: "testLevel2",
							},
						],
					},
				],
			},
		};

		expect(resultModel, "to equal", expectedResultModel);
	});
});
