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
				id="test"
				toggle={toggle}
				menuLabel="TestLabel"
				menuItems={[]}
				className="test-class"
			/>,
			"to exactly render as",
			<Wrapper>
				<Anchor
					id="testAnchor"
					onClick={toggle}
					menuLabel="TestLabel"
					className="test-class"
				/>
				<Menu id="testDropdown" menuItems={[]} toggle={toggle} />
			</Wrapper>,
		));

	it("flags anchor and menu when open", () =>
		expect(
			<DropMenu
				id="test"
				open
				toggle={toggle}
				menuLabel="TestLabel"
				menuItems={[]}
			/>,
			"to exactly render as",
			<Wrapper>
				<Anchor
					id="testAnchor"
					onClick={toggle}
					open
					menuLabel="TestLabel"
					className=""
				/>
				<Menu id="testDropdown" open menuItems={[]} toggle={toggle} />
			</Wrapper>,
		));

	describe("with state handling", () => {
		it("adds toggleable open flag", () =>
			expect(
				<FullMenu
					id="test"
					menuLabel="TestLabel"
					menuItems={[]}
					className="test-class"
				/>,
				"to render as",
				<DropMenu
					id="test"
					toggle={expect.it("to be a function")}
					open={false}
					menuLabel="TestLabel"
					menuItems={[]}
					className="test-class"
				/>,
			));
	});
});
