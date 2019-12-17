import React from "react";
import sinon from "sinon";
import DropMenu, { Wrapper } from "./DropMenu";
import Anchor, { Header, Indicator } from "./Anchor";
import Menu, { Drawer, List, Item, ItemIcon } from "./Menu";
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
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Anchor onClick={toggle} menuLabel="TestLabel" className="test-class" />
				<Menu menuItems={[]} toggle={toggle} />
			</Wrapper>,
		));

	it("flags anchor and menu when open", () =>
		expect(
			<DropMenu open toggle={toggle} menuLabel="TestLabel" menuItems={[]} />,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Anchor onClick={toggle} open menuLabel="TestLabel" className="" />
				<Menu open menuItems={[]} toggle={toggle} />
			</Wrapper>,
		));

	describe("with state handling", () => {
		it("renders the anchor", () =>
			expect(
				<FullMenu
					menuLabel="TestLabel"
					menuItems={[
						{ label: "First", icon: "one", handler: () => {} },
						{ label: "Second", icon: "two", handler: () => {} },
					]}
					className="test-class"
				/>,
				"when mounted",
				"to satisfy",
				<Wrapper>
					<Header className="test-class">
						TestLabel
						<Indicator />
					</Header>
				</Wrapper>,
			));

		it("when clicked renders the menu", () =>
			expect(
				<FullMenu
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
								<span>First</span>
							</Item>
							<Item>
								<ItemIcon id="two" />
								<span>Second</span>
							</Item>
						</List>
					</Drawer>
				</Wrapper>,
			));

		describe("two adjacent, independent menus", () => {
			const MakeMenu = ({ num }) => (
				<FullMenu
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
										<span>First</span>
									</Item>
									<Item>
										<ItemIcon id="two" />
										<span>Second</span>
									</Item>
								</List>
							</Drawer>
						</Wrapper>
					</div>,
				));
		});
	});
});
