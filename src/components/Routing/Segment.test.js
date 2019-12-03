import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Segment from "./Segment";

const View = () => <div id="view" />;

describe("Segment", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: {
					match: { path: "/foo/bar", url: "/foo/bar", params: {} },
				},
			},
		});
		store = {
			getState: () => state,
			dispatch: () => {},
			subscribe: () => {},
		};
	});
	it("shows the selected view", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<Segment location={{ pathname: "/" }} config={{ component: View }} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<View />,
		));
});
