import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { generateClassName } from "../../utils/testUtils";
import { IntlProvider } from "react-intl";
import Form from "./FormElement";
import FieldElements from "./FieldElements";
import Field from "./Field";
import { FormPage, FormContext } from "./Form";
import { StylesProvider } from "@material-ui/core";
import { TextInput } from "./Inputs/Text";

describe("FormPage", () => {
	let state, store, getUpdater, fields, manyFields, values;
	beforeEach(() => {
		state = Immutable.fromJS({});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
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
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormPage formName="testForm" fields={fields} getUpdater={getUpdater} values={values} />
					</IntlProvider>
				</StylesProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values, formName: "testForm" }}>
							<div>
								<Form spanWidth={1}>
									<Field>
										<label>A text</label>
										<TextInput value="foo" />
									</Field>
								</Form>
							</div>
						</FormContext.Provider>
					</IntlProvider>
				</StylesProvider>
			</Provider>,
		));

	it("still respects 'wide' flag", () =>
		expect(
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormPage wide fields={fields} getUpdater={getUpdater} values={values} />
					</IntlProvider>
				</StylesProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values }}>
							<div>
								<Form spanWidth={1}>
									<FieldElements getUpdater={getUpdater} fields={fields} />
								</Form>
							</div>
						</FormContext.Provider>
					</IntlProvider>
				</StylesProvider>
			</Provider>,
		));

	it("still respects 'wide' flag with multiple fields", () =>
		expect(
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormPage wide cols={[2, 1]} fields={manyFields} getUpdater={getUpdater} values={values} />
					</IntlProvider>
				</StylesProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values }}>
							<div>
								<Form spanWidth={1}>
									<FieldElements getUpdater={getUpdater} fields={manyFields} />
								</Form>
							</div>
						</FormContext.Provider>
					</IntlProvider>
				</StylesProvider>
			</Provider>,
		));

	it("renders a form with a multiple fields", () =>
		expect(
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormPage cols={[2, 1]} fields={manyFields} getUpdater={getUpdater} values={values} />
					</IntlProvider>
				</StylesProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values }}>
							<div>
								<Form spanWidth={2}>
									<FieldElements getUpdater={getUpdater} fields={manyFields.slice(0, 5)} />
								</Form>
								<Form spanWidth={1}>
									<FieldElements getUpdater={getUpdater} fields={manyFields.slice(5, 10)} />
								</Form>
							</div>
						</FormContext.Provider>
					</IntlProvider>
				</StylesProvider>
			</Provider>,
		));
});
