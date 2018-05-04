import React from "react";
import sinon from "sinon";
import DropMenu, { Wrapper } from "./DropMenu";
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
			<Wrapper>
				<Anchor onClick={toggle} menuLabel="TestLabel" className="test-class" />
				<Menu menuItems={[]} toggle={toggle} />
			</Wrapper>,
		));

	it("flags anchor and menu when open", () =>
		expect(
			<DropMenu open toggle={toggle} menuLabel="TestLabel" menuItems={[]} />,
			"to exactly render as",
			<Wrapper>
				<Anchor onClick={toggle} open menuLabel="TestLabel" className="" />
				<Menu open menuItems={[]} toggle={toggle} />
			</Wrapper>,
		));

	describe("with state handling", () => {
		it("adds toggleable open flag", () =>
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
