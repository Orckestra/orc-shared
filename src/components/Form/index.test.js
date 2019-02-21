import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import Form from "./Form";
import FieldElements from "./FieldElements";
import {
	fieldHeight,
	calculateFormHeight,
	withCultureCount,
	addNamesToFields,
	FormPage,
} from "./index";

describe("FormPage", () => {
	let getUpdater, fields;
	beforeEach(() => {
		getUpdater = () => {};
		fields = [{ type: "TextInput", name: "text1", label: "A text" }];
	});

	it("renders a form and calculates a best-guess height", () =>
		expect(
			<FormPage
				fields={fields}
				values={{ text1: "foo" }}
				getUpdater={getUpdater}
			/>,
			"to render as",
			<Form h={77} wide={undefined}>
				<FieldElements
					getUpdater={getUpdater}
					fields={fields}
					values={{ text1: "foo" }}
				/>
			</Form>,
		));
});

describe("fieldHeight", () => {
	it("calculates the height of a single field", () =>
		expect(
			fieldHeight,
			"called with",
			[{ type: "TextInput", name: "text1" }, { text1: "foo" }],
			"to equal",
			30 + 20,
		));

	it("calculates the height of a single field with label", () =>
		expect(
			fieldHeight,
			"called with",
			[{ type: "TextInput", name: "text1", label: "A text" }, { text1: "foo" }],
			"to equal",
			27 + 30 + 20,
		));

	it("calculates the height of a field set", () =>
		expect(
			fieldHeight,
			"called with",
			[
				{
					type: "Fieldset",
					name: "set",
					label: "A text",
					fields: [
						{
							type: "TextInput",
							name: "var1",
							label: "A text",
						},
						{ type: "NumberInput", name: "var2", label: "A number" },
					],
				},
				{ var1: "foo", var2: 5 },
			],
			"to equal",
			47 + 77 + 77 + 20,
		));

	it("calculates the height of a combination field with outer label", () =>
		expect(
			fieldHeight,
			"called with",
			[
				{
					type: "Combination",
					name: "combo",
					label: "A text",
					proportions: [60, 40],
					fields: [
						{ type: "TextInput", name: "var1" },
						{ type: "NumberInput", name: "var2" },
					],
				},
				{ var1: "foo", var2: 5 },
			],
			"to equal",
			27 + 30 + 20,
		));

	it("calculates the height of a combination field with inner labels", () =>
		expect(
			fieldHeight,
			"called with",
			[
				{
					type: "Combination",
					name: "combo",
					proportions: [60, 40],
					fields: [
						{
							type: "TextInput",
							name: "var1",
							label: "A text",
						},
						{
							type: "NumberInput",
							name: "var2",
							label: "A number",
						},
					],
				},
				{ var1: "foo", var2: 5 },
			],
			"to equal",
			27 + 30 + 20,
		));

	it("calculates the height of a variable length list", () =>
		expect(
			fieldHeight,
			"called with",
			[
				{
					type: "List",
					name: "list",
					rowField: {
						type: "TextInput",
						name: "var1",
						label: "A text",
					},
				},
				{ list: [{ var1: "foo" }, { var1: "bar" }, { var1: "meep" }] },
			],
			"to equal",
			27 + 3 * 40 + 40 + 10,
		));

	it("calculates the height of an empty variable length list", () =>
		expect(
			fieldHeight,
			"called with",
			[
				{
					type: "List",
					name: "list",
					rowField: {
						type: "TextInput",
						name: "var1",
						label: "A text",
					},
				},
			],
			"to equal",
			27 + 0 * 40 + 40 + 10,
		));

	it("calculates the height of a fixed length list", () =>
		expect(
			fieldHeight,
			"called with",
			[
				{
					type: "List",
					name: "list",
					rowCount: 3,
					rowField: {
						type: "TextInput",
						name: "var1",
						label: "A text",
					},
				},
				{ list: [{ var1: "foo" }, { var1: "bar" }, { var1: "meep" }] },
			],
			"to equal",
			27 + 3 * 40 + 10,
		));

	it("calculates the height of a translation input with label", () =>
		expect(
			fieldHeight,
			"called with",
			[
				{
					type: "TranslationInput",
					name: "translate",
					label: "Translated text",
				},
				{},
				4,
			],
			"to equal",
			27 + 4 * 40 + 10,
		));

	it("calculates the height of a translation input without label", () =>
		expect(
			fieldHeight,
			"called with",
			[
				{
					type: "TranslationInput",
					name: "translate",
				},
				{},
				4,
			],
			"to equal",
			4 * 40 + 10,
		));
});

describe("calculateFormHeight", () => {
	it("determines the height a form needs to house its elements", () =>
		expect(
			calculateFormHeight,
			"called with",
			[
				1500,
				[
					{ type: "TextInput", name: "text1", label: "A text" },
					{
						type: "Fieldset",
						name: "set",
						label: "A text",
						fields: [
							{
								type: "TextInput",
								name: "var1",
								label: "A text",
							},
							{ type: "NumberInput", name: "var2", label: "A number" },
						],
					},
					{ type: "TextInput", name: "text2", label: "A different text" },
				],
			],
			"to equal",
			fieldHeight({
				type: "Fieldset",
				name: "set",
				label: "A text",
				fields: [
					{
						type: "TextInput",
						name: "var1",
						label: "A text",
					},
					{ type: "NumberInput", name: "var2", label: "A number" },
				],
			}),
		));

	it("stays within width bounds where possible", () =>
		expect(
			calculateFormHeight,
			"called with",
			[
				500,
				[
					{ type: "TextInput", name: "text1", label: "A text" },
					{
						type: "Fieldset",
						name: "set",
						label: "A text",
						fields: [
							{
								type: "TextInput",
								name: "var1",
								label: "A text",
							},
							{ type: "NumberInput", name: "var2", label: "A number" },
						],
					},
				],
			],
			"to equal",
			fieldHeight({ type: "TextInput", name: "text1", label: "A text" }) +
				fieldHeight({
					type: "Fieldset",
					name: "set",
					label: "A text",
					fields: [
						{
							type: "TextInput",
							name: "var1",
							label: "A text",
						},
						{ type: "NumberInput", name: "var2", label: "A number" },
					],
				}),
		));

	it("tries to set very large elements alone", () =>
		expect(
			calculateFormHeight,
			"called with",
			[
				2000,
				[
					{ type: "TextInput", name: "text1", label: "A text" },
					{ type: "TextInput", name: "text2", label: "A text" },
					{ type: "TextInput", name: "text3", label: "A text" },
					{ type: "TextInput", name: "text4", label: "A text" },
					{ type: "TextInput", name: "text5", label: "A text" },
					{
						type: "Fieldset",
						name: "set",
						label: "A text",
						fields: [
							{
								type: "List",
								name: "list",
								rowCount: 6,
								rowField: {
									type: "TextInput",
									name: "var1",
									label: "A text",
								},
							},
							{
								type: "TextInput",
								name: "var1",
								label: "A text",
							},
							{ type: "NumberInput", name: "var2", label: "A number" },
						],
					},
				],
			],
			"to equal",
			fieldHeight({
				type: "Fieldset",
				name: "set",
				label: "A text",
				fields: [
					{
						type: "List",
						name: "list",
						rowCount: 6,
						rowField: {
							type: "TextInput",
							name: "var1",
							label: "A text",
						},
					},
					{
						type: "TextInput",
						name: "var1",
						label: "A text",
					},
					{ type: "NumberInput", name: "var2", label: "A number" },
				],
			}),
		));

	it("does not break if fields undefined", () =>
		expect(calculateFormHeight, "called with", [1000], "to equal", 0));
});

const TestComp = () => <div />;

describe("withCultureCount", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				cultures: {
					"en-US": {},
					"en-CA": {},
					"fr-CA": {},
				},
			},
		});
		store = {
			dispatch: () => {},
			subscribe: () => {},
			getState: () => state,
		};
	});

	it("provides a count of the available cultures", () =>
		expect(withCultureCount, "called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp />
					</MemoryRouter>
				</Provider>,
				"to deeply render as",
				<TestComp cultureCount={3} />,
			),
		));
});

describe("addNamesToFields", () => {
	it("adds a hexadecimal string as a name where names are missing", () =>
		expect(
			addNamesToFields,
			"called with",
			[
				[
					{ type: "Thing" },
					{ type: "NamedThing", name: "named", rowField: { type: "Thing" } },
					{
						type: "HasFields",
						fields: [{ type: "Thing" }, { type: "NamedThing", name: "named" }],
					},
				],
			],
			"to satisfy",
			[
				{ type: "Thing", name: expect.it("to match", /[0-9a-f]{6}/) },
				{
					type: "NamedThing",
					name: "named",
					rowField: {
						type: "Thing",
						name: expect.it("to match", /[0-9a-f]{6}/),
					},
				},
				{
					type: "HasFields",
					name: expect.it("to match", /[0-9a-f]{6}/),
					fields: [
						{ type: "Thing", name: expect.it("to match", /[0-9a-f]{6}/) },
						{ type: "NamedThing", name: "named" },
					],
				},
			],
		));
});
