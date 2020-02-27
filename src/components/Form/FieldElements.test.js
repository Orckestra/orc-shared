import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { mount } from "react-dom-testing";
import { FormContext } from "./Form";
import Fieldset from "./Fieldset";
import Combination from "./Combination";
import FieldList from "./FieldList";
import InputField from "./InputField";
import FieldElements from "./FieldElements";

describe("FieldElements", () => {
	let getUpdater, values;
	beforeEach(() => {
		getUpdater = name => () => name;
		values = {
			thing: "foo",
			stuff: "bar",
			item: 32,
			otherItem: "45",
		};
	});

	it("renders a list of field elements, handling fieldsets, combination fields, and lists", () =>
		expect(
			mount(
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
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
										label: "A field set",
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
										label: "Combined fields",
										proportions: ["300px", 100],
										fields: [
											{ type: "CheckboxInput", name: "item" },
											{ type: "EmailInput", name: "otheritem" },
										],
									},
									{
										type: "List",
										name: "list",
										rowCount: 15,
										someProp: "Is this way",
										rowField: { name: "listStuff", type: "TextInput" },
									},
								]}
								getUpdater={getUpdater}
							/>
						</FormContext.Provider>
					</IntlProvider>
				</Provider>,
			).childNodes,
			"to satisfy",
			[
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
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
				</Provider>,
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values }}>
							<Fieldset label="A field set">
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
				</Provider>,
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values }}>
							<Combination label="Combined fields" proportions={["300px", 100]}>
								<FieldElements
									fields={[
										{ type: "CheckboxInput", name: "item" },
										{ type: "EmailInput", name: "otheritem" },
									]}
									getUpdater={getUpdater}
								/>
							</Combination>
						</FormContext.Provider>
					</IntlProvider>
				</Provider>,
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<IntlProvider locale="en">
						<FormContext.Provider value={{ values }}>
							<FieldList
								name="list"
								rowField={{ name: "listStuff", type: "TextInput" }}
								getUpdater={getUpdater}
								rowCount={15}
								someProp="Is this way"
							/>
						</FormContext.Provider>
					</IntlProvider>
				</Provider>,
			],
		));

	it("handles absent update function and values", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
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
						<React.Fragment>
							<InputField
								name="thing"
								update={undefined}
								value={undefined}
								type="ReadOnly"
							/>
						</React.Fragment>
					</FormContext.Provider>
				</IntlProvider>
			</Provider>,
		));
});
