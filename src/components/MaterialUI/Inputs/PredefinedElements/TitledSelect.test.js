import React from "react";
import TitledSelect from "./TitledSelect";
import Select from "./../Select";
import SelectProps from "./../SelectProps";
import Typography from "@material-ui/core/Typography";
import { TestWrapper, createMuiTheme } from "./../../../../utils/testUtils";

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

		const theme = createMuiTheme();

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<TitledSelect options={options} title={title} selectProps={selectProps} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<Typography children={title} />
					<Select options={options} selectProps={selectProps} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
