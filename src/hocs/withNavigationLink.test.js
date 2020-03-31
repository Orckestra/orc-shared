import React from "react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { mount, simulate } from "react-dom-testing";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import withNavigationLink from "./withNavigationLink";

const TestComp = ({ active, staticContext, ...props }) => (
	<a {...props}>Anchor{active ? " active" : ""}</a>
);

describe("withNavigationLink", () => {
	let fakeStore, mockEvent, history, preventDefault;
	beforeEach(() => {
		fakeStore = {
			subscribe: () => {},
			getState: () => {},
			dispatch: () => {},
		};
		history = createMemoryHistory();
		sinon.spy(history, "push");
		preventDefault = sinon.spy().named("event.preventDefault");
		mockEvent = {
			type: "click",
			data: { preventDefault },
		};
	});

	spyOnConsole(["warn"]);

	it("provides a deprecation warning on use", () =>
		expect(withNavigationLink, "when called with", [TestComp])
			.then(Comp => {
				mount(
					<Provider store={fakeStore}>
						<Router history={history}>
							<Comp href="/foo" />
						</Router>
					</Provider>,
				);
			})
			.then(() =>
				expect(console.warn, "to have a call satisfying", {
					args: [expect.it("to contain", "withNavigationLink has been deprecated")],
				}),
			));

	it("sets an active flag if the current path matches the href", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={fakeStore}>
					<Router history={history}>
						<Comp href="/" />
					</Router>
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestComp active />,
			),
		));

	it("omits active flag if the current path does not match the href", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={fakeStore}>
					<Router history={history}>
						<Comp href="/foo" />
					</Router>
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestComp active={false} />,
			),
		));

	it("sets onClick handler (navigating via router) on local hrefs", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp => {
			const element = mount(
				<Provider store={fakeStore}>
					<Router history={history}>
						<Comp href="/foo" />
					</Router>
				</Provider>,
			);
			simulate(element, mockEvent);
			return Promise.all([
				expect(preventDefault, "was called"),
				expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]),
			]);
		}));

	it("does not navigate on self href", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp => {
			const element = mount(
				<Provider store={fakeStore}>
					<Router history={history}>
						<Comp href="/" />
					</Router>
				</Provider>,
			);
			simulate(element, mockEvent);
			return Promise.all([
				expect(preventDefault, "was called"),
				expect(history.push, "was not called"),
			]);
		}));

	it("does navigate to remote hrefs", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp => {
			const element = mount(
				<Provider store={fakeStore}>
					<Router history={history}>
						<Comp href="http://google.com/" />
					</Router>
				</Provider>,
			);
			simulate(element, mockEvent);
			return Promise.all([
				expect(preventDefault, "was not called"),
				expect(history.push, "was not called"),
			]);
		}));

	it("no href does not navigate", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp => {
			const element = mount(
				<Provider store={fakeStore}>
					<Router history={history}>
						<Comp />
					</Router>
				</Provider>,
			);
			simulate(element, mockEvent);
			return Promise.all([
				expect(preventDefault, "was called"),
				expect(history.push, "was not called"),
			]);
		}));
});
