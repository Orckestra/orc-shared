import React from "react";
import { mount, shallow } from "enzyme";
import StandaloneRadio from "./StandaloneRadio";
import StandaloneRadioProps from "./standaloneRadioProps";
import { ignoreConsoleError, generateClassName, createMuiTheme } from "~/utils/testUtils";
import RadioMui from "@mui/material/Radio";
import sinon from "sinon";
import ReactDOM from "react-dom";
import StylesProvider from "@mui/styles/StylesProvider";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";

describe("Radio", () => {
	it("Throws an error if radioProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <StandaloneRadio radioProps="Wrong Type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "radioProps property is not of type RadioProps");
			});
		});
	});

	it("Renders Radio propely", () => {
		const component = (
			<StylesProvider generateClassName={generateClassName}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<StandaloneRadio />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);
		const expected = (
			<StylesProvider generateClassName={generateClassName}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<RadioMui
							checked={false}
							disabled={false}
							onChange={null}
							size={"medium"}
							inputProps={null}
							name={null}
							icon={<span className={"makeStyles-radioIcon"} />}
						/>
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Uses passed checked for checked property", () => {
		const radioProps = new StandaloneRadioProps();
		radioProps.set(StandaloneRadioProps.propNames.checked, true);
		const component = <StandaloneRadio radioProps={radioProps} />;

		const mountedComponent = mount(component);

		const radioMui = mountedComponent.find(RadioMui);

		expect(radioMui.prop("checked"), "to be true");
	});

	it("Uses passed disabled for disabled property", () => {
		const radioProps = new StandaloneRadioProps();
		radioProps.set(StandaloneRadioProps.propNames.disabled, true);
		const component = <StandaloneRadio radioProps={radioProps} />;

		const mountedComponent = mount(component);

		const radioMui = mountedComponent.find(RadioMui);

		expect(radioMui.prop("disabled"), "to be true");
	});

	it("Uses passed onChange for onChange property", () => {
		const radioProps = new StandaloneRadioProps();

		let onChange = sinon.spy().named("onChange");
		radioProps.set(StandaloneRadioProps.propNames.onChange, onChange);
		radioProps.set(StandaloneRadioProps.propNames.name, "name");
		radioProps.set(StandaloneRadioProps.propNames.value, "value");

		const component = <StandaloneRadio radioProps={radioProps} />;

		let container = document.createElement("div");
		document.body.appendChild(container);
		ReactDOM.render(component, container);

		const click = document.createEvent("MouseEvents");
		click.initEvent("click", true, false);

		let element = container.querySelector(`span.MuiIconButton-label input[value="value"]`);
		element.dispatchEvent(click);
		expect(onChange, "to have calls satisfying", [{ args: ["value", "name"] }]);
	});

	it("Uses passed value for value property", () => {
		const radioProps = new StandaloneRadioProps();
		const value = "value";
		radioProps.set(StandaloneRadioProps.propNames.value, value);
		const component = <StandaloneRadio radioProps={radioProps} />;

		const mountedComponent = mount(component);

		const radioMui = mountedComponent.find(RadioMui);

		expect(radioMui.prop("value"), "to equal", value);
	});

	it("Uses passed name for name property", () => {
		const radioProps = new StandaloneRadioProps();
		const name = "name";
		radioProps.set(StandaloneRadioProps.propNames.name, name);
		const component = <StandaloneRadio radioProps={radioProps} />;

		const mountedComponent = mount(component);

		const radioMui = mountedComponent.find(RadioMui);

		expect(radioMui.prop("name"), "to equal", name);
	});

	it("Uses passed size for size property", () => {
		const radioProps = new StandaloneRadioProps();
		const size = "small";
		radioProps.set(StandaloneRadioProps.propNames.size, size);
		const component = <StandaloneRadio radioProps={radioProps} />;

		const mountedComponent = mount(component);

		const radioMui = mountedComponent.find(RadioMui);

		expect(radioMui.prop("size"), "to equal", size);
	});

	it("Uses passed inputProps for inputProps property", () => {
		const radioProps = new StandaloneRadioProps();
		const inputProps = { prop: "value" };
		radioProps.set(StandaloneRadioProps.propNames.inputProps, inputProps);
		const component = <StandaloneRadio radioProps={radioProps} />;

		const mountedComponent = mount(component);

		const radioMui = mountedComponent.find(RadioMui);

		expect(radioMui.prop("inputProps"), "to equal", inputProps);
	});

	it("Uses passed class for root ruleName", () => {
		const radioProps = new StandaloneRadioProps();
		const testClassRoot = "testClassRoot";
		radioProps.setStyle(StandaloneRadioProps.ruleNames.root, testClassRoot);
		const component = <StandaloneRadio radioProps={radioProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testClassRoot"), "to be true");
	});

	it("Uses fallback values if poperties are not passed", () => {
		const component = <StandaloneRadio />;
		const mountedComponent = shallow(component);

		expect(mountedComponent.prop("checked"), "to equal", false);
		expect(mountedComponent.prop("disabled"), "to equal", false);
		expect(mountedComponent.prop("onChange"), "to equal", null);
		expect(mountedComponent.prop("size"), "to equal", "medium");
		expect(mountedComponent.prop("value"), "to equal", undefined);
		expect(mountedComponent.prop("inputProps"), "to equal", null);
		expect(mountedComponent.prop("name"), "to equal", null);
	});

	it("Use proper class if radio is not read only and checked", () => {
		const radioProps = new StandaloneRadioProps();
		radioProps.set(StandaloneRadioProps.propNames.readOnly, false);
		radioProps.set(StandaloneRadioProps.propNames.checked, true);
		const component = (
			<StylesProvider generateClassName={generateClassName}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<StandaloneRadio radioProps={radioProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".makeStyles-radioIconChecked"), "to be true");
	});

	it("Use proper class if radio is read only and checked", () => {
		const radioProps = new StandaloneRadioProps();
		radioProps.set(StandaloneRadioProps.propNames.readOnly, true);
		radioProps.set(StandaloneRadioProps.propNames.checked, true);
		const component = (
			<StylesProvider generateClassName={generateClassName}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<StandaloneRadio radioProps={radioProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".makeStyles-radioReadOnlyChecked"), "to be true");
	});

	it("Use proper class if radio is not read only and not checked", () => {
		const radioProps = new StandaloneRadioProps();
		radioProps.set(StandaloneRadioProps.propNames.readOnly, false);
		radioProps.set(StandaloneRadioProps.propNames.checked, false);
		const component = (
			<StylesProvider generateClassName={generateClassName}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<StandaloneRadio radioProps={radioProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".makeStyles-radioIcon"), "to be true");
	});

	it("Use proper class if radio is read only and not checked", () => {
		const radioProps = new StandaloneRadioProps();
		radioProps.set(StandaloneRadioProps.propNames.readOnly, true);
		radioProps.set(StandaloneRadioProps.propNames.checked, false);
		const component = (
			<StylesProvider generateClassName={generateClassName}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={createMuiTheme()}>
						<StandaloneRadio radioProps={radioProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</StylesProvider>
		);

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".makeStyles-radioReadOnly"), "to be true");
	});
});
