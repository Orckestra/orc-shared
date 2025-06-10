import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { StylesProvider } from "@material-ui/core";
import { generateClassName } from "../../utils/testUtils";
import { FormContext } from "./Form";
import InputField from "./InputField";
import FieldElements from "./FieldElements";

describe("FieldElements", () => {
	let state, store, values;
	beforeEach(() => {
		state = Immutable.fromJS({});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
		values = {
			thing: "foo",
			stuff: "bar",
			item: 32,
			otherItem: "45",
		};
	});

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
