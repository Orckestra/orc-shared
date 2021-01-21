import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import sinon from "sinon";
import { mount, shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import Icon from "../DataDisplay/Icon";
import DropDownMenu from "./DropDownMenu";
import { ignoreConsoleError } from "../../../utils/testUtils";

describe("DropDownMenu", () => {
	let store, menuItems, container;
	beforeEach(() => {
		menuItems = [
			{ title: "asd", action: sinon.spy().named("action") },
			{ title: "asd2", action: sinon.spy().named("action") },
		];
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => ({}),
		};
		container = document.createElement("div");
		document.body.appendChild(container);
	});
	afterEach(() => {
		document.body.removeChild(container);
		container = null;
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

	it("Fails if dropDownMenuProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <DropDownMenu dropDownMenuProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "dropDownMenuProps property is not of type DropDownMenuProps");
			});
		});
	});

	it("should open Drop Down ", () => {
		const payload = "payload";

		ReactDOM.render(
			<Provider store={store}>
				<DropDownMenu payload={payload} menuItems={menuItems} />
			</Provider>,
			container,
		);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		const button = container.querySelector("button");
		button.dispatchEvent(clickEvent);

		const items = document.querySelectorAll(".MuiListItem-root");

		items[0].dispatchEvent(clickEvent);

		expect(menuItems[0].action, "to have calls satisfying", [{ args: [payload] }]);
	});
});
