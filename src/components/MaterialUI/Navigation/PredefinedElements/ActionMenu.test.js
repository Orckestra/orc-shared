import React from "react";
import DropDownMenu from "../DropDownMenu";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../../DataDisplay/Icon";
import ActionMenu from "./ActionMenu";
import DropDownMenuProps from "../DropDownMenuProps";

describe("ActionMenu", () => {
	let menuItems;
	beforeEach(() => {
		menuItems = [
			{ title: "asd", action: jest.fn() },
			{ title: "asd2", action: jest.fn() },
		];
	});

	it("render DropDownMenu without errors", () => {
		expect(
			<ActionMenu menuItems={menuItems} />,
			"when mounted",
			"to satisfy",
			<DropDownMenu menuItems={menuItems}>
				<IconButton>
					<Icon id="dot-menu" />
				</IconButton>
			</DropDownMenu>,
		);
	});

	it("render DropDownMenu disabled dropdown", () => {
		const dropdownMenuProps = new DropDownMenuProps();
		dropdownMenuProps.set(DropDownMenuProps.propNames.disabled, true);

		expect(
			<ActionMenu disabled={true} menuItems={menuItems} />,
			"when mounted",
			"to satisfy",
			<DropDownMenu menuItems={menuItems} dropDownMenuProps={dropdownMenuProps}>
				<IconButton>
					<Icon id="dot-menu" />
				</IconButton>
			</DropDownMenu>,
		);
	});

	it("render DropDownMenu with autoFocus false", () => {
		const dropdownMenuProps = new DropDownMenuProps();
		dropdownMenuProps.set(DropDownMenuProps.propNames.autoFocus, false);

		expect(
			<ActionMenu autoFocus={false} menuItems={menuItems} />,
			"when mounted",
			"to satisfy",
			<DropDownMenu dropDownMenuProps={dropdownMenuProps} menuItems={menuItems}>
				<IconButton>
					<Icon id="dot-menu" />
				</IconButton>
			</DropDownMenu>,
		);
	});
});
