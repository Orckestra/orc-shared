import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import sinon from "sinon";
import DropMenu, { AnchorWrapper, Wrapper } from "./index";
import Menu, { Drawer, List, Item, ItemIcon } from "./Menu";
import { getStyledClassSelector } from "../../utils/testUtils";

const TestAnchor = ({ id, open }) => (
	<div id={id} data-open={open}>
		Test anchor
	</div>
);

describe("DropMenu", () => {
	it("renders an anchor and a menu", () =>
		expect(
			<DropMenu id="test" menuItems={[]} className="test-class">
				TestLabel
			</DropMenu>,
			"when mounted",
			"to satisfy",
			<Wrapper className="test-class">
				<AnchorWrapper id="testAnchor">TestLabel</AnchorWrapper>
				<Menu id="testDropdown" menuItems={[]} />
			</Wrapper>,
		));

	it("flags anchor and menu when open", () =>
		expect(
			<DropMenu id="test" initOpen menuItems={[]}>
				TestLabel
			</DropMenu>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<AnchorWrapper id="testAnchor" open>
					TestLabel
				</AnchorWrapper>
				<Menu id="testDropdown" open menuItems={[]} />
			</Wrapper>,
		));

	it("renders a right-aligned menu on demand", () =>
		expect(
			<DropMenu id="test" initOpen menuItems={[]} alignRight>
				TestLabel
			</DropMenu>,
			"when mounted",
			"to contain",
			<Menu id="testDropdown" open menuItems={[]} alignRight />,
		));

	it("when clicked renders the menu", () =>
		expect(
			<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
				<DropMenu
					id="test"
					menuItems={[
						{ label: "First", icon: "one", handler: () => {} },
						{ label: "Second", icon: "two", handler: () => {} },
					]}
					className="test-class"
				>
					TestLabel
				</DropMenu>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: "#testAnchor" },
			"to satisfy",
			<Wrapper className="test-class">
				<AnchorWrapper id="testAnchor" open>
					TestLabel
				</AnchorWrapper>
				<Drawer in>
					<List id="testDropdown">
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

	it("closes the menu if clicked outside", () => {
		const clock = sinon.useFakeTimers();
		const menuNode = document.createElement("div");
		document.body.appendChild(menuNode);
		const menu = ReactDOM.render(
			<div>
				<div id="outside" />
				<Provider
					store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}
				>
					<DropMenu
						id="test"
						menuItems={[
							{ label: "First", icon: "one", handler: () => {} },
							{ label: "Second", icon: "two", handler: () => {} },
						]}
						className="test-class"
					>
						TestLabel
					</DropMenu>
				</Provider>
			</div>,
			menuNode,
		);
		const anchor = menuNode.querySelector("#testAnchor");
		const outside = menuNode.querySelector("div#outside");
		try {
			expect(menu, "not to contain elements matching", getStyledClassSelector(List));
			act(() => {
				anchor.click();
			});
			expect(menu, "to contain elements matching", getStyledClassSelector(List));
			act(() => {
				outside.click();
			});
			expect(
				menu,
				"to contain",
				<AnchorWrapper id="testAnchor" open={false}>
					TestLabel
				</AnchorWrapper>,
			);
			act(() => {
				clock.tick(1000); // Wait for the menu to unrender
			});
			expect(menu, "not to contain elements matching", getStyledClassSelector(List));
		} finally {
			ReactDOM.unmountComponentAtNode(menuNode);
			document.body.removeChild(menuNode);
			clock.restore();
		}
	});

	describe("component child", () => {
		it("renders an anchor and a menu", () =>
			expect(
				<DropMenu id="test" menuItems={[]} className="test-class">
					<TestAnchor />
				</DropMenu>,
				"when mounted",
				"to satisfy",
				<Wrapper className="test-class">
					<AnchorWrapper id="testAnchor">
						<TestAnchor open={false} />
					</AnchorWrapper>
					<Menu id="testDropdown" menuItems={[]} />
				</Wrapper>,
			));

		it("flags children when open", () =>
			expect(
				<DropMenu id="test" initOpen menuItems={[]}>
					<TestAnchor />
				</DropMenu>,
				"when mounted",
				"to satisfy",
				<Wrapper>
					<AnchorWrapper id="testAnchor" open>
						<TestAnchor open />
					</AnchorWrapper>
					<Menu id="testDropdown" open menuItems={[]} />
				</Wrapper>,
			));

		it("when clicked renders the menu", () =>
			expect(
				<Provider
					store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}
				>
					<DropMenu
						id="test"
						menuItems={[
							{ label: "First", icon: "one", handler: () => {} },
							{ label: "Second", icon: "two", handler: () => {} },
						]}
						className="test-class"
					>
						<TestAnchor />
					</DropMenu>
				</Provider>,
				"when mounted",
				"with event",
				{ type: "click", target: "#testAnchor" },
				"to satisfy",
				<Wrapper>
					<AnchorWrapper id="testAnchor" open>
						<TestAnchor open />
					</AnchorWrapper>
					<Drawer in>
						<List id="testDropdown">
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

		it("closes the menu if clicked outside", () => {
			const clock = sinon.useFakeTimers();
			const menuNode = document.createElement("div");
			document.body.appendChild(menuNode);
			const menu = ReactDOM.render(
				<div>
					<div id="outside" />
					<Provider
						store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}
					>
						<DropMenu
							id="test"
							menuItems={[
								{ label: "First", icon: "one", handler: () => {} },
								{ label: "Second", icon: "two", handler: () => {} },
							]}
							className="test-class"
						>
							<TestAnchor />
						</DropMenu>
					</Provider>
				</div>,
				menuNode,
			);
			const anchor = menuNode.querySelector("#testAnchor");
			const outside = menuNode.querySelector("div#outside");
			try {
				expect(menu, "not to contain elements matching", getStyledClassSelector(List));
				act(() => {
					anchor.click();
				});
				expect(menu, "to contain elements matching", getStyledClassSelector(List));
				act(() => {
					outside.click();
				});
				expect(menu, "to contain", <TestAnchor />);
				act(() => {
					clock.tick(1000); // Wait for the menu to unrender
				});
				expect(menu, "not to contain elements matching", getStyledClassSelector(List));
			} finally {
				ReactDOM.unmountComponentAtNode(menuNode);
				document.body.removeChild(menuNode);
				clock.restore();
			}
		});
	});

	describe("two adjacent, independent menus", () => {
		const MakeMenu = ({ num }) => (
			<DropMenu
				id={"menu" + num}
				menuItems={[
					{ label: "First", icon: "one", handler: () => {} },
					{ label: "Second", icon: "two", handler: () => {} },
				]}
				className={"test-class-" + num}
			>
				{"TestLabel " + num}
			</DropMenu>
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
					<Wrapper className="test-class-1">
						<AnchorWrapper>TestLabel 1</AnchorWrapper>
					</Wrapper>
					<Wrapper className="test-class-2">
						<AnchorWrapper>TestLabel 2</AnchorWrapper>
					</Wrapper>
				</div>,
			));

		it("when clicked renders only the clicked menu", () => {
			const clock = sinon.useFakeTimers();
			const menuNode = document.createElement("div");
			document.body.appendChild(menuNode);
			ReactDOM.render(
				<Provider
					store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}
				>
					<>
						<MakeMenu num="1" />
						<MakeMenu num="2" />
					</>
				</Provider>,
				menuNode,
			);
			const anchor1 = menuNode.querySelector("#menu1Anchor");
			const anchor2 = menuNode.querySelector("#menu2Anchor");
			expect(
				menuNode,
				"to satisfy",
				<div>
					<Wrapper className="test-class-1">
						<AnchorWrapper>TestLabel 1</AnchorWrapper>
					</Wrapper>
					<Wrapper className="test-class-2">
						<AnchorWrapper>TestLabel 2</AnchorWrapper>
					</Wrapper>
				</div>,
			);
			act(() => {
				anchor2.click();
			});
			expect(
				menuNode,
				"to satisfy",
				<div>
					<Wrapper className="test-class-1">
						<AnchorWrapper>TestLabel 1</AnchorWrapper>
					</Wrapper>
					<Wrapper className="test-class-2">
						<AnchorWrapper open>TestLabel 2</AnchorWrapper>
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
			);
			act(() => {
				anchor1.click();
			});
			act(() => {
				clock.tick(1000); // Wait for the previous menu to unrender
			});
			expect(
				menuNode,
				"to satisfy",
				<div>
					<Wrapper className="test-class-1">
						<AnchorWrapper open>TestLabel 1</AnchorWrapper>
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
					<Wrapper className="test-class-2">
						<AnchorWrapper>TestLabel 2</AnchorWrapper>
					</Wrapper>
				</div>,
			);
		});
	});
});
