import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { spyOnConsole } from "../../utils/testUtils";
import inputs from "./Inputs";
import Field from "./Field";
import { FormContext } from "./Form";
import { InputField } from "./InputField";

const PatternWrapper = ({ store, children }) => (
	<Provider store={store}>
		<IntlProvider locale="en-US">
			<MemoryRouter>{children}</MemoryRouter>
		</IntlProvider>
	</Provider>
);

const SubjectWrapper = ({ store, values = {}, index, children }) => {
	const value = { values };
	if (index) {
		value.listIndex = index;
	}
	return (
		<PatternWrapper store={store}>
			<FormContext.Provider value={value}>{children}</FormContext.Provider>
		</PatternWrapper>
	);
};

describe("InputField", () => {
	let state, store;
	beforeEach(() => {
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
	spyOnConsole();

	it("gives error message if given no type", () =>
		expect(
			<SubjectWrapper store={store} values={{}}>
				<InputField label="A bad field" otherProp />
			</SubjectWrapper>,
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
				target,
				options,
				center = false;
			beforeEach(() => {
				Input = inputs[type];
				target = "input";
				val = "thing";
				emptyVal = "";
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
					target = "select";
				} else if (type === "CheckboxInput" || type === "SwitchInput") {
					val = true;
					center = true;
				} else if (type === "TranslationInput") {
					val = { "en-US": "Words", "fr-CA": "Des mots" };
					emptyVal = undefined;
				} else if (type === "DateInput") {
					val = "2014-05-22";
					emptyVal = "";
				} else if (type === "Button" || type === "SmallButton") {
					target = "button";
				}
			});

			it("renders a " + type + " input as a form field", () =>
				expect(
					<SubjectWrapper store={store} values={{ fieldName: val }}>
						<InputField
							name="fieldName"
							type={type}
							label={`A ${type} field`}
							placeholder={{
								id: "foo.bar",
								defaultMessage: "Placeholder",
							}}
							options={options}
							otherProp
						/>
					</SubjectWrapper>,
					"when mounted",
					"to satisfy",
					<PatternWrapper store={store}>
						<Field
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
						</Field>
					</PatternWrapper>,
				),
			);

			const cannotRequire = [
				"CheckboxInput",
				"SwitchInput",
				"LineLabel",
				"ReadOnly",
			];
			if (!cannotRequire.includes(type)) {
				it("renders a required field", () =>
					expect(
						<SubjectWrapper store={store} values={{ fieldName: val }}>
							<InputField
								name="fieldName"
								type={type}
								label={`A ${type} field`}
								placeholder={{
									id: "foo.bar",
									defaultMessage: "Placeholder",
								}}
								required={`A ${type} field is a required field`}
								options={options}
								otherProp
							/>
						</SubjectWrapper>,
						"when mounted",
						"with event", // Required only takes effect once field is blurred
						{ type: "blur", target },
						"to satisfy",
						<SubjectWrapper store={store} values={{ fieldName: val }}>
							<Field
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
							</Field>
						</SubjectWrapper>,
					));

				it("renders a required and empty field", () =>
					expect(
						<SubjectWrapper store={store} values={{ fieldName: emptyVal }}>
							<InputField
								name="fieldName"
								type={type}
								label={`A ${type} field`}
								placeholder={{
									id: "foo.bar",
									defaultMessage: "Placeholder",
								}}
								required={`A ${type} field is a required field`}
								wasBlurred
								options={options}
								otherProp
							/>
						</SubjectWrapper>,
						"when mounted",
						"with event", // Required only takes effect once field is blurred
						{ type: "blur", target },
						"to satisfy",
						<PatternWrapper store={store}>
							<Field
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
							</Field>
						</PatternWrapper>,
					));
			}

			it("modifies the field name if inside a list", () =>
				expect(
					<SubjectWrapper store={store} values={{ fieldName: val }} index={12}>
						<InputField
							name="fieldName"
							type={type}
							label={`A ${type} field`}
							options={options}
							otherProp
						/>
					</SubjectWrapper>,
					"when mounted",
					"to satisfy",
					<PatternWrapper store={store}>
						<Field
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
						</Field>
					</PatternWrapper>,
				));
		});
	});
});
