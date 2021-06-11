import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import Immutable from "immutable";
import sinon from "sinon";
import { getStyledClassSelector, PropStruct } from "../../utils/testUtils";
import { mapHref } from "../../actions/navigation";
import { Bar, toolComponents } from "../Toolbar";
import SubPage, { Backdrop, Dialog } from "./SubPage";

const { button: ToolbarButton, separator: ToolbarSeparator } = toolComponents;

const InnerView = ({ theme, pathname, search, mapFrom, match, location, routeIsAligned, set }) => (
	<PropStruct
		{...{
			theme,
			pathname,
			search,
			mapFrom,
			match,
			location,
			routeIsAligned,
			set,
		}}
	/>
);

describe("SubPage", () => {
	let history, dispatch, state, store, theme;
	beforeEach(() => {
		history = createMemoryHistory({ initialEntries: ["/foo/bar"] });
		sinon.spy(history, "push");
		history.push.named("history.push");
		dispatch = sinon.spy().named("dispatch");
		theme = { test: true, value: "high", icons: { backArrow: "arrow-left" } };
		state = Immutable.fromJS({
			navigation: {
				route: {
					match: { path: "/foo/bar", url: "/foo/bar", params: {} },
				},
			},
			requests: {
				logout: false,
			},
			foo: true,
			bar: false,
		});
		store = {
			getState: () => state,
			dispatch: dispatch,
			subscribe: () => {},
		};
	});
	afterAll(() => {
		history.push.restore();
	});

	it("shows a dialog containing the configured view", () =>
		expect(
			<div>
				<div id="outer" />
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<Router history={history}>
							<Route
								path="/foo/bar"
								render={route => (
									<SubPage config={{ component: InnerView, set: true }} root="/foo" path="/foo/bar" {...route} />
								)}
							/>
						</Router>
					</ThemeProvider>
				</Provider>
			</div>,
			"when mounted",
			"to satisfy",
			<div>
				<div id="outer" />
				<Backdrop />
				<Dialog>
					<Bar>
						<ToolbarButton id="subPage_goBack" label={{ icon: "arrow-left" }} />
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
					/>
				</Dialog>
			</div>,
		));

	it("closes when clicking close button", () =>
		expect(
			<div>
				<div id="outer" />
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<Router history={history}>
							<Route
								path="/foo/bar"
								render={route => (
									<SubPage config={{ component: InnerView, set: true }} root="/foo" path="/foo/bar" {...route} />
								)}
							/>
						</Router>
					</ThemeProvider>
				</Provider>
			</div>,
			"when mounted",
			"with event",
			{ type: "click", target: "#subPage_goBack" },
		).then(() => {
			expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
			expect(dispatch, "to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
		}));

	it("closes when clicking on backdrop", () =>
		expect(
			<div>
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<Router history={history}>
							<Route
								path="/foo/bar"
								render={route => (
									<SubPage config={{ component: InnerView, set: true }} root="/foo" path="/foo/bar" {...route} />
								)}
							/>
						</Router>
					</ThemeProvider>
				</Provider>
			</div>,
			"when mounted",
			"with event",
			{ type: "click", target: getStyledClassSelector(Backdrop) },
		).then(() => {
			expect(history.push, "to have calls satisfying", [{ args: ["/foo"] }]);
			expect(dispatch, "to have calls satisfying", [{ args: [mapHref("/foo", "/foo")] }]);
		}));

	it("calls the tool selector with state to provide a toolbar config", () =>
		expect(
			<Provider store={store}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Route
							path="/foo/bar"
							render={route => (
								<SubPage
									config={{
										component: InnerView,
										set: true,
										toolStateSelector: state => [
											{
												type: "button",
												id: "firstButton",
												key: 1,
												label: { text: "Button1" },
												onClick: () => {},
											},
											{
												type: "button",
												id: "secondButton",
												key: 2,
												label: { text: "Button2" },
												onClick: () => {},
											},
										],
									}}
									root="/foo"
									path="/foo/bar"
									{...route}
								/>
							)}
						/>
					</ThemeProvider>
				</Router>
			</Provider>,
			"when mounted",
			"queried for first",
			getStyledClassSelector(Bar),
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Bar>
					<ToolbarButton id="subPage_goBack" label={{ icon: "arrow-left" }} />
					<ToolbarSeparator />
					<ToolbarButton id="firstButton" label={{ text: "Button1" }} />
					<ToolbarButton id="secondButton" label={{ text: "Button2" }} />
				</Bar>
			</Provider>,
		));

	it("calls the tool function selector to generate functions for toolbar", () =>
		expect(
			<Provider store={store}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<div>
							<Route
								path="/foo/bar"
								render={route => (
									<SubPage
										config={{
											component: InnerView,
											set: true,
											toolFuncSelector: dispatch => ({
												dispatchThing: foo => () => dispatch({ isFoo: foo }),
											}),
											toolStateSelector: (state, funcs) => [
												{
													type: "button",
													id: "firstButton",
													key: 1,
													label: { text: "Button1" },
													onClick: funcs.dispatchThing(state.get("foo")),
												},
												{
													type: "button",
													id: "secondButton",
													key: 2,
													label: { text: "Button2" },
													onClick: funcs.dispatchThing(state.get("bar")),
												},
											],
										}}
										root="/foo"
										path="/foo/bar"
										{...route}
									/>
								)}
							/>
						</div>
					</ThemeProvider>
				</Router>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: "#firstButton" },
			"with event",
			{ type: "click", target: "#secondButton" },
			"queried for first",
			getStyledClassSelector(Bar),
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Bar>
					<ToolbarButton id="subPage_goBack" label={{ icon: "arrow-left" }} />
					<ToolbarSeparator />
					<ToolbarButton id="firstButton" label={{ text: "Button1" }} />
					<ToolbarButton id="secondButton" label={{ text: "Button2" }} />
				</Bar>
			</Provider>,
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [{ args: [{ isFoo: true }] }, { args: [{ isFoo: false }] }]),
		));
});
