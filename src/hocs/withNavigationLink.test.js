import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mount, simulate } from "react-dom-testing";
import sinon from "sinon";
import withNavigationLink from "./withNavigationLink";

const TestComp = ({ active, staticContext, ...props }) => (
	<a {...props}>Anchor{active ? " active" : ""}</a>
);

describe.only("withNavigationLink", () => {
	let fakeStore, mockEvent;
	beforeEach(() => {
		fakeStore = {
			subscribe: () => {},
			getState: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
		mockEvent = {
			type: "click",
			data: { preventDefault: sinon.spy().named("event.preventDefault") },
		};
	});
	it("sets an active flag if the current path matches the href", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={fakeStore}>
					<MemoryRouter>
						<Comp href="/" />
					</MemoryRouter>
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
					<MemoryRouter>
						<Comp href="/foo" />
					</MemoryRouter>
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
					<MemoryRouter>
						<Comp href="/foo" />
					</MemoryRouter>
				</Provider>,
			);
			simulate(element, mockEvent);
			return Promise.all([
				expect(mockEvent.data.preventDefault, "was called"),
				expect(fakeStore.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								type: "@@router/CALL_HISTORY_METHOD",
								payload: { method: "push", args: ["/foo"] },
							},
						],
					},
				]),
			]);
		}));

	it("does not navigate on self href", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp => {
			const element = mount(
				<Provider store={fakeStore}>
					<MemoryRouter>
						<Comp href="/" />
					</MemoryRouter>
				</Provider>,
			);
			simulate(element, mockEvent);
			return Promise.all([
				expect(mockEvent.data.preventDefault, "was called"),
				expect(fakeStore.dispatch, "was not called"),
			]);
		}));

	it("does navigate to remote hrefs", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp => {
			const element = mount(
				<Provider store={fakeStore}>
					<MemoryRouter>
						<Comp href="http://google.com/" />
					</MemoryRouter>
				</Provider>,
			);
			simulate(element, mockEvent);
			return Promise.all([
				expect(mockEvent.data.preventDefault, "was not called"),
				expect(fakeStore.dispatch, "was not called"),
			]);
		}));

	it("no href does not navigate", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp => {
			const element = mount(
				<Provider store={fakeStore}>
					<MemoryRouter>
						<Comp />
					</MemoryRouter>
				</Provider>,
			);
			simulate(element, mockEvent);
			return Promise.all([
				expect(mockEvent.data.preventDefault, "was called"),
				expect(fakeStore.dispatch, "was not called"),
			]);
		}));
});
