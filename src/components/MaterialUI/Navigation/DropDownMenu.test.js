import React from "react";
import { Provider } from "react-redux";
import DropDownMenu from "./DropDownMenu";
import Button from "@material-ui/core/Button";
import { mount } from "enzyme";
import Icon from "../DataDisplay/Icon";

describe("DropDownMenu", () => {
	let store, menuItems;
	beforeEach(() => {
		menuItems = [
			{ title: "asd", action: jest.fn() },
			{ title: "asd2", action: jest.fn() },
		];
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => ({}),
		};
	});

	it("render DropDownMenu without errors", () => {
		expect(
			<DropDownMenu menuItems={menuItems} />,
			"when mounted",
			"to satisfy",
			<Button aria-controls="scope-menu" aria-haspopup="true" />,
		);
	});

	it("render DropDownMenu with custom button without errors", () => {
		expect(
			<DropDownMenu menuItems={menuItems}>
				<Button>
					<Icon id="dot-menu" />
				</Button>
			</DropDownMenu>,
			"when mounted",
			"to satisfy",
			<Button aria-controls="scope-menu" aria-haspopup="true">
				<Icon id="dot-menu" />
			</Button>,
		);
	});

	it("should open Drop Down ", () => {
		const component = mount(
			<Provider store={store}>
				<DropDownMenu menuItems={menuItems} />
			</Provider>,
		);

		const button = component.find("button");
		expect(button.length, "to equal", 1);

		button.simulate("click");

		const items = component.find("li");
		expect(items.length, "to equal", 2);

		items.at(0).simulate("click");

		expect(menuItems[0].action.mock.calls.length, "to equal", 1);
	});
});
