import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import { IntlProvider } from "react-intl";
import Menu from "./Menu";
import Icon from "../MaterialUI/DataDisplay/Icon";

describe("Menu", () => {
	it("renders a closed menu", () =>
		expect(
			<Menu menuItems={[{ label: "First", icon: "one", handler: () => {} }]} />,
			"when mounted",
			"to have style rules satisfying",
			"to match",
			/visibility:\s*hidden;/,
		));

	it("renders an open menu", () =>
		expect(
			<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
				<Menu
					id="testMenu"
					open
					menuItems={[
						{ id: "first", label: "First", icon: "one", handler: () => {} },
						{ id: "second", label: "Second", icon: "two", handler: () => {} },
					]}
					toggle={() => {}}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<ul id="testMenu">
					<li id="first">
						<Icon id="one" />
						First
					</li>
					<li id="second">
						<Icon id="two" />
						Second
					</li>
				</ul>
			</div>,
		));

	it("renders an open right-aligned menu", () =>
		expect(
			<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
				<Menu
					id="testMenu"
					open
					menuItems={[
						{ id: "first", label: "First", icon: "one", handler: () => {} },
						{ id: "second", label: "Second", icon: "two", handler: () => {} },
					]}
					toggle={() => {}}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>
				<ul id="testMenu">
					<li id="first">
						<Icon id="one" />
						First
					</li>
					<li id="second">
						<Icon id="two" />
						Second
					</li>
				</ul>
			</div>,
		));

	it("closes on click on item", () => {
		const reset = sinon.spy().named("reset");
		const handler = sinon.spy().named("handler");
		return expect(
			<Provider store={{ getState: () => ({}), subscribe: () => {}, dispatch: () => {} }}>
				<IntlProvider locale="en-US">
					<Menu open menuItems={[{ label: { id: "foo", defaultMessage: "Foo" }, handler }]} reset={reset} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: "li" },
			"to satisfy",
			<div>
				<ul>
					<li>Foo</li>
				</ul>
			</div>,
		).then(() => Promise.all([expect(reset, "was called"), expect(handler, "was called")]));
	});
});
