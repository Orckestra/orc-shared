import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Segment from "./Segment";

const View = () => <div id="view" />;

describe("Segment", () => {
	let match, state, store;
	beforeEach(() => {
		match = { path: "/foo/bar", url: "/foo/bar", params: {} };
		state = Immutable.fromJS({
			navigation: {
				route: {
					match,
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
				<MemoryRouter initialEntries={["/foo/bar"]}>
					<Segment location={{ pathname: "/" }} config={{ component: View }} match={match} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<View />,
		));
});
