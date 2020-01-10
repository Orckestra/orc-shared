import React from "react";
import DropMenu, { Wrapper } from "./index";
import Anchor, { Header, Indicator } from "./Anchor";
import Menu, { Drawer, List, Item, ItemIcon } from "./Menu";

describe("DropMenu", () => {
	it("renders an anchor and a menu", () =>
		expect(
			<DropMenu menuLabel="TestLabel" menuItems={[]} className="test-class" />,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Anchor menuLabel="TestLabel" className="test-class" />
				<Menu menuItems={[]} />
			</Wrapper>,
		));

	it("flags anchor and menu when open", () =>
		expect(
			<DropMenu initOpen menuLabel="TestLabel" menuItems={[]} />,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Anchor open menuLabel="TestLabel" className="" />
				<Menu open menuItems={[]} />
			</Wrapper>,
		));

	it("when clicked renders the menu", () =>
		expect(
			<DropMenu
				menuLabel="TestLabel"
				menuItems={[
					{ label: "First", icon: "one", handler: () => {} },
					{ label: "Second", icon: "two", handler: () => {} },
				]}
				className="test-class"
			/>,
			"when mounted",
			"with event",
			{ type: "click", target: ".test-class" },
			"to satisfy",
			<Wrapper>
				<Header open className="test-class">
					TestLabel
					<Indicator open={true} />
				</Header>
				<Drawer in>
					<List>
						<Item>
							<ItemIcon id="one" />
							First
						</Item>
						<Item>
							<ItemIcon id="two" />
							Second
						</Item>
					</List>
				</Drawer>
			</Wrapper>,
		));

	describe("two adjacent, independent menus", () => {
		const MakeMenu = ({ num }) => (
			<DropMenu
				menuLabel={"TestLabel " + num}
				menuItems={[
					{ label: "First", icon: "one", handler: () => {} },
					{ label: "Second", icon: "two", handler: () => {} },
				]}
				className={"test-class-" + num}
			/>
		);

		it("renders the anchors", () =>
			expect(
				<div>
					<MakeMenu num="1" />
					<MakeMenu num="2" />
				</div>,
				"when mounted",
				"to satisfy",
				<div>
					<Wrapper>
						<Header className="test-class-1">
							TestLabel 1
							<Indicator />
						</Header>
					</Wrapper>
					<Wrapper>
						<Header className="test-class-2">
							TestLabel 2
							<Indicator />
						</Header>
					</Wrapper>
				</div>,
			));

		it("when clicked renders the menu", () =>
			expect(
				<div>
					<MakeMenu num="1" />
					<MakeMenu num="2" />
				</div>,
				"when mounted",
				"with event",
				{ type: "click", target: ".test-class-2" },
				"to satisfy",
				<div>
					<Wrapper>
						<Header className="test-class-1">
							TestLabel 1
							<Indicator />
						</Header>
					</Wrapper>
					<Wrapper>
						<Header open className="test-class-2">
							TestLabel 2
							<Indicator open={true} />
						</Header>
						<Drawer in>
							<List>
								<Item>
									<ItemIcon id="one" />
									First
								</Item>
								<Item>
									<ItemIcon id="two" />
									Second
								</Item>
							</List>
						</Drawer>
					</Wrapper>
				</div>,
			));
	});
});
