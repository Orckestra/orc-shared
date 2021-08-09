import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { spyOnConsole } from "../utils/testUtils";
import routingConnector from "./routingConnector";

const TestComp = () => <div />;

describe("routingConnector", () => {
	let store;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			getState: () => ({}),
			dispatch: () => {},
		};
	});
	spyOnConsole(["warn"]);

	it("gives deprecation warning", () =>
		expect(routingConnector, "when called with", [() => ({})], "when called with", [TestComp])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<MemoryRouter>
							<EnhComp />
						</MemoryRouter>
					</Provider>,
					"when mounted",
					"to satisfy",
					<TestComp />,
				),
			)
			.then(() =>
				expect(console.warn, "to have a call satisfying", {
					args: [expect.it("to contain", "routingConnector has been deprecated")],
				}),
			));
});
