import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { MemoryRouter, Router } from "react-router";
import { createMemoryHistory } from "history";
import I18n from "../I18n";
import SegmentPage, { Wrapper, Item, List } from "./SegmentPage";

const View1 = () => <div id="view1" />;
const View2 = () => <div id="view2" />;
const View3 = () => <div id="view3" />;
const View4 = () => <div id="view4" />;

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
			"/one": {
				label: "Text",
				component: View1,
				subpages: {
					"/sub": {
						component: View4,
					},
				},
			},
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
					<ThemeProvider theme={{}}>
						<I18n>
							<SegmentPage
								path="/:scope/meep"
								segments={segments}
								match={{ params: { scope: "foo" } }}
								location={{ pathname: "/foo/meep/two" }}
							/>
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter initialEntries={["/foo/meep/two"]}>
				<Wrapper>
					<List>
						<Item to="/foo/meep/one">
							<span>Text</span>
						</Item>
						<Item to="/foo/meep/two" active>
							<span>Translated</span>
						</Item>
					</List>
					<View2 />
				</Wrapper>
			</MemoryRouter>,
		);
	});

	it("shows a subpage under the matched segment", () => {
		state.setIn(
			["navigation", "route"],
			Immutable.fromJS({
				location: { pathname: "/foo/meep/one/sub", search: "", hash: "" },
				match: {
					path: "/:scope/meep/one/sub",
					url: "/foo/meep/one/sub",
					params: { scope: "foo" },
					isExact: true,
				},
			}),
		);
		return expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/meep/one/sub"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<SegmentPage
								path="/:scope/meep"
								segments={segments}
								match={{ params: { scope: "foo" } }}
								location={{ pathname: "/foo/meep/one/sub" }}
							/>
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			expect.it("to contain", <View1 />).and("to contain", <View4 />),
		);
	});

	it("shows the relevant page under a segment if it is matched", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/meep/two/sub"]}>
					<ThemeProvider theme={{}}>
						<SegmentPage
							path="/:scope/meep"
							segments={segments}
							match={{ params: { scope: "foo" } }}
							location={{ pathname: "/foo/meep/two" }}
						/>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			expect.it("to satisfy", <View3 />),
		));

	it("has a catching redirect when no path is matched", () => {
		const history = createMemoryHistory({
			initialEntries: ["/foo/meep"],
		});
		return expect(
			<Provider store={store}>
				<Router history={history}>
					<ThemeProvider theme={{}}>
						<SegmentPage
							path="/:scope/meep"
							segments={segments}
							match={{ params: { scope: "foo" } }}
							location={{ pathname: "/foo/meep" }}
						/>
					</ThemeProvider>
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<MemoryRouter>
					<List>
						<Item to="/foo/meep/one">
							<span>Text</span>
						</Item>
						<Item to="/foo/meep/two">
							<span>Translated</span>
						</Item>
					</List>
				</MemoryRouter>
				<View1 />
			</Wrapper>,
		).then(() =>
			expect(history, "to satisfy", {
				location: { pathname: "/foo/meep/one" },
			}),
		);
	});
});
