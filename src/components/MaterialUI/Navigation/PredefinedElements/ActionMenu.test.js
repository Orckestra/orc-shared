import React from "react";
import DropDownMenu from "../DropDownMenu";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../../DataDisplay/Icon";
import ActionMenu from "./ActionMenu";

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
});
