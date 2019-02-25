import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { Switch, MemoryRouter, Route, Redirect } from "react-router";
import Text from "../Text";
import I18n from "../I18n";
import SegmentPage, { Wrapper, Item, List } from "./SegmentPage";

const View1 = () => <div />;
const View2 = () => <div />;
const View3 = () => <div />;

describe("SegmentPage", () => {
	let state, store, segments;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en",
				supportedLocales: ["en"],
			},
			navigation: {
				route: {
					location: { pathname: "/foo/meep/two", search: "", hash: "" },
					match: {
						path: "/:scope/meep/two",
						url: "/foo/meep/two",
						params: { scope: "foo" },
						isExact: true,
					},
				},
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		};
		segments = {
			"/one": { label: "Text", component: View1 },
			"/two": {
				label: {
					id: "message.translate",
					defaultMessage: "Translated",
				},
				component: View2,
				pages: {
					"/:name": {
						label: "Page under segment",
						component: View3,
					},
				},
			},
		};
	});

	it("shows a list of links to segments", () => {
		return expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/meep/two"]}>
					<I18n>
						<SegmentPage
							path="/:scope/meep"
							segments={segments}
							match={{ params: { scope: "foo" } }}
							location={{ pathname: "/foo/meep/two" }}
						/>
					</I18n>
				</MemoryRouter>
			</Provider>,
			"when deeply rendered",
			"queried for",
			<Wrapper />,
			"to have rendered",
			<Wrapper>
				<List>
					<Item to="/foo/meep/one">
						<Text message="Text" />
					</Item>
					<Item to="/foo/meep/two" active>
						<Text
							message={{
								id: "message.translate",
								defaultMessage: "Translated",
							}}
						/>
					</Item>
				</List>
				<Switch />
			</Wrapper>,
		);
	});

	it("shows the matched segment view", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/meep/two"]}>
					<I18n>
						<SegmentPage
							path="/:scope/meep"
							segments={segments}
							match={{ params: { scope: "foo" } }}
							location={{ pathname: "/foo/meep/two" }}
						/>
					</I18n>
				</MemoryRouter>
			</Provider>,
			"when deeply rendered",
			"queried for",
			<Wrapper />,
			"to have rendered",
			<Wrapper>
				<List />
				<Switch>
					<Route path="/:scope/meep/two">
						<View2 />
					</Route>
				</Switch>
			</Wrapper>,
		));

	it("shows the relevant page under a segment if it is matched", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/meep/two/sub"]}>
					<SegmentPage
						path="/:scope/meep"
						segments={segments}
						match={{ params: { scope: "foo" } }}
						location={{ pathname: "/foo/meep/two" }}
					/>
				</MemoryRouter>
			</Provider>,
			"when deeply rendered",
		).then(render =>
			expect(
				render,
				"to have rendered",
				<Switch>
					<Route path="/:scope/meep/two/:name">
						<View3 match={{ params: { scope: "foo", name: "sub" } }} />
					</Route>
				</Switch>,
			).and("not to contain", <Wrapper />),
		));

	it("has a catching redirect when no path is matched", () =>
		expect(
			<SegmentPage
				path="/:scope/meep"
				segments={segments}
				match={{ params: { scope: "foo" } }}
				location={{ pathname: "/foo/meep/two" }}
			/>,
			"to render as",
			<Switch>
				<Route
					render={expect.it(
						"when called",
						"to satisfy",
						<Wrapper>
							<Switch>
								<Route />
								<Route />
								<Redirect exact path="/:scope/meep" to="/foo/meep/one" />
							</Switch>
						</Wrapper>,
					)}
				/>
			</Switch>,
		));
});
