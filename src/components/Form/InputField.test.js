import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider, injectIntl } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import inputs from "./Inputs";
import Field from "./Field";
import { InputField } from "./InputField";
const IntlInputField = injectIntl(InputField);
const IntlField = injectIntl(Field);

describe("InputField", () => {
	it("gives error message if given no type", () =>
		expect(
			<IntlProvider locale="en-US">
				<IntlInputField label="A bad field" otherProp />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<p>Cannot render unknown type "{"undefined"}"</p>,
		).then(() =>
			expect(console.error, "to have calls satisfying", [
				{ args: ['Unknown type "undefined", cannot render field'] },
			]),
		));

	Object.keys(inputs).forEach(type => {
		describe("input type " + type, () => {
			let Input,
				val,
				emptyVal,
				store,
				state,
				options,
				center = false;
			beforeEach(() => {
				Input = inputs[type];
				if (type === "Selector" || type === "MultiSelector") {
					options = [
						{ value: "thing", label: "Thing" },
						{ value: "stuff", label: "Stuff" },
					];
					if (type === "MultiSelector") {
						val = ["thing"];
						emptyVal = [];
					} else {
						val = "thing";
					}
				} else if (type === "CheckboxInput" || type === "SwitchInput") {
					val = true;
					center = true;
				} else if (type === "TranslationInput") {
					val = { "en-US": "Words", "fr-CA": "Des mots" };
					emptyVal = undefined;
				} else if (type === "DateInput") {
					val = "2014-05-22";
					emptyVal = "";
				} else {
					val = "thing";
					emptyVal = "";
				}
				state = Immutable.fromJS({
					locale: {
						locale: "en-US",
						supportedLocales: ["en-US", "fr-Fr"],
						cultures: {
							"en-US": {
								cultureIso: "en-US",
								cultureName: "English - United States",
								sortOrder: 0,
								isDefault: false,
							},
							"fr-FR": {
								cultureIso: "fr-FR",
								cultureName: "French - France",
								sortOrder: 0,
								isDefault: true,
							},
						},
						defaultCulture: "en-US",
					},
				});
				store = {
					subscribe: () => {},
					dispatch: () => {},
					getState: () => state,
				};
			});

			it("renders a " + type + " input as a form field", () =>
				expect(
					<Provider store={store}>
						<IntlProvider locale="en-US">
							<MemoryRouter>
								<IntlInputField
									name="fieldName"
									type={type}
									label={`A ${type} field`}
									value={val}
									placeholder={{
										id: "foo.bar",
										defaultMessage: "Placeholder",
									}}
									options={options}
									otherProp
								/>
							</MemoryRouter>
						</IntlProvider>
					</Provider>,
					"when mounted",
					"to satisfy",
					<Provider store={store}>
						<IntlProvider locale="en-US">
							<MemoryRouter>
								<IntlField
									wasBlurred
									center={center}
									id="fieldName"
									label={`A ${type} field`}
								>
									<Input
										id="fieldName"
										value={val}
										otherProp
										placeholder="Placeholder"
										options={options}
									/>
								</IntlField>
							</MemoryRouter>
						</IntlProvider>
					</Provider>,
				),
			);

			if (type !== "CheckboxInput" && type !== "SwitchInput") {
				it("renders a required field", () =>
					expect(
						<Provider store={store}>
							<IntlProvider locale="en-US">
								<MemoryRouter>
									<IntlInputField
										name="fieldName"
										type={type}
										label={`A ${type} field`}
										value={val}
										placeholder={{
											id: "foo.bar",
											defaultMessage: "Placeholder",
										}}
										required={`A ${type} field is a required field`}
										wasBlurred
										options={options}
										otherProp
									/>
								</MemoryRouter>
							</IntlProvider>
						</Provider>,
						"when mounted",
						"to satisfy",
						<Provider store={store}>
							<IntlProvider locale="en-US">
								<MemoryRouter>
									<IntlField
										wasBlurred
										center={center}
										id="fieldName"
										label={`A ${type} field`}
										required={`A ${type} field is a required field`}
									>
										<Input
											id="fieldName"
											value={val}
											otherProp
											placeholder="Placeholder"
											options={options}
											required
										/>
									</IntlField>
								</MemoryRouter>
							</IntlProvider>
						</Provider>,
					));

				it("renders a required and empty field", () =>
					expect(
						<Provider store={store}>
							<IntlProvider locale="en-US">
								<MemoryRouter>
									<IntlInputField
										name="fieldName"
										type={type}
										label={`A ${type} field`}
										value={emptyVal}
										placeholder={{
											id: "foo.bar",
											defaultMessage: "Placeholder",
										}}
										required={`A ${type} field is a required field`}
										wasBlurred
										options={options}
										otherProp
									/>
								</MemoryRouter>
							</IntlProvider>
						</Provider>,
						"when mounted",
						"to satisfy",
						<Provider store={store}>
							<IntlProvider locale="en-US">
								<MemoryRouter>
									<IntlField
										wasBlurred
										center={center}
										id="fieldName"
										label={`A ${type} field`}
										required={`A ${type} field is a required field`}
										invalid
									>
										<Input
											id="fieldName"
											value={emptyVal}
											otherProp
											placeholder="Placeholder"
											options={options}
											required
										/>
									</IntlField>
								</MemoryRouter>
							</IntlProvider>
						</Provider>,
					));
			}

			it("modifies the field name if inside a list", () =>
				expect(
					<Provider store={store}>
						<IntlProvider locale="en-US">
							<MemoryRouter>
								<IntlInputField
									name="fieldName"
									listIndex={12}
									type={type}
									label={`A ${type} field`}
									value={val}
									options={options}
									otherProp
								/>
							</MemoryRouter>
						</IntlProvider>
					</Provider>,
					"when mounted",
					"to satisfy",
					<Provider store={store}>
						<IntlProvider locale="en-US">
							<MemoryRouter>
								<IntlField
									wasBlurred
									center={center}
									id="fieldName[12]"
									label={`A ${type} field`}
								>
									<Input
										id="fieldName[12]"
										value={val}
										otherProp
										options={options}
									/>
								</IntlField>
							</MemoryRouter>
						</IntlProvider>
					</Provider>,
				));
		});
	});
});
