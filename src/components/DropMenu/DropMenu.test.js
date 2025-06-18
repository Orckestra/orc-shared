import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import sinon from "sinon";
import { StylesProvider } from "@material-ui/core";
import { generateClassName } from "../../utils/testUtils";
import DropMenu, { Wrapper } from "./index";
import Menu from "./Menu";
import Icon from "../MaterialUI/DataDisplay/Icon";

describe("DropMenu", () => {
	it("renders an anchor and a menu", () =>
		expect(
			<StylesProvider generateClassName={generateClassName}>
				<DropMenu id="test" menuItems={[]} className="test-class">
					TestLabel
				</DropMenu>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<Wrapper className="test-class">
					<div id="testAnchor">TestLabel</div>
					<Menu id="testDropdown" menuItems={[]} />
				</Wrapper>
			</StylesProvider>,
		));

	it("flags anchor and menu when open", () =>
		expect(
			<StylesProvider generateClassName={generateClassName}>
				<DropMenu id="test" initOpen menuItems={[]}>
					TestLabel
				</DropMenu>
			</StylesProvider>,
			"when mounted",
			"to satisfy",
			<StylesProvider generateClassName={generateClassName}>
				<Wrapper>
					<div id="testAnchor">TestLabel</div>
					<Menu id="testDropdown" menuItems={[]} open />
				</Wrapper>
			</StylesProvider>,
		));

	it("renders a right-aligned menu on demand", () =>
		expect(
			<StylesProvider generateClassName={generateClassName}>
				<DropMenu id="test" initOpen menuItems={[]} alignRight>
					TestLabel
				</DropMenu>
			</StylesProvider>,
			"when mounted",
			"to contain",
			<StylesProvider generateClassName={generateClassName}>
				<Menu id="testDropdown" open menuItems={[]} alignRight />
			</StylesProvider>,
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
				<div id="testAnchor">TestLabel</div>
				<div className="enter-active">
					<ul id="testDropdown">
						<li>
							<Icon id="one" />
							First
						</li>
						<li>
							<Icon id="two" />
							Second
						</li>
					</ul>
				</div>
			</Wrapper>,
		));

	it("closes the menu if clicked outside", () => {
		const clock = sinon.useFakeTimers();
		const menuNode = document.createElement("div");
		document.body.appendChild(menuNode);
		// eslint-disable-next-line react/no-render-return-value
		ReactDOM.render(
			<div>
				<div id="outside" />
				<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
					<DropMenu
						id="test"
						menuItems={[
							{ label: "First", icon: "one", handler: () => {} },
							{ label: "Second", icon: "two", handler: () => {} },
						]}
					>
						TestLabel
					</DropMenu>
				</Provider>
			</div>,
			menuNode,
		);
		const anchor = menuNode.querySelector("#testAnchor");
		const outside = menuNode.querySelector("div#outside");
		const menuWrapper = menuNode.querySelector("div.exit-active");
		try {
			expect(menuWrapper, "to have attributes", {
				class: expect.it("to contain", "exit-active"),
			});
			act(() => {
				anchor.click();
				clock.tick(1000);
			});
			expect(menuWrapper, "to have attributes", {
				class: expect.it("to contain", "enter-active"),
			});
			act(() => {
				outside.click();
				clock.tick(1000);
			});
			expect(menuWrapper, "to have attributes", {
				class: expect.it("to contain", "exit-active"),
			});
		} finally {
			ReactDOM.unmountComponentAtNode(menuNode);
			document.body.removeChild(menuNode);
			clock.restore();
		}
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
				<StylesProvider generateClassName={generateClassName}>
					<div>
						<MakeMenu num="1" />
						<MakeMenu num="2" />
					</div>
				</StylesProvider>,
				"when mounted",
				"to satisfy",
				<StylesProvider generateClassName={generateClassName}>
					<div>
						<div>
							<div id="menu1Anchor">TestLabel 1</div>
							<div className="exit-active">
								<ul>
									<li>
										<Icon id="one" />
										First
									</li>
									<li>
										<Icon id="two" />
										Second
									</li>
								</ul>
							</div>
						</div>
						<div>
							<div id="menu2Anchor">TestLabel 2</div>
							<div className="exit-active">
								<ul>
									<li>
										<Icon id="one" />
										First
									</li>
									<li>
										<Icon id="two" />
										Second
									</li>
								</ul>
							</div>
						</div>
					</div>
				</StylesProvider>,
			));

		it("when clicked renders only the clicked menu", () => {
			const clock = sinon.useFakeTimers();
			const menuNode = document.createElement("div");
			document.body.appendChild(menuNode);
			ReactDOM.render(
				<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
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
					<div>
						<div id="menu1Anchor">TestLabel 1</div>
						<div className="exit-active">
							<ul>
								<li>
									<Icon id="one" />
									First
								</li>
								<li>
									<Icon id="two" />
									Second
								</li>
							</ul>
						</div>
					</div>
					<div>
						<div id="menu2Anchor">TestLabel 2</div>
						<div className="exit-active">
							<ul>
								<li>
									<Icon id="one" />
									First
								</li>
								<li>
									<Icon id="two" />
									Second
								</li>
							</ul>
						</div>
					</div>
				</div>,
			);
			act(() => {
				anchor2.click();
			});
			expect(
				menuNode,
				"to satisfy",
				<div>
					<div>
						<div id="menu1Anchor">TestLabel 1</div>
						<div className="exit-active">
							<ul>
								<li>
									<Icon id="one" />
									First
								</li>
								<li>
									<Icon id="two" />
									Second
								</li>
							</ul>
						</div>
					</div>
					<div>
						<div id="menu2Anchor">TestLabel 2</div>
						<div className="enter-active">
							<ul>
								<li>
									<Icon id="one" />
									First
								</li>
								<li>
									<Icon id="two" />
									Second
								</li>
							</ul>
						</div>
					</div>
				</div>,
			);
			act(() => {
				anchor1.click();
				clock.tick(1000);
			});
			expect(
				menuNode,
				"to satisfy",
				<div>
					<div>
						<div id="menu1Anchor">TestLabel 1</div>
						<div className="enter-active">
							<ul>
								<li>
									<Icon id="one" />
									First
								</li>
								<li>
									<Icon id="two" />
									Second
								</li>
							</ul>
						</div>
					</div>
					<div>
						<div id="menu2Anchor">TestLabel 2</div>
						<div className="exit-active">
							<ul>
								<li>
									<Icon id="one" />
									First
								</li>
								<li>
									<Icon id="two" />
									Second
								</li>
							</ul>
						</div>
					</div>
				</div>,
			);
		});
	});
});
