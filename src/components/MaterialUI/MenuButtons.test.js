import React from "react";
import MenuButton from "./MenuButtons";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Icon from "./DataDisplay/Icon";
import sinon from "sinon";
import ReactDOM from "react-dom";

describe("MenuButton", () => {
	it("Renders MenuButton with no options", () => {
		const menuItems = [
			{
				disabled: true,
			},
			{
				disabled: true,
			},
		];

		const component = <MenuButton label={<p>Label</p>} options={menuItems} />;

		const expected = (
			<>
				<Button disabled={true} variant="outlined" color="primary" endIcon={<Icon id="chevron-down" />}>
					<p>Label</p>
				</Button>
				<Menu open={false}></Menu>
			</>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders MenuButton with all options disabled", () => {
		const component = <MenuButton label={<p>Label</p>} />;

		const expected = (
			<>
				<Button disabled={true} variant="outlined" color="primary" endIcon={<Icon id="chevron-down" />}>
					<p>Label</p>
				</Button>
				<Menu open={false}></Menu>
			</>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Call option set in menu item", () => {
		const menuItems = [
			{
				action: sinon.spy().named("action"),
			},
		];

		const container = document.createElement("div");
		document.body.appendChild(container);
		ReactDOM.render(<MenuButton options={menuItems} />, container);

		const clickEvent = new MouseEvent("click", {
			bubbles: true,
			cancelable: false,
		});

		const button = container.querySelector("button");
		button.dispatchEvent(clickEvent);

		const items = document.querySelectorAll(".MuiListItem-root");
		expect(items, "to have length", 1);

		items[0].dispatchEvent(clickEvent);
		expect(menuItems[0].action, "was called");
	});
});
