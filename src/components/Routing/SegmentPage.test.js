import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { MemoryRouter, Router } from "react-router";
import { createMemoryHistory } from "history";
import I18n from "../I18n";
import SegmentPage, { Wrapper, Item, List } from "./SegmentPage";
import Grid from "@material-ui/core/Grid";
import TooltippedTypography from "./../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";

const View1 = () => <div id="view1" />;
const View2 = () => <div id="view2" />;
const View3 = () => <div id="view3" />;
const View4 = () => <div id="view4" />;
const View5 = () => <div id="view5" />;

const ComponentLabel = () => <p>Component</p>;

describe("SegmentPage", () => {
	let state, store, segments;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en-US",
				supportedLocales: ["en-US"],
			},
			requests: {
				logout: false,
			},
			navigation: {
				route: {
					location: { pathname: "/foo/meep/entityIdValue/two", search: "", hash: "" },
					match: {
						path: "/:scope/meep/entityIdValue/two",
						url: "/foo/meep/entityIdValue/two",
						params: { scope: "foo", entityId: "entityIdValue" },
						isExact: true,
					},
				},
				config: { prependPath: "/:scope/", prependHref: "/foo/" },
			},
			view: {
				edit: {
					meep: {
						entityIdValue: {
							two: {
								model: {
									field1: {
										value: "smth",
										wasModified: true,
										error: "error",
									},
								},
							},
						},
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
				label: "Translated",
				component: View2,
				pages: {
					"/:name": {
						label: "Page under segment",
						component: View3,
					},
				},
			},
			"/three": {
				label: "ComponentLabel",
				component: View5,
				labelComponent: <ComponentLabel />,
			},
			"/four": {
				label: "DisabledSection",
				disabled: true,
			},
			"/five": {
				label: "HiddenSection",
				hide: true,
			},
			"/six": {
				label: "DisabledSectionBySelector",
				disabled: () => state => true,
			},
			"/seven": {
				label: "HiddenBySelector",
				hide: () => state => true,
			},
		};
	});

	it("shows a list of links to segments", () => {
		return expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/meep/entityIdValue/two"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<SegmentPage
								path="/:scope/meep/entityIdValue"
								segments={segments}
								match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
								location={{ pathname: "/foo/meep/entityIdValue/two" }}
							/>
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter initialEntries={["/foo/meep/entityIdValue/two"]}>
				<Wrapper>
					<List>
						<Item to="/foo/meep/entityIdValue/one">
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>Text</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item to="/foo/meep/entityIdValue/two" active>
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>
									Translated
									<span>*</span>
								</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item to="/foo/meep/entityIdValue/three">
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>
									<TooltippedTypography children="ComponentLabel" titleValue="ComponentLabel" noWrap />
								</Grid>
								<Grid item>
									<ComponentLabel />
								</Grid>
							</Grid>
						</Item>
						<Item>
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>DisabledSection</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item>
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>DisabledSectionBySelector</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
					</List>
					<View2 />
				</Wrapper>
			</MemoryRouter>,
		);
	});

	it("shows a view over the segment list/view", () => {
		return expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/meep/entityIdValue/two"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<div>
								<SegmentPage
									path="/:scope/meep/entityIdValue"
									component={View4}
									segments={segments}
									match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
									location={{ pathname: "/foo/meep/entityIdValue/two" }}
								/>
							</div>
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter initialEntries={["/foo/meep/entityIdValue/two"]}>
				<div>
					<View4 />
					<Wrapper>
						<List>
							<Item to="/foo/meep/entityIdValue/one">
								<Grid container alignItems="center" wrap="nowrap">
									<Grid item>Text</Grid>
									<Grid item></Grid>
								</Grid>
							</Item>
							<Item to="/foo/meep/entityIdValue/two" active>
								<Grid container alignItems="center" wrap="nowrap">
									<Grid item>
										Translated
										<span>*</span>
									</Grid>
									<Grid item></Grid>
								</Grid>
							</Item>
							<Item to="/foo/meep/entityIdValue/three">
								<Grid container alignItems="center" wrap="nowrap">
									<Grid item>
										<TooltippedTypography children="ComponentLabel" titleValue="ComponentLabel" noWrap />
									</Grid>
									<Grid item>
										<ComponentLabel />
									</Grid>
								</Grid>
							</Item>
							<Item>
								<Grid container alignItems="center" wrap="nowrap">
									<Grid item>DisabledSection</Grid>
									<Grid item></Grid>
								</Grid>
							</Item>
							<Item>
								<Grid container alignItems="center" wrap="nowrap">
									<Grid item>DisabledSectionBySelector</Grid>
									<Grid item></Grid>
								</Grid>
							</Item>
						</List>
						<View2 />
					</Wrapper>
				</div>
			</MemoryRouter>,
		);
	});

	it("shows a subpage under the matched segment", () => {
		state.setIn(
			["navigation", "route"],
			Immutable.fromJS({
				location: { pathname: "/foo/meep/entityIdValue/one/sub", search: "", hash: "" },
				match: {
					path: "/:scope/meep/entityIdValue/one/sub",
					url: "/foo/meep/entityIdValue/one/sub",
					params: { scope: "foo", entityId: "entityIdValue" },
					isExact: true,
				},
			}),
		);
		return expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/foo/meep/entityIdValue/one/sub"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<SegmentPage
								path="/:scope/meep/entityIdValue"
								segments={segments}
								match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
								location={{ pathname: "/foo/meep/entityIdValue/one/sub" }}
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
				<MemoryRouter initialEntries={["/foo/meep/entityIdValue/two/sub"]}>
					<ThemeProvider theme={{}}>
						<SegmentPage
							path="/:scope/meep/entityIdValue"
							segments={segments}
							match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
							location={{ pathname: "/foo/meep/entityIdValue/two" }}
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
			initialEntries: ["/foo/meep/entityIdValue"],
		});
		return expect(
			<Provider store={store}>
				<Router history={history}>
					<ThemeProvider theme={{}}>
						<I18n>
							<SegmentPage
								path="/:scope/meep/entityIdValue"
								segments={segments}
								match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
								location={{ pathname: "/foo/meep/entityIdValue" }}
							/>
						</I18n>
					</ThemeProvider>
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<MemoryRouter>
					<List>
						<Item to="/foo/meep/entityIdValue/one">
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>Text</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item to="/foo/meep/entityIdValue/two">
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>
									Translated
									<span>*</span>
								</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item to="/foo/meep/entityIdValue/three">
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>
									<TooltippedTypography children="ComponentLabel" titleValue="ComponentLabel" noWrap />
								</Grid>
								<Grid item>
									<ComponentLabel />
								</Grid>
							</Grid>
						</Item>
						<Item>
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>DisabledSection</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item>
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>DisabledSectionBySelector</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
					</List>
				</MemoryRouter>
				<View1 />
			</Wrapper>,
		).then(() =>
			expect(history, "to satisfy", {
				location: { pathname: "/foo/meep/entityIdValue/one" },
			}),
		);
	});

	it("segment item is not flagged as modified because the entityId was overridden", () => {
		const history = createMemoryHistory({
			initialEntries: ["/foo/meep/entityIdValue"],
		});
		return expect(
			<Provider store={store}>
				<Router history={history}>
					<ThemeProvider theme={{}}>
						<I18n>
							<SegmentPage
								path="/:scope/meep/entityIdValue"
								segments={segments}
								match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
								location={{ pathname: "/foo/meep/entityIdValue" }}
								entityIdResolver={() => "anotherId"}
							/>
						</I18n>
					</ThemeProvider>
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<MemoryRouter>
					<List>
						<Item to="/foo/meep/entityIdValue/one">
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>Text</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item to="/foo/meep/entityIdValue/two">
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>Translated</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item to="/foo/meep/entityIdValue/three">
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>
									<TooltippedTypography children="ComponentLabel" titleValue="ComponentLabel" noWrap />
								</Grid>
								<Grid item>
									<ComponentLabel />
								</Grid>
							</Grid>
						</Item>
						<Item>
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>DisabledSection</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
						<Item>
							<Grid container alignItems="center" wrap="nowrap">
								<Grid item>DisabledSectionBySelector</Grid>
								<Grid item></Grid>
							</Grid>
						</Item>
					</List>
				</MemoryRouter>
				<View1 />
			</Wrapper>,
		).then(() =>
			expect(history, "to satisfy", {
				location: { pathname: "/foo/meep/entityIdValue/one" },
			}),
		);
	});
});
