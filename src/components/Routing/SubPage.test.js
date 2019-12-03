import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Router, MemoryRouter, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { createMemoryHistory } from "history";
import Immutable from "immutable";
import { Ignore } from "unexpected-reaction";
import sinon from "sinon";
import { getClassName, PropStruct } from "../../utils/testUtils";
import { mapHref } from "../../actions/navigation";
import Toolbar, {
	Bar,
	toolComponents,
	ToolbarButton as ToolbarInnerButton,
} from "../Toolbar";
import { SubPage, Backdrop, Dialog, withToolbar } from "./SubPage";

const { button: ToolbarButton, separator: ToolbarSeparator } = toolComponents;

const InnerView = ({
	pathname,
	search,
	mapFrom,
	match,
	location,
	routeIsAligned,
	set,
}) => (
	<PropStruct
		{...{ pathname, search, mapFrom, match, location, routeIsAligned, set }}
	/>
);

describe("SubPage", () => {
	let history, dispatch, state, store;
	beforeEach(() => {
		history = createMemoryHistory({ initialEntries: ["/foo/bar"] });
		sinon.spy(history, "push");
		history.push.named("history.push");
		dispatch = sinon.spy().named("dispatch");
		state = Immutable.fromJS({
			navigation: {
				route: {
					match: { path: "/foo/bar", url: "/foo/bar", params: {} },
				},
			},
		});
		store = {
			getState: () => state,
			dispatch: dispatch,
			subscribe: () => {},
		};
	});
	afterAll(() => {
		history.spy.restore();
	});

	it("shows a dialog containing the configured view", () =>
		expect(
			<div>
				<div id="outer" />
				<Provider store={store}>
					<Router history={history}>
						<Route
							path="/foo/bar"
							render={() => (
								<SubPage
									config={{ component: InnerView, set: true }}
									root="/foo"
									path="/foo/bar"
									match={{ path: "/foo/bar", url: "/foo/bar", params: {} }}
									location={{ pathname: "/foo/bar" }}
									history={history}
									dispatch={dispatch}
								/>
							)}
						/>
					</Router>
				</Provider>
			</div>,
			"when mounted",
			"to satisfy",
			<div>
				<div id="outer" />
				<Backdrop />
				<Dialog>
					<Bar>
						<ToolbarButton label={{ icon: "arrow-left" }} />
						<ToolbarSeparator />
					</Bar>
					<InnerView
						set={true}
						mapFrom="/foo"
						match={{
							isExact: true,
							path: "/foo/bar",
							url: "/foo/bar",
							params: {},
						}}
						location={{
							hash: "",
							pathname: "/foo/bar",
							search: "",
						}}
						routeIsAligned={true}
					/>
				</Dialog>
			</div>,
		));

	it("closes when clicking close button", () =>
		expect(
			<div>
				<div id="outer" />
				<Provider store={store}>
					<Router history={history}>
						<Route
							path="/foo/bar"
							render={() => (
								<SubPage
									config={{ component: InnerView, set: true }}
									root="/foo"
									path="/foo/bar"
									match={{ path: "/foo", url: "/foo", params: {} }}
									location={{ pathname: "/foo/bar" }}
									history={history}
									dispatch={dispatch}
								/>
							)}
						/>
					</Router>
				</Provider>
			</div>,
			"when mounted",
			"with event",
			{ type: "click", target: "." + getClassName(<ToolbarInnerButton />) },
		).then(() => {
			expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
			expect(dispatch, "to have calls satisfying", [
				{ args: [mapHref("/foo", "/foo")] },
			]);
		}));

	it("closes when clicking on backdrop", () =>
		expect(
			<div>
				<Provider store={store}>
					<Router history={history}>
						<Route
							path="/foo/bar"
							render={() => (
								<SubPage
									config={{ component: InnerView, set: true }}
									root="/foo"
									path="/foo/bar"
									match={{ params: {} }}
									location={{ pathname: "/foo/bar" }}
									history={history}
									dispatch={dispatch}
								/>
							)}
						/>
					</Router>
				</Provider>
			</div>,
			"when mounted",
			"with event",
			{ type: "click", target: "." + getClassName(<Backdrop />) },
		).then(() => {
			expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
			expect(dispatch, "to have calls satisfying", [
				{ args: [mapHref("/foo", "/foo")] },
			]);
		}));

	it("adds toolbar config to the built-in navigation button", () =>
		expect(
			<div>
				<Provider store={store}>
					<IntlProvider>
						<MemoryRouter>
							<SubPage
								config={{
									component: InnerView,
									set: true,
								}}
								tools={[
									{
										type: "button",
										key: 0,
										label: { text: "Button" },
									},
									{
										type: "input",
										key: 1,
										placeholder: "Text",
									},
									{
										type: "button",
										key: 2,
										label: { text: "Button" },
									},
								]}
								root="/foo"
								path="/foo/bar"
								location={{ pathname: "/foo/bar" }}
								match={{ params: {} }}
							/>
						</MemoryRouter>
					</IntlProvider>
				</Provider>
			</div>,
			"when mounted",
			"to satisfy",
			<div>
				<Backdrop />
				<Dialog>
					<IntlProvider>
						<Toolbar
							tools={[
								{
									type: "button",
									key: "subPage_goBack",
									label: { icon: "arrow-left" },
								},
								{ type: "separator", key: "subpage_sep_nav" },
								{
									type: "button",
									key: 0,
									label: { text: "Button" },
								},
								{
									type: "input",
									key: 1,
									placeholder: "Text",
								},
								{
									type: "button",
									key: 2,
									label: { text: "Button" },
								},
							]}
						/>
					</IntlProvider>
					<Ignore />
				</Dialog>
			</div>,
		));
});

const TestComp = props => <PropStruct {...props} />;

describe("withToolbar", () => {
	let store;
	beforeEach(() => {
		store = {
			getState: () => ({ foo: true, bar: false }),
			dispatch: sinon.spy().named("dispatch"),
			subscribe: () => {},
		};
	});

	it("provides theme to the wrapped view", () =>
		expect(withToolbar, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<ThemeProvider theme={{ test: true, value: "high" }}>
							<EnhComp config={{}} />
						</ThemeProvider>
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestComp
					theme={{ test: true, value: "high" }}
					config="__ignore"
					dispatch="__ignore"
					history="__ignore"
					location="__ignore"
					match="__ignore"
				/>,
			),
		));

	it("provides route info to the wrapped view", () =>
		expect(withToolbar, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<ThemeProvider theme={{}}>
							<EnhComp config={{}} />
						</ThemeProvider>
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestComp
					history={{
						action: "__ignore",
						block: "__ignore",
						canGo: "__ignore",
						createHref: "__ignore",
						entries: "__ignore",
						go: "__ignore",
						goBack: "__ignore",
						goForward: "__ignore",
						index: "__ignore",
						length: "__ignore",
						listen: "__ignore",
						location: "__ignore",
						push: "__ignore",
						replace: "__ignore",
					}}
					location={{ pathname: "/", hash: "", search: "" }}
					match={{ isExact: true, url: "/", path: "/", params: {} }}
					config="__ignore"
					dispatch="__ignore"
					theme="__ignore"
				/>,
			),
		));

	it("calls the tool selector with state to provide a toolbar config", () =>
		expect(withToolbar, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<ThemeProvider theme={{}}>
							<EnhComp
								config={{
									toolStateSelector: state => [
										{ foo: state.foo },
										{ bar: state.bar },
									],
								}}
							/>
						</ThemeProvider>
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<TestComp
					tools={[{ foo: true }, { bar: false }]}
					config="__ignore"
					dispatch="__ignore"
					theme="__ignore"
					history="__ignore"
					location="__ignore"
					match="__ignore"
				/>,
			),
		));

	it("calls the tool function selector to generate functions for toolbar", () =>
		expect(withToolbar, "when called with", [Toolbar])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<MemoryRouter>
							<ThemeProvider theme={{}}>
								<EnhComp
									config={{
										toolFuncSelector: dispatch => ({
											dispatchThing: foo => () => dispatch({ isFoo: foo }),
										}),
										toolStateSelector: (state, funcs) => [
											{
												type: "button",
												key: 0,
												label: { text: "Button" },
												onClick: funcs.dispatchThing(state.foo),
											},
											{
												type: "button",
												key: 2,
												label: { text: "Button" },
												onClick: funcs.dispatchThing(state.bar),
											},
										],
									}}
								/>
							</ThemeProvider>
						</MemoryRouter>
					</Provider>,
					"when mounted",
					"with event",
					{ type: "click", target: "button:last-child" },
					"with event",
					{ type: "click", target: "button:first-child" },
					"to satisfy",
					<Toolbar
						tools={[
							{
								type: "button",
								key: 0,
								label: { text: "Button" },
							},
							{
								type: "button",
								key: 2,
								label: { text: "Button" },
							},
						]}
					/>,
				),
			)
			.then(() =>
				expect(store.dispatch, "to have a call satisfying", {
					args: [{ isFoo: true }],
				}).and("to have a call satisfying", {
					args: [{ isFoo: false }],
				}),
			));
});
