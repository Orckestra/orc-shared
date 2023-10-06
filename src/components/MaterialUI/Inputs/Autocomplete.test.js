import React from "react";
import { mount } from "enzyme";
import Autocomplete from "./Autocomplete";
import AutocompleteMUI from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider } from "@material-ui/core";
import sinon from "sinon";
import { ignoreConsoleError, createMuiTheme, TestWrapper } from "../../../utils/testUtils";
import AutocompleteProps from "./AutocompleteProps";
import Icon from "./../DataDisplay/Icon";

describe("Autocomplete Component", () => {
	let update, container;
	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		update = sinon.spy().named("update");
	});
	afterEach(() => {
		document.body.removeChild(container);
		container = null;
	});

	it("Fails if autocompleteProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<MuiThemeProvider theme={createMuiTheme()}>
					<Autocomplete autocompleteProps="Wrong type" />
				</MuiThemeProvider>
			);

			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "autocompleteProps property is not of type AutocompleteProps");
			});
		});
	});

	const theme = createMuiTheme();

	it("Renders Autocomplete component without errors", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const autocompleteProps = new AutocompleteProps();

		autocompleteProps.set(AutocompleteProps.propNames.update, update);
		autocompleteProps.set(AutocompleteProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Autocomplete id="mui-input-autocomplete-id" options={options} autocompleteProps={autocompleteProps} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<AutocompleteMUI
						id="mui-input-autocomplete-id"
						options={options}
						value={options[0]}
						closeIcon={<Icon id="close2" />}
						popupIcon={<Icon id="dropdown-chevron-down" />}
						getOptionLabel={option => option.label}
						openText={null}
						closeText={null}
						clearText={null}
						renderInput={params => (
							<TextField
								{...params}
								fullWidth
								InputProps={{
									...params.InputProps,
									disableUnderline: true,
									className: undefined,
								}}
							/>
						)}
					/>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Autocomplete component without value", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const autocompleteProps = new AutocompleteProps();

		autocompleteProps.set(AutocompleteProps.propNames.update, update);

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Autocomplete id="mui-input-autocomplete-id" options={options} autocompleteProps={autocompleteProps} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<AutocompleteMUI
						id="mui-input-autocomplete-id"
						options={options}
						value={null}
						closeIcon={<Icon id="close2" />}
						popupIcon={<Icon id="dropdown-chevron-down" />}
						getOptionLabel={option => option.label}
						openText={null}
						closeText={null}
						clearText={null}
						renderInput={params => (
							<TextField
								{...params}
								fullWidth
								InputProps={{
									...params.InputProps,
									disableUnderline: true,
									className: undefined,
								}}
							/>
						)}
					/>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Autocomplete component with error", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];
		const error = "error";

		const autocompleteProps = new AutocompleteProps();

		autocompleteProps.set(AutocompleteProps.propNames.update, update);
		autocompleteProps.set(AutocompleteProps.propNames.error, "error");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Autocomplete id="mui-input-autocomplete-id" options={options} autocompleteProps={autocompleteProps} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<AutocompleteMUI
						id="mui-input-autocomplete-id"
						options={options}
						value={null}
						closeIcon={<Icon id="close2" />}
						popupIcon={<Icon id="dropdown-chevron-down" />}
						getOptionLabel={option => option.label}
						openText={null}
						closeText={null}
						clearText={null}
						renderInput={params => (
							<TextField
								{...params}
								fullWidth
								InputProps={{
									...params.InputProps,
									disableUnderline: true,
									className: undefined,
								}}
							/>
						)}
					/>
					<div>{error}</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Autocomplete component handles change", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const autocompleteProps = new AutocompleteProps();

		autocompleteProps.set(AutocompleteProps.propNames.update, update);
		autocompleteProps.set(AutocompleteProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Autocomplete options={options} autocompleteProps={autocompleteProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const autocompleteMui = mountedComponent.find(AutocompleteMUI);

		const event = {};

		autocompleteMui.invoke("onChange")(event, options[1]);

		expect(update, "to have calls satisfying", [{ args: ["anotherValue"] }]);
	});

	it("Autocomplete component handles empty value", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const autocompleteProps = new AutocompleteProps();

		autocompleteProps.set(AutocompleteProps.propNames.update, update);
		autocompleteProps.set(AutocompleteProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Autocomplete options={options} autocompleteProps={autocompleteProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const autocompleteMui = mountedComponent.find(AutocompleteMUI);

		const event = {};

		autocompleteMui.invoke("onChange")(event, null);

		expect(update, "to have calls satisfying", [{ args: [null] }]);
	});
});
