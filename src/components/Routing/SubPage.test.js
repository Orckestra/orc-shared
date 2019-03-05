import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import sinon from "sinon";
import Toolbar from "../Toolbar";
import { SubPage, Backdrop, Dialog, withToolbar } from "./SubPage";
import withWaypointing from "./withWaypointing";

const InnerView = () => <div />;
const WrappedView = withWaypointing(InnerView);

describe("SubPage", () => {
	let history;
	beforeEach(() => {
		history = { push: sinon.spy().named("history.push") };
	});

	it("shows overtop its parent", () =>
		expect(
			<SubPage
				config={{ component: InnerView, set: true }}
				root="/foo"
				path="/foo/bar"
				match={{ params: {} }}
				history={history}
			/>,
			"to render as",
			<React.Fragment>
				<Backdrop onClick={expect.it("to be a function").and("called")} />
				<Dialog>
					<Toolbar
						tools={[
							{
								type: "button",
								key: "subPage_goBack",
								label: { icon: "arrow-left" },
								onClick: expect.it("to be a function").and("called"),
							},
							{ type: "separator", key: "subpage_sep_nav" },
						]}
					/>
					<WrappedView set={true} />
				</Dialog>
			</React.Fragment>,
		).then(() =>
			expect(history.push, "to have calls satisfying", [
				{ args: ["/foo"] },
				{ args: ["/foo"] },
			]),
		));

	it("adds toolbar config to the built-in navigation button", () =>
		expect(
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
				match={{ params: {} }}
			/>,
			"when rendered",
			"to contain",
			<Toolbar
				tools={[
					{
						type: "button",
						key: "subPage_goBack",
						label: { icon: "arrow-left" },
						onClick: expect.it("to be a function"),
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
			/>,
		));
});

const TestComp = () => <div />;

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
				"when deeply rendered",
				"to contain",
				<TestComp theme={{ test: true, value: "high" }} />,
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
				"when deeply rendered",
				"to contain",
				<TestComp
					history={expect.it("to be an object")}
					location={{ pathname: "/" }}
					match={{ url: "/", path: "/", params: {} }}
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
				"when deeply rendered",
				"to contain",
				<TestComp tools={[{ foo: true }, { bar: false }]} />,
			),
		));

	it("calls the tool function selector to generate functions to toolbar", () =>
		expect(withToolbar, "when called with", [TestComp])
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
											{ foo: funcs.dispatchThing(state.foo) },
											{ bar: funcs.dispatchThing(state.bar) },
										],
									}}
								/>
							</ThemeProvider>
						</MemoryRouter>
					</Provider>,
					"to deeply render as",
					<TestComp
						tools={[
							{
								foo: expect.it("to be a function").and("called"),
							},
							{
								bar: expect.it("to be a function").and("called"),
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
