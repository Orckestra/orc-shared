import React from "react";
import TitledSelect from "./TitledSelect";
import Select from "./../Select";
import SelectProps from "./../SelectProps";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "./../../../../utils/testUtils";

describe("TitledSelect", () => {
	const update = jest.fn();

	it("Renders title select properly", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];
		const title = "title";

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		const muiTheme = createMuiTheme();

		const component = (
			<MuiThemeProvider theme={muiTheme}>
				<TitledSelect options={options} title={title} selectProps={selectProps} />
			</MuiThemeProvider>
		);

		const expected = (
			<MuiThemeProvider theme={muiTheme}>
				<div>
					<Typography children={title} />
					<Select options={options} selectProps={selectProps} />
				</div>
			</MuiThemeProvider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
