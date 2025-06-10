import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { mount } from "unexpected-reaction";
import { StylesProvider } from "@material-ui/core";
import { generateClassName } from "../../utils/testUtils";
import { FormContext } from "./Form";
import Fieldset from "./Fieldset";
import Combination from "./Combination";
import InputField from "./InputField";
import FieldElements from "./FieldElements";

describe("FieldElements", () => {
	let state, store, getUpdater, values;
	beforeEach(() => {
		state = Immutable.fromJS({});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
		getUpdater = name => () => name;
		values = {
			thing: "foo",
			stuff: "bar",
			item: 32,
			otherItem: "45",
		};
	});

	it("renders a list of field elements, handling fieldsets, combination fields", () =>
		expect(
			mount(
				<Provider store={store}>
					<StylesProvider generateClassName={generateClassName}>
						<IntlProvider locale="en">
							<FormContext.Provider value={{ values }}>
								<FieldElements
									fields={[
										{
											type: "ReadOnly",
											name: "thing",
											someProp: 12.5,
										},
										{
											type: "Fieldset",
											label: {
												id: "fieldset",
												defaultMessage: "A field set",
											},
											fields: [
												{
													type: "NumberInput",
													name: "stuff",
												},
											],
										},
										{
											type: "Combination",
											name: "combo",
											label: {
												id: "CombinedFields",
												defaultMessage: "Combined fields",
											},
											proportions: ["300px", 100],
											fields: [{ type: "CheckboxInput", name: "item" }],
										},
									]}
									getUpdater={getUpdater}
								/>
							</FormContext.Provider>
						</IntlProvider>
					</StylesProvider>
				</Provider>,
			).childNodes,
			"to satisfy",
			[
				<Provider store={store}>
					<StylesProvider generateClassName={generateClassName}>
						<IntlProvider locale="en">
							<FormContext.Provider value={{ values }}>
								<InputField
									key="thing"
									name="thing"
									type="ReadOnly"
									update={expect.it("when called", "to equal", "thing")}
									someProp={12.5}
								/>
							</FormContext.Provider>
						</IntlProvider>
					</StylesProvider>
				</Provider>,
				<Provider store={store}>
					<StylesProvider generateClassName={generateClassName}>
						<IntlProvider locale="en">
							<FormContext.Provider value={{ values }}>
								<Fieldset label={{ id: "FieldSet", defaultMessage: "A field set" }}>
									<FieldElements
										fields={[
											{
												type: "NumberInput",
												name: "stuff",
											},
										]}
										getUpdater={getUpdater}
									/>
								</Fieldset>
							</FormContext.Provider>
						</IntlProvider>
					</StylesProvider>
				</Provider>,
				<Provider store={store}>
					<StylesProvider generateClassName={generateClassName}>
						<IntlProvider locale="en">
							<FormContext.Provider value={{ values }}>
								<Combination
									label={{ id: "CombinedFields", defaultMessage: "Combined fields" }}
									proportions={["300px", 100]}
								>
									<FieldElements fields={[{ type: "CheckboxInput", name: "item" }]} getUpdater={getUpdater} />
								</Combination>
							</FormContext.Provider>
						</IntlProvider>
					</StylesProvider>
				</Provider>,
			],
		));

	it("handles absent update function and values", () =>
		expect(
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values }}>
							<FieldElements
								fields={[
									{
										type: "ReadOnly",
										name: "thing",
									},
								]}
							/>
						</FormContext.Provider>
					</IntlProvider>
				</StylesProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<StylesProvider generateClassName={generateClassName}>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values }}>
							<React.Fragment>
								<InputField name="thing" update={undefined} value={undefined} type="ReadOnly" />
							</React.Fragment>
						</FormContext.Provider>
					</IntlProvider>
				</StylesProvider>
			</Provider>,
		));
});
