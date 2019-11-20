import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import Form from "./FormElement";
import FieldElements from "./FieldElements";
import { withCultureCount, addNamesToFields, FormPage, Wrapper } from "./Form";

describe("FormPage", () => {
	let getUpdater, fields, manyFields;
	beforeEach(() => {
		getUpdater = () => {};
		fields = [{ type: "TextInput", name: "text1", label: "A text" }];
		manyFields = [
			{ type: "TextInput", name: "text0", label: "A text" },
			{ type: "TextInput", name: "text1", label: "A text" },
			{ type: "TextInput", name: "text2", label: "A text" },
			{ type: "TextInput", name: "text3", label: "A text" },
			{ type: "TextInput", name: "text4", label: "A text" },
			{ type: "TextInput", name: "text5", label: "A text" },
			{ type: "TextInput", name: "text6", label: "A text" },
			{ type: "TextInput", name: "text7", label: "A text" },
			{ type: "TextInput", name: "text8", label: "A text" },
			{ type: "TextInput", name: "text9", label: "A text" },
		];
	});

	it("renders a form with a single field", () =>
		expect(
			<IntlProvider>
				<FormPage
					fields={fields}
					values={{ text1: "foo" }}
					getUpdater={getUpdater}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider>
				<Wrapper>
					<Form spanWidth={1}>
						<FieldElements
							getUpdater={getUpdater}
							fields={fields}
							values={{ text1: "foo" }}
						/>
					</Form>
				</Wrapper>
			</IntlProvider>,
		));

	it("still respects 'wide' flag", () =>
		expect(
			<IntlProvider>
				<FormPage
					wide
					fields={fields}
					values={{ text1: "foo" }}
					getUpdater={getUpdater}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider>
				<Wrapper>
					<Form spanWidth={1}>
						<FieldElements
							getUpdater={getUpdater}
							fields={fields}
							values={{ text1: "foo" }}
						/>
					</Form>
				</Wrapper>
			</IntlProvider>,
		));

	it("renders a form with a multiple fields", () =>
		expect(
			<IntlProvider>
				<FormPage
					cols={[2, 1]}
					fields={manyFields}
					values={{ text1: "foo" }}
					getUpdater={getUpdater}
				/>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<IntlProvider>
				<Wrapper>
					<Form spanWidth={2}>
						<FieldElements
							getUpdater={getUpdater}
							fields={manyFields.slice(0, 5)}
							values={{ text1: "foo" }}
						/>
					</Form>
					<Form spanWidth={1}>
						<FieldElements
							getUpdater={getUpdater}
							fields={manyFields.slice(5, 10)}
							values={{ text1: "foo" }}
						/>
					</Form>
				</Wrapper>
			</IntlProvider>,
		));
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
				"when mounted",
				"to satisfy",
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
