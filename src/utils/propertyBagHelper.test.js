import React from "react";
import { useIntl } from "react-intl";
import {
	customDataType,
	toJsonCargo,
	formatNumber,
	fixPropertyBagModifiedModel,
	setRequiredBooleansDefault,
	getPropertyBagFormattedPrimitiveValue,
	isTieredAttribute,
} from "./propertyBagHelper";
import { createMuiTheme, extractMessages, TestWrapper } from "./testUtils";
import { mount } from "enzyme";
import Immutable from "immutable";
import sharedMessages from "~/sharedMessages";
import _ from "lodash";
import { attributeDataType } from "../constants";

const messages = extractMessages(sharedMessages);
const theme = createMuiTheme();

describe("toJsonCargo function", () => {
	it("should throw if called with an unknown data type", () => {
		const attribute = {
			dataType: "aDataType",
		};

		expect(
			() => expect(toJsonCargo, "when called with", [attribute, {}]),
			"to throw",
			"toJsonCargo: attribute.dataType aDataType is not implemented",
		);
	});

	it("should throw if called with an unknown custom data type", () => {
		const attribute = {
			dataType: attributeDataType.customType,
			customDataType: "aCustomDataType",
		};

		expect(
			() => expect(toJsonCargo, "when called with", [attribute, {}]),
			"to throw",
			"toJsonCargo: attribute.customDataType aCustomDataType is not implemented",
		);
	});

	it.each([
		["aTextValue", attributeDataType.text, null, "aTextValue"],
		["aPassword", attributeDataType.customType, customDataType.password, "aPassword"],
		[
			"aCarrierProviderSelector",
			attributeDataType.customType,
			customDataType.carrierProviderSelector,
			"aCarrierProviderSelector",
		],
		[
			"aRoutingProviderSelector",
			attributeDataType.customType,
			customDataType.routingProviderSelector,
			"aRoutingProviderSelector",
		],
		[
			"aMultipleCarrierProvidersSelector",
			attributeDataType.customType,
			customDataType.multipleCarrierProvidersSelector,
			"aMultipleCarrierProvidersSelector",
		],
		[true, attributeDataType.boolean, null, { __type: "ValueOfBoolean", value: true }],
		[false, attributeDataType.boolean, null, { __type: "ValueOfBoolean", value: false }],
		[5, attributeDataType.integer, null, { __type: "ValueOfInt32", value: 5 }],
		[
			"2021-04-26T04:00:00.0000000Z",
			attributeDataType.dateTime,
			null,
			{ __type: "ValueOfDateTime", value: "2021-04-26T04:00:00.0000000Z" },
		],
		[15.4321, attributeDataType.decimal, null, { __type: "ValueOfDouble", value: 15.4321 }],
		[15.4321, attributeDataType.customType, customDataType.money, { __type: "ValueOfDouble", value: 15.43 }],
		[15.4285, attributeDataType.customType, customDataType.money, { __type: "ValueOfDouble", value: 15.43 }],
		[
			["d22679f2-5807-4068-b17f-700742d97503"],
			attributeDataType.entityReference,
			null,
			{ __type: "ValueOfGuid[]", value: ["d22679f2-5807-4068-b17f-700742d97503"] },
		],
		[
			[
				{ min: "1.11", max: "2.22", rate: "1" },
				{ min: "2.22", rate: "2" },
			],
			attributeDataType.customType,
			customDataType.priceTieredRateTable,
			{
				__type: "Orckestra.Overture.Entities.Orders.TieredRateTable, Orckestra.Overture.Entities",
				tiers: [
					{ min: "1.11", max: "2.22", rate: "1" },
					{ min: "2.22", rate: "2" },
				],
			},
		],
		[
			[
				{ min: "1", max: "2", rate: "1" },
				{ min: "2", rate: "2" },
			],
			attributeDataType.customType,
			customDataType.quantityTieredRateTable,
			{
				__type: "Orckestra.Overture.Entities.Orders.TieredRateTable, Orckestra.Overture.Entities",
				tiers: [
					{ min: "1", max: "2", rate: "1" },
					{ min: "2", rate: "2" },
				],
			},
		],
		[
			[{ min: null, max: "2", rate: "1" }, null, { min: "2", rate: "2" }],
			attributeDataType.customType,
			customDataType.quantityTieredRateTable,
			{
				__type: "Orckestra.Overture.Entities.Orders.TieredRateTable, Orckestra.Overture.Entities",
				tiers: [{ min: "2", rate: "2" }],
			},
		],
		["aRadioValue", attributeDataType.singleChoice, null, "aRadioValue"],
		[
			["aCheckboxValue1", "aCheckboxValue1"],
			attributeDataType.multipleChoice,
			null,
			{ __type: "ValueOfString[]", value: ["aCheckboxValue1", "aCheckboxValue1"] },
		],
	])("should return the proper json cargo with %s of type %s", (value, dataType, customType, expectedCargo) => {
		const attribute = {
			dataType: dataType,
			customDataType: customType,
		};

		expect(toJsonCargo(attribute, value), "to equal", expectedCargo);
	});
});

describe("formatNumber function", () => {
	it.each([
		["16", 15.551, 0],
		["15.6", "15.551", 1],
		["15.55", "15.551", 2],
		["-16", -15.551, 0],
		["-15.6", "-15.551", 1],
		["-15.55", "-15.551", 2],
		["8.0", "8", 1],
		["4.00", 4, 2],
		["4.40", 4.4, 2],
		["-8.0", "-8", 1],
		["-4.00", -4, 2],
		["-4.40", -4.4, 2],
	])("should return %s with value %s and precision %s", (expected, value, precision) => {
		expect(formatNumber(value, precision), "to equal", expected);
	});
});

describe("fixPropertyBagModifiedModel", () => {
	it.each([
		[{ propertyBag: { name: "Name" } }, { propertyBag: { name: "Name" } }],
		[{ propertyBag: { name: true } }, { propertyBag: { name: true } }],
		[{ propertyBag: { name: false } }, { propertyBag: { name: false } }],
		[{ propertyBag: { name: "" } }, { propertyBag: { name: null } }],
		[{ propertyBag: { name: { value: "name" } } }, { propertyBag: { name: { value: "name" } } }],
		[{ propertyBag: { name: { value: false } } }, { propertyBag: { name: { value: false } } }],
		[{ propertyBag: { name: { value: "" } } }, { propertyBag: { name: null } }],
		[{ profileOperations: {} }, { profileOperations: {} }],
		[
			{ profileOperations: { profilesToAdd: { obj: { propertyBag: { name: "" } } }, profilesToUpdate: {} } },
			{ profileOperations: { profilesToAdd: { obj: { propertyBag: { name: null } } }, profilesToUpdate: {} } },
		],
		[
			{ profileOperations: { profilesToAdd: [{ propertyBag: { name: "" } }], profilesToUpdate: {} } },
			{ profileOperations: { profilesToAdd: [{ propertyBag: { name: null } }], profilesToUpdate: {} } },
		],
		[
			{ profileOperations: { profilesToAdd: {}, profilesToUpdate: { obj: { propertyBag: { name: "" } } } } },
			{ profileOperations: { profilesToAdd: {}, profilesToUpdate: { obj: { propertyBag: { name: null } } } } },
		],
		[
			{ profileOperations: { profilesToAdd: {}, profilesToUpdate: [{ propertyBag: { name: "" } }] } },
			{ profileOperations: { profilesToAdd: {}, profilesToUpdate: [{ propertyBag: { name: null } }] } },
		],
	])("For model %s should return %s", (model, expected) => {
		fixPropertyBagModifiedModel(model);
		expect(model, "to equal", expected);
	});

	it("should fix propertyBag for specified Array Field", () => {
		const model = {
			propertyBag: {
				name: { value: "Name" },
				age: { value: "" },
			},
			addresses: {
				value: [
					{ id: "1", propertyBag: { name: "Name" } },
					{ id: "2", propertyBag: { name: "" } },
					{ id: "3", propertyBag: { name: { value: "" } } },
					{ id: "4", propertyBag: { name: { value: "value" } } },
				],
			},
		};

		const expected = {
			propertyBag: {
				name: { value: "Name" },
				age: null,
			},
			addresses: {
				value: [
					{ id: "1", propertyBag: { name: "Name" } },
					{ id: "2", propertyBag: { name: null } },
					{ id: "3", propertyBag: { name: null } },
					{ id: "4", propertyBag: { name: { value: "value" } } },
				],
			},
		};
		fixPropertyBagModifiedModel(model, "addresses");
		expect(model, "to equal", expected);
	});

	it("should fix propertyBag for specified object Field", () => {
		const model = {
			propertyBag: {
				name: { value: "Name" },
				age: { value: "" },
			},
			addresses: {
				value: { id: "1", propertyBag: { name: "" } },
			},
		};

		const expected = {
			propertyBag: {
				name: { value: "Name" },
				age: null,
			},
			addresses: {
				value: { id: "1", propertyBag: { name: null } },
			},
		};
		fixPropertyBagModifiedModel(model, "addresses");
		expect(model, "to equal", expected);
	});

	it("should fix propertyBag for unknown Array Field", () => {
		const model = {
			propertyBag: {
				name: { value: "Name" },
				age: { value: "" },
			},
			addresses: {
				value: [
					{ id: "1", propertyBag: { name: "Name" } },
					{ id: "2", propertyBag: { name: "" } },
					{ id: "3", propertyBag: { name: { value: "" } } },
					{ id: "4", propertyBag: { name: { value: "value" } } },
				],
			},
		};

		const expected = {
			propertyBag: {
				name: { value: "Name" },
				age: null,
			},
			addresses: {
				value: [
					{ id: "1", propertyBag: { name: "Name" } },
					{ id: "2", propertyBag: { name: "" } },
					{ id: "3", propertyBag: { name: { value: "" } } },
					{ id: "4", propertyBag: { name: { value: "value" } } },
				],
			},
		};
		fixPropertyBagModifiedModel(model, "unknown");
		expect(model, "to equal", expected);
	});

	it("should fix propertyBag for Array Field with null values", () => {
		const model = {
			propertyBag: {
				name: { value: "Name" },
				age: { value: "" },
			},
			addresses: {
				value: null,
			},
		};

		const expected = {
			propertyBag: {
				name: { value: "Name" },
				age: null,
			},
			addresses: {
				value: null,
			},
		};
		fixPropertyBagModifiedModel(model, "addresses");
		expect(model, "to equal", expected);
	});

	it("should not fail when result doesn't have propertyBag", () => {
		let model = {};
		fixPropertyBagModifiedModel(model);
		expect(model, "to equal", {});
	});
});

describe("setRequiredBooleansDefault", () => {
	it("should set defaults values for required booleans only", () => {
		const attributes = [
			{
				name: "anAttributeName1",
				dataType: attributeDataType.boolean,
				isRequired: true,
			},
			{
				name: "anAttributeName2",
				dataType: attributeDataType.boolean,
			},
			{
				name: "anAttributeName3",
				dataType: attributeDataType.integer,
				isRequired: true,
			},
		];

		const propertyBag = {};

		setRequiredBooleansDefault(attributes, propertyBag);

		expect(Object.keys(propertyBag).length, "to equal", 1);
		expect(propertyBag["anAttributeName1"], "to equal", { __type: "ValueOfBoolean", value: false });
	});

	it("should do nothing for known booleans", () => {
		const attributes = [
			{
				name: "anAttributeName1",
				dataType: attributeDataType.boolean,
				isRequired: true,
			},
			{
				name: "anAttributeName2",
				dataType: attributeDataType.boolean,
			},
			{
				name: "anAttributeName3",
				dataType: attributeDataType.integer,
				isRequired: true,
			},
		];

		const propertyBag = {
			anAttributeName1: { __type: "ValueOfBoolean", value: true },
		};

		setRequiredBooleansDefault(attributes, propertyBag);

		expect(Object.keys(propertyBag).length, "to equal", 1);
		expect(propertyBag["anAttributeName1"], "to equal", { __type: "ValueOfBoolean", value: true });
	});
});

const propertyBagValuesWithStandardValues = {
	GuidValue: {
		__type: "ValueOfGuid",
		value: "414641705edb4f7f905ffeb06aacb8f2",
	},
	BooleanValue: {
		__type: "ValueOfBoolean",
		value: true,
	},
	BooleanValueFalse: {
		__type: "ValueOfBoolean",
		value: false,
	},
	ByteValue: {
		__type: "ValueOfByte",
		value: 4,
	},
	SByteValue: {
		__type: "ValueOfSByte",
		value: 85,
	},
	Int16Value: {
		__type: "ValueOfInt16",
		value: -16,
	},
	UInt16Value: {
		__type: "ValueOfUInt16",
		value: 16,
	},
	Int32Value: {
		__type: "ValueOfInt32",
		value: -32,
	},
	UInt32Value: {
		__type: "ValueOfUInt32",
		value: 32,
	},
	Int64Value: {
		__type: "ValueOfInt64",
		value: -64,
	},
	UInt64Value: {
		__type: "ValueOfUInt64",
		value: 64,
	},
	SingleValue: {
		__type: "ValueOfSingle",
		value: 12.344,
	},
	DoubleValue: {
		__type: "ValueOfDouble",
		value: 34.567,
	},
	DecimalValue: {
		__type: "ValueOfDecimal",
		value: 56.7,
	},
	DateTimeValue: {
		__type: "ValueOfDateTime",
		value: "2021-05-19T19:37:50.1805767Z",
	},
	CharValue: {
		__type: "ValueOfChar",
		value: "c",
	},
	StringValueOtherFormat: {
		__type: "ValueOfString",
		value: "str value other value",
	},
	NullStringValue: {
		__type: "ValueOfString",
		value: null,
	},
	UndefinedStringValue: {
		__type: "ValueOfString",
		value: undefined,
	},
	StringValue: "str value",
};

const propertyBagValuesWithValueContainer = {
	GuidValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Guid, mscorlib]], Orckestra.Overture.Entities",
		value: "414641705edb4f7f905ffeb06aacb8f2",
	},
	BooleanValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Boolean, mscorlib]], Orckestra.Overture.Entities",
		value: true,
	},
	BooleanValueFalse: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Boolean, mscorlib]], Orckestra.Overture.Entities",
		value: false,
	},
	ByteValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Byte, mscorlib]], Orckestra.Overture.Entities",
		value: 4,
	},
	SByteValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.SByte, mscorlib]], Orckestra.Overture.Entities",
		value: 85,
	},
	Int16Value: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Int16, mscorlib]], Orckestra.Overture.Entities",
		value: -16,
	},
	UInt16Value: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.UInt16, mscorlib]], Orckestra.Overture.Entities",
		value: 16,
	},
	Int32Value: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Int32, mscorlib]], Orckestra.Overture.Entities",
		value: -32,
	},
	UInt32Value: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.UInt32, mscorlib]], Orckestra.Overture.Entities",
		value: 32,
	},
	Int64Value: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Int64, mscorlib]], Orckestra.Overture.Entities",
		value: -64,
	},
	UInt64Value: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.UInt64, mscorlib]], Orckestra.Overture.Entities",
		value: 64,
	},
	SingleValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Single, mscorlib]], Orckestra.Overture.Entities",
		value: 12.344,
	},
	DoubleValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Double, mscorlib]], Orckestra.Overture.Entities",
		value: 34.567,
	},
	DecimalValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Decimal, mscorlib]], Orckestra.Overture.Entities",
		value: 56.7,
	},
	DateTimeValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.DateTime, mscorlib]], Orckestra.Overture.Entities",
		value: "2021-05-19T19:37:50.1805767Z",
	},
	CharValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.Char, mscorlib]], Orckestra.Overture.Entities",
		value: "c",
	},
	StringValueOtherFormat: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.String, mscorlib]], Orckestra.Overture.Entities",
		value: "str value other value",
	},
	NullStringValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.String, mscorlib]], Orckestra.Overture.Entities",
		value: null,
	},
	UndefinedStringValue: {
		__type: "Orckestra.Overture.Entities.ValueContainer`1[[System.String, mscorlib]], Orckestra.Overture.Entities",
		value: undefined,
	},
	StringValue: "str value",
};

describe.each([
	["with standard values", propertyBagValuesWithStandardValues],
	["with ValueContainer", propertyBagValuesWithValueContainer],
])("getPropertyBagFormattedPrimitiveValue %s", (title, propertyBagValues) => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en-US",
			},
		});

		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: () => {},
		};
	});

	it.each([
		["GuidValue", "41464170-5edb-4f7f-905f-feb06aacb8f2"],
		["BooleanValue", "True"],
		["BooleanValueFalse", "False"],
		["NullStringValue", null],
		["UndefinedStringValue", null],
		["ByteValue", "4"],
		["SByteValue", "85"],
		["Int16Value", "-16"],
		["UInt16Value", "16"],
		["Int32Value", "-32"],
		["UInt32Value", "32"],
		["Int64Value", "-64"],
		["UInt64Value", "64"],
		["SingleValue", "12.34"],
		["DoubleValue", "34.57"],
		["DecimalValue", "56.70"],
		["DateTimeValue", "5/19/2021 7:37 PM"],
		["CharValue", "c"],
		["StringValueOtherFormat", "str value other value"],
		["StringValue", "str value"],
	])("Formatting %s", (dataType, expectedFormattedValue) => {
		let pbFormatter;

		const TestComp = () => {
			const { formatMessage, formatDate, formatTime } = useIntl();
			pbFormatter = value => {
				return getPropertyBagFormattedPrimitiveValue(value, formatMessage, formatDate, formatTime);
			};
			return null;
		};

		mount(
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<TestComp />
			</TestWrapper>,
		);

		const formattedValue = pbFormatter(propertyBagValues[dataType]);

		expect(formattedValue, "to equal", expectedFormattedValue);
	});

	it.each([
		["ByteValue", "4.6", "5"],
		["SByteValue", "85.3", "85"],
		["Int16Value", "-16.3", "-16"],
		["UInt16Value", "16.3", "16"],
		["Int32Value", "-32.3", "-32"],
		["UInt32Value", "32.3", "32"],
		["Int64Value", "-64.3", "-64"],
		["UInt64Value", "64.3", "64"],
	])("Whole number should not have decimal data type %s %s", (dataType, value, expectedValue) => {
		let pbFormatter;

		const TestComp = () => {
			const { formatMessage, formatDate, formatTime } = useIntl();
			pbFormatter = value => {
				return getPropertyBagFormattedPrimitiveValue(value, formatMessage, formatDate, formatTime);
			};
			return null;
		};

		mount(
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<TestComp />
			</TestWrapper>,
		);

		const pbValue = _.cloneDeep(propertyBagValues[dataType]);
		pbValue.value = value;

		const formattedValue = pbFormatter(pbValue);

		expect(formattedValue, "to equal", expectedValue);
	});

	it.each([[null], [undefined], [0], [123], [""], [false], ["Some text"]])(
		"Non object value %s is not formatted",
		stringToFormat => {
			let pbFormatter;

			const TestComp = () => {
				const { formatMessage, formatDate, formatTime } = useIntl();
				pbFormatter = value => {
					return getPropertyBagFormattedPrimitiveValue(value, formatMessage, formatDate, formatTime);
				};
				return null;
			};

			mount(
				<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
					<TestComp />
				</TestWrapper>,
			);

			const formattedValue = pbFormatter(stringToFormat);

			expect(formattedValue, "to be", stringToFormat);
		},
	);

	it("Null JsCargo value is not formatted", () => {
		let pbFormatter;

		const TestComp = () => {
			const { formatMessage, formatDate, formatTime } = useIntl();
			pbFormatter = value => {
				return getPropertyBagFormattedPrimitiveValue(value, formatMessage, formatDate, formatTime);
			};
			return null;
		};

		mount(
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<TestComp />
			</TestWrapper>,
		);

		const formattedValue = pbFormatter({
			__type: "ValueOfUInt16",
			value: null,
		});

		expect(formattedValue, "to be", null);
	});

	it("Unknown datatype returns null", () => {
		let pbFormatter;

		const TestComp = () => {
			const { formatMessage, formatDate, formatTime } = useIntl();
			pbFormatter = value => {
				return getPropertyBagFormattedPrimitiveValue(value, formatMessage, formatDate, formatTime);
			};
			return null;
		};

		mount(
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<TestComp />
			</TestWrapper>,
		);

		const formattedValue = pbFormatter({
			__type: "ValueOfTheUnknown",
			value: "SomeValue",
		});

		expect(formattedValue, "to be", null);
	});
});

describe("isTieredAttribute", () => {
	it("should return true if priceTieredRateTable", () => {
		expect(isTieredAttribute({ customDataType: customDataType.priceTieredRateTable }), "to equal", true);
	});

	it("should return true if quantityTieredRateTable", () => {
		expect(isTieredAttribute({ customDataType: customDataType.quantityTieredRateTable }), "to equal", true);
	});

	it("should return false if unknown value", () => {
		expect(isTieredAttribute("unknown type"), "to equal", false);
	});
});
