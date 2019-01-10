import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import withNavigationLink from "./withNavigationLink";

const TestComp = props => <a {...props}>Anchor</a>;

describe.only("withNavigationLink", () => {
	let fakeStore, mockEvent;
	beforeEach(() => {
		fakeStore = {
			subscribe: () => {},
			getState: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
		mockEvent = {
			preventDefault: sinon.spy().named("event.preventDefault"),
		};
	});
	it("sets an active flag if the current path matches the href", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={fakeStore}>
					<Comp href="/" />
				</Provider>,
				"to deeply render as",
				<TestComp active />,
			),
		));

	it("omits active flag if the current path does not match the href", () =>
		expect(withNavigationLink, "when called with", [TestComp]).then(Comp =>
			expect(
				<Provider store={fakeStore}>
					<Comp href="/foo" />
				</Provider>,
				"to deeply render as",
				<TestComp active={false} />,
			),
		));

	it("sets onClick handler (navigating via router) on local hrefs", () =>
		expect(withNavigationLink, "when called with", [TestComp])
			.then(Comp =>
				expect(
					<Provider store={fakeStore}>
						<Comp href="/foo" />
					</Provider>,
					"to deeply render as",
					<TestComp
						onClick={expect
							.it("to be a function")
							.and("when called with", [mockEvent])}
					/>,
				),
			)
			.then(() =>
				Promise.all([
					expect(mockEvent.preventDefault, "was called"),
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
				]),
			));

	it("does not navigate on self href", () =>
		expect(withNavigationLink, "when called with", [TestComp])
			.then(Comp =>
				expect(
					<Provider store={fakeStore}>
						<Comp href="/" />
					</Provider>,
					"to deeply render as",
					<TestComp
						onClick={expect
							.it("to be a function")
							.and("when called with", [mockEvent])}
					/>,
				),
			)
			.then(() =>
				Promise.all([
					expect(mockEvent.preventDefault, "was called"),
					expect(fakeStore.dispatch, "was not called"),
				]),
			));

	it("does navigate to remote hrefs", () =>
		expect(withNavigationLink, "when called with", [TestComp])
			.then(Comp =>
				expect(
					<Provider store={fakeStore}>
						<Comp href="http://google.com/" />
					</Provider>,
					"to deeply render as",
					<TestComp
						onClick={expect
							.it("to be a function")
							.and("when called with", [mockEvent])}
					/>,
				),
			)
			.then(() =>
				Promise.all([
					expect(mockEvent.preventDefault, "was not called"),
					expect(fakeStore.dispatch, "was not called"),
				]),
			));

	it("no href does not navigate", () =>
		expect(withNavigationLink, "when called with", [TestComp])
			.then(Comp =>
				expect(
					<Provider store={fakeStore}>
						<Comp />
					</Provider>,
					"to deeply render as",
					<TestComp
						onClick={expect
							.it("to be a function")
							.and("when called with", [mockEvent])}
					/>,
				),
			)
			.then(() =>
				Promise.all([
					expect(mockEvent.preventDefault, "was called"),
					expect(fakeStore.dispatch, "was not called"),
				]),
			));
});
