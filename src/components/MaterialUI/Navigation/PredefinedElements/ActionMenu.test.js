import React from "react";
import DropDownMenu from "../DropDownMenu";
import IconButton from "@mui/material/IconButton";
import Icon from "../../DataDisplay/Icon";
import ActionMenu from "./ActionMenu";
import DropDownMenuProps from "../DropDownMenuProps";
import { TestWrapper, createMuiTheme } from "./../../../../utils/testUtils";

describe("ActionMenu", () => {
	let menuItems;
	beforeEach(() => {
		menuItems = [
			{ title: "asd", action: jest.fn() },
			{ title: "asd2", action: jest.fn() },
		];
	});

	const theme = createMuiTheme();

	it("render DropDownMenu without errors", () => {
		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ActionMenu menuItems={menuItems} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<DropDownMenu menuItems={menuItems}>
					<IconButton>
						<Icon id="dot-menu" />
					</IconButton>
				</DropDownMenu>
			</TestWrapper>,
		);
	});

	it("render DropDownMenu disabled dropdown", () => {
		const dropdownMenuProps = new DropDownMenuProps();
		dropdownMenuProps.set(DropDownMenuProps.propNames.disabled, true);

		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ActionMenu disabled={true} menuItems={menuItems} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<DropDownMenu menuItems={menuItems} dropDownMenuProps={dropdownMenuProps}>
					<IconButton>
						<Icon id="dot-menu" />
					</IconButton>
				</DropDownMenu>
			</TestWrapper>,
		);
	});

	it("render DropDownMenu with autoFocus false", () => {
		const dropdownMenuProps = new DropDownMenuProps();
		dropdownMenuProps.set(DropDownMenuProps.propNames.autoFocus, false);

		expect(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ActionMenu autoFocus={false} menuItems={menuItems} />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<DropDownMenu dropDownMenuProps={dropdownMenuProps} menuItems={menuItems}>
					<IconButton>
						<Icon id="dot-menu" />
					</IconButton>
				</DropDownMenu>
			</TestWrapper>,
		);
	});
});
