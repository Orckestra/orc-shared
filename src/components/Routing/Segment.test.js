import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Segment from "./Segment";

const View = props => {
	const { foo, bar } = props;

	return <div id="view" {...{ foo, bar }} />;
};

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
			requests: {
				logout: false,
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

	it("shows the selected view with props", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/bar"]}>
					<Segment
						location={{ pathname: "/" }}
						config={{ component: View, componentProps: { foo: "foo", bar: "bar" } }}
						match={match}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<View foo="foo" bar="bar" />,
		));
});
