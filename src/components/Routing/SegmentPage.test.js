import React from "react";
import Immutable from "immutable";
import { MemoryRouter, Router } from "react-router";
import { createMemoryHistory } from "history";
import SegmentPage, { Wrapper, Item, List } from "./SegmentPage";
import Grid from "@material-ui/core/Grid";
import TooltippedTypography from "./../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import { TestWrapper, createMuiTheme } from "../../utils/testUtils";
import translations from "~/translations/en-US.json";

const View1 = () => <div id="view1" />;
const View2 = () => <div id="view2" />;
const View3 = () => <div id="view3" />;
const View4 = () => <div id="view4" />;
const View5 = () => <div id="view5" />;

jest.mock("translations/en-US.json", () => ({
	"orc-shared.close": "Close",
}));

const ComponentLabel = () => <p>Component</p>;

describe("SegmentPage", () => {
	let state, store, segments;

	const theme = createMuiTheme();

	const intlProvider = { messages: translations };

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
						title: "Sub Page Title",
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
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<MemoryRouter initialEntries={["/foo/meep/entityIdValue/two"]}>
					<SegmentPage
						path="/:scope/meep/entityIdValue"
						segments={segments}
						match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
						location={{ pathname: "/foo/meep/entityIdValue/two" }}
					/>
				</MemoryRouter>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
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
				</MemoryRouter>
			</TestWrapper>,
		);
	});

	it("shows a view over the segment list/view", () => {
		return expect(
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<MemoryRouter initialEntries={["/foo/meep/entityIdValue/two"]}>
					<div>
						<SegmentPage
							path="/:scope/meep/entityIdValue"
							component={View4}
							segments={segments}
							match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
							location={{ pathname: "/foo/meep/entityIdValue/two" }}
						/>
					</div>
				</MemoryRouter>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
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
				</MemoryRouter>
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<MemoryRouter initialEntries={["/foo/meep/entityIdValue/one/sub"]}>
					<SegmentPage
						path="/:scope/meep/entityIdValue"
						segments={segments}
						match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
						location={{ pathname: "/foo/meep/entityIdValue/one/sub" }}
					/>
				</MemoryRouter>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect.it("to contain", <View1 />).and("to contain", <View4 />),
		);
	});

	it("shows the relevant page under a segment if it is matched", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<MemoryRouter initialEntries={["/foo/meep/entityIdValue/two/sub"]}>
					<SegmentPage
						path="/:scope/meep/entityIdValue"
						segments={segments}
						match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
						location={{ pathname: "/foo/meep/entityIdValue/two" }}
					/>
				</MemoryRouter>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			expect.it("to satisfy", <View3 />),
		));

	it("has a catching redirect when no path is matched", () => {
		const history = createMemoryHistory({
			initialEntries: ["/foo/meep/entityIdValue"],
		});
		return expect(
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<Router history={history}>
					<SegmentPage
						path="/:scope/meep/entityIdValue"
						segments={segments}
						match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
						location={{ pathname: "/foo/meep/entityIdValue" }}
					/>
				</Router>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
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
				</Wrapper>
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
				<Router history={history}>
					<SegmentPage
						path="/:scope/meep/entityIdValue"
						segments={segments}
						match={{ params: { scope: "foo", entityId: "entityIdValue" } }}
						location={{ pathname: "/foo/meep/entityIdValue" }}
						entityIdResolver={() => "anotherId"}
					/>
				</Router>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={intlProvider} stylesProvider muiThemeProvider={{ theme }}>
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
				</Wrapper>
			</TestWrapper>,
		).then(() =>
			expect(history, "to satisfy", {
				location: { pathname: "/foo/meep/entityIdValue/one" },
			}),
		);
	});
});
