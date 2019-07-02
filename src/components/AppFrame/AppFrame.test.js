import React from "react";
import ReactDOM from "react-dom";
import Immutable from "immutable";
import sinon from "sinon";
import I18n from "../I18n";
import { RSAA } from "redux-api-middleware";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {
	GET_APPLICATIONS_REQUEST,
	GET_APPLICATIONS_SUCCESS,
	GET_APPLICATIONS_FAILURE,
} from "../../actions/applications";
import Scope from "../Scope";
import FullAppFrame, { Base, ViewPort, AppFrame } from "./index";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import ConnectedToastList from "./ConnectedToastList";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

class ClassAppFrame extends React.Component {
	render() {
		const { store, ...props } = this.props;
		return (
			<Provider store={store}>
				<BrowserRouter>
					<I18n>
						<FullAppFrame {...props} />
					</I18n>
				</BrowserRouter>
			</Provider>
		);
	}
}

const TestComp1 = () => <div />;
const TestComp2 = () => <div />;
const TestComp3 = () => <div />;

describe("AppFrame", () => {
	let props, toggle, reset;
	beforeEach(() => {
		props = {
			applications: [
				{
					id: 3,
					name: "Orders",
					isVisible: true,
					isAbsoluteUrl: true,
					url: "https://orc-env18-oco.develop.orckestra.cloud/oms",
					iconUri: "https://orc-env18-oco.develop.orckestra.cloud/oms/icon.png",
					displayName: "Marketing Legacy",
				},
			],
			applicationId: 3,
			modules: [],
			activeModules: ["foo"],
			menuLabel: "TestLabel",
			location: { pathname: "/Foo/bar" },
			linkHOC: x => x,
			menuMessages: {
				sign_out: { id: "msg.signout" },
				preferences: { id: "msg.prefs" },
				about: { id: "msg.about" },
			},
			aboutMessages: {},
			prefMessages: {},
			scopeFilterPlaceholder: { id: "scope.filter", defaultMessage: "Filter" },
		};

		toggle = () => {};
		reset = () => {};
	});

	it("renders a viewport, top bar and sidebar", () => {
		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [
			<TestComp1 key="1" />,
			<TestComp2 key="2" />,
			<TestComp3 key="3" />,
		];
		return expect(
			<AppFrame {...props} {...{ toggle, reset }} />,
			"to render as",
			<Base>
				<ConnectedToastList />
				<Topbar
					linkHOC={props.linkHOC}
					applications={props.applications}
					applicationId={props.applicationId}
					menuLabel={props.menuLabel}
					menuMessages={props.menuMessages}
				/>
				<Sidebar
					linkHOC={props.linkHOC}
					modules={props.modules}
					activeModules={["foo"]}
					path="/Foo/bar"
				/>
				<ViewPort>
					<Scope>
						<TestComp1 key="1" />
						<TestComp2 key="2" />
						<TestComp3 key="3" />
					</Scope>
				</ViewPort>
			</Base>,
		);
	});

	it("propagates open flag, toggle and reset functions", () =>
		expect(
			<AppFrame open {...props} />,
			"to render as",
			<Base>
				<Topbar onClick={expect.it("to be", props.reset)} />
				<Sidebar open toggle={expect.it("to be", props.toggle)} />
				<ViewPort open onClick={expect.it("to be", props.reset)} />
			</Base>,
		));

	describe("with state handling", () => {
		let store, state, outerProps, innerProps, appRoot, modalRoot;
		beforeEach(() => {
			state = Immutable.fromJS({
				applications: {
					list: [
						{
							id: 3,
							name: "Orders",
							isVisible: true,
							isAbsoluteUrl: true,
							url: "https://orc-env18-oco.develop.orckestra.cloud/oms",
							iconUri:
								"https://orc-env18-oco.develop.orckestra.cloud/oms/icon.png",
							displayName: {
								"en-CA": "Marketing Legacy",
								"en-US": "Marketing Legacy",
								"fr-CA": "Marketing Legacy",
								"fr-FR": "Marketing Legacy",
								"it-IT": "Marketing Legacy",
							},
						},
					],
				},
				authentication: {
					name: "foo@bar.com",
				},
				navigation: {
					route: {
						match: {
							url: "/test1/test",
							path: "/:scope/test",
							params: { scope: "test1" },
						},
					},
				},
				locale: {
					suportedLocales: [],
					cultures: {
						"en-US": {
							cultureIso: "en-US",
							cultureName: "English - United States",
							sortOrder: 0,
							isDefault: true,
						},
					},
					defaultCulture: "fr-FR",
				},
				scopes: {
					test1: {
						id: "test1",
						name: { "en-CA": "Test 1" },
						foo: false,
						bar: false,
					},
					test2: {
						id: "test2",
						name: { "en-US": "Test 2" },
						foo: false,
						bar: true,
					},
					test3: {
						id: "test3",
						name: { "en-CA": "Test 3" },
						foo: true,
						bar: false,
					},
					test4: {
						id: "test4",
						name: { "en-US": "Test 4" },
						foo: true,
						bar: true,
					},
				},
				settings: { defaultApp: 12 },
				view: { scopeSelector: { filter: "1" } },
				toasts: { queue: [] },
			});
			store = {
				subscribe: () => {},
				dispatch: sinon.spy().named("dispatch"),
				getState: () => state,
			};
			innerProps = props;
			outerProps = { store, ...props };
			appRoot = document.createElement("div");
			appRoot.id = "app";
			document.body.appendChild(appRoot);
			modalRoot = document.createElement("div");
			modalRoot.id = "modal";
			document.body.appendChild(modalRoot);
		});
		afterEach(() => {
			try {
				ReactDOM.unmountComponentAtNode(appRoot);
			} catch (_) {}
			document.body.removeChild(appRoot);
			document.body.removeChild(modalRoot);
		});

		it("adds toggleable and resettable open flag", () => {
			const render = ReactDOM.render(
				<ClassAppFrame {...outerProps} />,
				appRoot,
			);
			return expect(
				render,
				"to have rendered",
				<AppFrame
					{...innerProps}
					open={false}
					toggle={expect.it("to be a function")}
					reset={expect.it("to be a function")}
				/>,
			);
		});

		it("loads applications if not found", () => {
			state = state.setIn(["applications", "list"], Immutable.List());
			const render = ReactDOM.render(
				<ClassAppFrame {...outerProps} />,
				appRoot,
			);
			return expect(render, "to have rendered", <AppFrame />).then(() =>
				expect(store.dispatch, "to have calls satisfying", [
					{
						args: [
							{
								[RSAA]: {
									types: [
										GET_APPLICATIONS_REQUEST,
										GET_APPLICATIONS_SUCCESS,
										GET_APPLICATIONS_FAILURE,
									],
									endpoint: "URL",
									method: "GET",
								},
							},
						],
					},
				]),
			);
		});
	});

	describe("global styles", () => {
		it("ensures required styling on html element to make IE11 happy", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"html",
					"as a selector to have style rules",
					"to match",
					/html\s*\{\s*height: 100%;\s*\}/,
				),
			));

		it("ensures required body styling", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"body",
					"as a selector to have style rules",
					"to match",
					/body\s*\{\s*height: 100%;\s*margin: 0;\s*overflow: hidden;\s*\}/,
				),
			));

		it("ensures required viewport styling", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"#app",
					"as a selector to have style rules",
					"to match",
					/#app\s*\{\s*height: 100%;\s*\}/,
				),
			));
	});
});

describe("ViewPort", () => {
	it("does not translate when closed", () =>
		expect(
			<ViewPort />,
			"to render style rules",
			"not to contain",
			"translateX",
		));

	it("translates to the side when open", () =>
		expect(
			<ViewPort open />,
			"to render style rules",
			"to contain",
			"transform: translateX(150px);",
		));
});
