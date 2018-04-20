import React from "react";
import sinon from "sinon";
import DropMenu, { Wrapper, Background } from "./DropMenu";
import Anchor from "./Anchor";
import Menu from "./Menu";
import FullMenu from "./index";

describe("DropMenu", () => {
	let toggle;
	beforeEach(() => {
		toggle = sinon.spy().named("toggle");
	});

	it("renders an anchor and a menu", () =>
		expect(
			<DropMenu
				toggle={toggle}
				menuLabel="TestLabel"
				menuItems={[]}
				className="test-class"
			/>,
			"to exactly render as",
			<Wrapper onClick={toggle}>
				<Anchor menuLabel="TestLabel" className="test-class" />
				<Menu menuItems={[]} />
			</Wrapper>,
		));

	it("flags anchor and menu, and renders a background when open", () =>
		expect(
			<DropMenu open toggle={toggle} menuLabel="TestLabel" menuItems={[]} />,
			"to exactly render as",
			<Wrapper onClick={toggle}>
				<Anchor open menuLabel="TestLabel" className="" />
				<Background />
				<Menu open menuItems={[]} />
			</Wrapper>,
		));

	describe("with state handling", () => {
		it("handles open state", () =>
			expect(
				<FullMenu
					menuLabel="TestLabel"
					menuItems={[]}
					className="test-class"
				/>,
				"to render as",
				<DropMenu
					toggle={expect.it("to be a function")}
					open={false}
					menuLabel="TestLabel"
					menuItems={[]}
					className="test-class"
				/>,
			));
	});
});
