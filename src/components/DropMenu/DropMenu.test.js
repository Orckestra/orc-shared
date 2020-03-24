import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import sinon from "sinon";
import DropMenu, { Wrapper } from "./index";
import Anchor, { Header, Indicator } from "./Anchor";
import Menu, { Drawer, List, Item, ItemIcon } from "./Menu";
import { getStyledClassSelector } from "../../utils/testUtils";

const TestAnchor = ({ id, onClick, menuLabel, className, open }) => (
	<div
		id={id}
		onClick={onClick}
		className={className}
		data-open={open}
		data-label={menuLabel}
	/>
);

describe("DropMenu", () => {
	it("renders an anchor and a menu", () =>
		expect(
			<DropMenu id="test" menuLabel="TestLabel" menuItems={[]} className="test-class" />,
			"when mounted",
			"to satisfy",
			<Wrapper className="test-class">
				<Anchor id="testAnchor" menuLabel="TestLabel" />
				<Menu id="testDropdown" menuItems={[]} />
			</Wrapper>,
		));

	it("flags anchor and menu when open", () =>
		expect(
			<DropMenu id="test" initOpen menuLabel="TestLabel" menuItems={[]} />,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Anchor id="testAnchor" open menuLabel="TestLabel" />
				<Menu id="testDropdown" open menuItems={[]} />
			</Wrapper>,
		));

	it("renders a right-aligned menu on demand", () =>
		expect(
			<DropMenu id="test" initOpen menuLabel="TestLabel" menuItems={[]} alignRight />,
			"when mounted",
			"to contain",
			<Menu id="testDropdown" open menuItems={[]} alignRight />,
		));

	it("when clicked renders the menu", () =>
		expect(
			<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
				<DropMenu
					id="test"
					menuLabel="TestLabel"
					menuItems={[
						{ label: "First", icon: "one", handler: () => {} },
						{ label: "Second", icon: "two", handler: () => {} },
					]}
					className="test-class"
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: "#testAnchor" },
			"to satisfy",
			<Wrapper className="test-class">
				<Header id="testAnchor" open>
					TestLabel
					<Indicator open={true} />
				</Header>
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
						menuLabel="TestLabel"
						menuItems={[
							{ label: "First", icon: "one", handler: () => {} },
							{ label: "Second", icon: "two", handler: () => {} },
						]}
						className="test-class"
					/>
				</Provider>
			</div>,
			menuNode,
		);
		const anchor = menuNode.querySelector("#testAnchor");
		const outside = menuNode.querySelector("div#outside");
		try {
			expect(menu, "not to contain elements matching", getStyledClassSelector(<List />));
			act(() => {
				anchor.click();
			});
			expect(menu, "to contain elements matching", getStyledClassSelector(<List />));
			act(() => {
				outside.click();
			});
			expect(menu, "to contain", <Anchor id="testAnchor" menuLabel="TestLabel" />);
			act(() => {
				clock.tick(1000); // Wait for the menu to unrender
			});
			expect(menu, "not to contain elements matching", getStyledClassSelector(<List />));
		} finally {
			ReactDOM.unmountComponentAtNode(menuNode);
			document.body.removeChild(menuNode);
			clock.restore();
		}
	});

	describe("custom anchor", () => {
		it("renders an anchor and a menu", () =>
			expect(
				<DropMenu
					id="test"
					menuLabel="TestLabel"
					menuItems={[]}
					className="test-class"
					AnchorComponent={TestAnchor}
				/>,
				"when mounted",
				"to satisfy",
				<Wrapper className="test-class">
					<TestAnchor id="testAnchor" menuLabel="TestLabel" />
					<Menu id="testDropdown" menuItems={[]} />
				</Wrapper>,
			));

		it("flags anchor and menu when open", () =>
			expect(
				<DropMenu
					id="test"
					initOpen
					menuLabel="TestLabel"
					menuItems={[]}
					AnchorComponent={TestAnchor}
				/>,
				"when mounted",
				"to satisfy",
				<Wrapper>
					<TestAnchor id="testAnchor" open menuLabel="TestLabel" />
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
						menuLabel="TestLabel"
						menuItems={[
							{ label: "First", icon: "one", handler: () => {} },
							{ label: "Second", icon: "two", handler: () => {} },
						]}
						className="test-class"
						AnchorComponent={TestAnchor}
					/>
				</Provider>,
				"when mounted",
				"with event",
				{ type: "click", target: "#testAnchor" },
				"to satisfy",
				<Wrapper>
					<TestAnchor id="testAnchor" open menuLabel="TestLabel" />
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
							menuLabel="TestLabel"
							menuItems={[
								{ label: "First", icon: "one", handler: () => {} },
								{ label: "Second", icon: "two", handler: () => {} },
							]}
							className="test-class"
							AnchorComponent={TestAnchor}
						/>
					</Provider>
				</div>,
				menuNode,
			);
			const anchor = menuNode.querySelector("#testAnchor");
			const outside = menuNode.querySelector("div#outside");
			try {
				expect(
					menu,
					"not to contain elements matching",
					getStyledClassSelector(<List />),
				);
				act(() => {
					anchor.click();
				});
				expect(menu, "to contain elements matching", getStyledClassSelector(<List />));
				act(() => {
					outside.click();
				});
				expect(menu, "to contain", <TestAnchor id="testAnchor" menuLabel="TestLabel" />);
				act(() => {
					clock.tick(1000); // Wait for the menu to unrender
				});
				expect(
					menu,
					"not to contain elements matching",
					getStyledClassSelector(<List />),
				);
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
					<Wrapper className="test-class-1">
						<Header>
							TestLabel 1
							<Indicator />
						</Header>
					</Wrapper>
					<Wrapper className="test-class-2">
						<Header>
							TestLabel 2
							<Indicator />
						</Header>
					</Wrapper>
				</div>,
			));

		it("when clicked renders the menu", () =>
			expect(
				<Provider
					store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}
				>
					<div>
						<MakeMenu num="1" />
						<MakeMenu num="2" />
					</div>
				</Provider>,
				"when mounted",
				"with event",
				{ type: "click", target: "#menu2Anchor" },
				"to satisfy",
				<div>
					<Wrapper className="test-class-1">
						<Header>
							TestLabel 1
							<Indicator />
						</Header>
					</Wrapper>
					<Wrapper className="test-class-2">
						<Header open>
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
