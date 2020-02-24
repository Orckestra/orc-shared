import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Form from "./FormElement";
import FieldElements from "./FieldElements";
import { FormPage, Wrapper, FormContext } from "./Form";

describe("FormPage", () => {
	let getUpdater, fields, manyFields, values;
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
		values = { text1: "foo" };
	});

	it("renders a form with a single field", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormPage fields={fields} getUpdater={getUpdater} values={values} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormContext.Provider value={{ values }}>
						<Wrapper>
							<Form spanWidth={1}>
								<FieldElements getUpdater={getUpdater} fields={fields} />
							</Form>
						</Wrapper>
					</FormContext.Provider>
				</IntlProvider>
			</Provider>,
		));

	it("still respects 'wide' flag", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormPage
						wide
						fields={fields}
						getUpdater={getUpdater}
						values={values}
					/>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormContext.Provider value={{ values }}>
						<Wrapper>
							<Form spanWidth={1}>
								<FieldElements getUpdater={getUpdater} fields={fields} />
							</Form>
						</Wrapper>
					</FormContext.Provider>
				</IntlProvider>
			</Provider>,
		));

	it("renders a form with a multiple fields", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormPage
						cols={[2, 1]}
						fields={manyFields}
						getUpdater={getUpdater}
						values={values}
					/>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IntlProvider locale="en">
					<FormContext.Provider value={{ values }}>
						<Wrapper>
							<Form spanWidth={2}>
								<FieldElements
									getUpdater={getUpdater}
									fields={manyFields.slice(0, 5)}
								/>
							</Form>
							<Form spanWidth={1}>
								<FieldElements
									getUpdater={getUpdater}
									fields={manyFields.slice(5, 10)}
								/>
							</Form>
						</Wrapper>
					</FormContext.Provider>
				</IntlProvider>
			</Provider>,
		));
});
