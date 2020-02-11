import React from "react";
import { Provider } from "react-redux";
import Immutable from "immutable";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { mount, simulate } from "react-dom-testing";
import sinon from "sinon";
import useNavigationHandler from "./useNavigationHandler";

describe("useNavigationHandler", () => {
	const TestComp = ({ href, ...props }) => {
		const [onClick, active] = useNavigationHandler(href);
		return (
			<a href={href} onClick={onClick} data-active={active} {...props}>
				Anchor
			</a>
		);
	};

	let fakeStore, mockEvent, history, preventDefault;
	beforeEach(() => {
		fakeStore = {
			subscribe: () => {},
			getState: () =>
				Immutable.fromJS({
					navigation: {
						route: {
							match: {
								path: "/:scope/Bar",
								params: { scope: "Foo" },
							},
						},
					},
					router: {},
				}),
			dispatch: () => {},
		};
		history = createMemoryHistory({ initialEntries: ["/Foo/Bar"] });
		sinon.spy(history, "push");
		preventDefault = sinon.spy().named("event.preventDefault");
		mockEvent = {
			type: "click",
			data: { preventDefault },
		};
	});

	it("sets an active flag if the current path matches the href", () =>
		expect(
			<Provider store={fakeStore}>
				<Router history={history}>
					<TestComp href="/Foo/Bar" />
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<a href="/Foo/Bar" data-active>
				Anchor
			</a>,
		));

	it("omits active flag if the current path does not match the href", () =>
		expect(
			<Provider store={fakeStore}>
				<Router history={history}>
					<TestComp href="/foo" />
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<a href="/foo" data-active={false}>
				Anchor
			</a>,
		));

	it("sets onClick handler (navigating via router) on local hrefs", () => {
		const element = mount(
			<Provider store={fakeStore}>
				<Router history={history}>
					<TestComp href="/foo" />
				</Router>
			</Provider>,
		);
		simulate(element, mockEvent);
		return Promise.all([
			expect(preventDefault, "was called"),
			expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]),
		]);
	});

	it("does not navigate on self href", () => {
		const element = mount(
			<Provider store={fakeStore}>
				<Router history={history}>
					<TestComp href="/Foo/Bar" />
				</Router>
			</Provider>,
		);
		simulate(element, mockEvent);
		return Promise.all([
			expect(preventDefault, "was called"),
			expect(history.push, "was not called"),
		]);
	});

	it("does navigate to remote hrefs", () => {
		const element = mount(
			<Provider store={fakeStore}>
				<Router history={history}>
					<TestComp href="http://google.com/" />
				</Router>
			</Provider>,
		);
		simulate(element, mockEvent);
		return Promise.all([
			expect(preventDefault, "was not called"),
			expect(history.push, "was not called"),
		]);
	});

	it("no href does not navigate", () => {
		const element = mount(
			<Provider store={fakeStore}>
				<Router history={history}>
					<TestComp />
				</Router>
			</Provider>,
		);
		simulate(element, mockEvent);
		return Promise.all([
			expect(preventDefault, "was called"),
			expect(history.push, "was not called"),
		]);
	});
});
