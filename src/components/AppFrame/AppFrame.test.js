import React from "react";
import ReactDOM from "react-dom";
import Immutable from "immutable";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import { getClassName, PropStruct } from "../../utils/testUtils";
import I18n from "../I18n";
import { RSAA } from "redux-api-middleware";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import {
	GET_APPLICATIONS_REQUEST,
	GET_APPLICATIONS_SUCCESS,
	GET_APPLICATIONS_FAILURE,
} from "../../actions/applications";
import { Bar as ScopeBar, AlignedButton } from "../Scope";
import FullAppFrame, {
	appFrameWiring,
	Base,
	ViewPort,
	AppFrame,
} from "./AppFrame";
import {
	Wrapper as AppSelWrapper,
	MenuIcon,
} from "./ApplicationSelector/Header";
import { Wrapper as MenuWrapper } from "../DropMenu/DropMenu";
import { Wrapper, AppBox, AppLabel, AppLogo } from "./Topbar";
import { Bar as SideBar, MenuToggle, Logo } from "./Sidebar";
import { BlockWithA } from "./MenuItem";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

const TestComp1 = () => <div id="view1" />;
const TestComp2 = () => <div id="view2" />;
const TestComp3 = () => <div id="view3" />;

describe("AppFrame", () => {
	let props, toggle, reset, state, store, modalRoot;
	beforeEach(() => {
		toggle = sinon.spy().named("toggle");
		reset = sinon.spy().named("reset");
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
			menuMessages: {
				sign_out: { id: "msg.signout" },
				preferences: { id: "msg.prefs" },
				about: { id: "msg.about" },
			},
			aboutMessages: {},
			prefMessages: {},
			scopeFilterPlaceholder: { id: "scope.filter", defaultMessage: "Filter" },
			toggle,
			reset,
		};
		state = Immutable.fromJS({
			applications: { list: [] },
			locale: { cultures: [] },
			navigation: { route: { match: {} } },
			scopes: {},
			settings: { defaultApp: 0 },
			toasts: { queue: [] },
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
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
			<Provider store={store}>
				<MemoryRouter>
					<I18n>
						<AppFrame {...props} {...{ toggle, reset }} />
					</I18n>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Base>
					<Wrapper>
						<AppBox>
							<AppSelWrapper>
								<MenuIcon />
							</AppSelWrapper>
							<AppLabel>
								<AppLogo />
							</AppLabel>
						</AppBox>
						<MenuWrapper>
							<Ignore />
						</MenuWrapper>
					</Wrapper>
					<SideBar>
						<MenuToggle />
						<Ignore />
						<Ignore />
						<Ignore />
						<Logo />
					</SideBar>
					<ViewPort>
						<ScopeBar>
							<AlignedButton></AlignedButton>
						</ScopeBar>
						<TestComp1 key="1" />
						<TestComp2 key="2" />
						<TestComp3 key="3" />
					</ViewPort>
				</Base>
			</MemoryRouter>,
		);
	});

	it("propagates open flag, toggle and reset functions", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<I18n>
						<AppFrame open {...props} />
					</I18n>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: "." + getClassName(<Wrapper />) },
			"with event",
			{ type: "click", target: "." + getClassName(<BlockWithA />) },
			"with event",
			{ type: "click", target: "." + getClassName(<ViewPort />) },
			"to satisfy",
			<Base>
				<Wrapper>
					<Ignore />
					<Ignore />
				</Wrapper>
				<SideBar open>
					<MenuToggle open />
					<Logo />
				</SideBar>
				<ViewPort open>
					<Ignore />
				</ViewPort>
			</Base>,
			/* <Topbar onClick={expect.it("to be", props.reset)} />
				<Sidebar open toggle={expect.it("to be", props.toggle)} />
				<ViewPort open onClick={expect.it("to be", props.reset)} /> */
		).then(() =>
			expect([reset, toggle], "to have calls satisfying", [
				{ spy: reset },
				{ spy: toggle },
				{ spy: reset },
			]),
		));

	describe("with state handling", () => {
		let store, state, appRoot;
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
			appRoot = document.createElement("div");
			appRoot.id = "app";
			document.body.appendChild(appRoot);
		});
		afterEach(() => {
			try {
				ReactDOM.unmountComponentAtNode(appRoot);
			} catch (_) {}
			document.body.removeChild(appRoot);
		});

		it("adds toggleable and resettable open flag", () => {
			const WiredAppFrame = appFrameWiring(PropStruct);
			return expect(
				<Provider store={store}>
					<MemoryRouter>
						<I18n>
							<WiredAppFrame {...props} />
						</I18n>
					</MemoryRouter>
				</Provider>,
				"to satisfy",
				<Provider store={store}>
					<MemoryRouter>
						<I18n>
							<PropStruct
								open={false}
								toggle={expect.it("to be a function")}
								reset={expect.it("to be a function")}
								activeModules={["foo"]}
								applicationId={3}
								applications={[
									{
										id: 3,
										name: "Orders",
										isVisible: true,
										isAbsoluteUrl: true,
										url: "https://orc-env18-oco.develop.orckestra.cloud/oms",
										iconUri:
											"https://orc-env18-oco.develop.orckestra.cloud/oms/icon.png",
										displayName: "Marketing Legacy",
									},
								]}
								dispatch={() => {}}
								loadApplications={() => {}}
								location={{ pathname: "/Foo/bar" }}
								modules={[]}
								menuLabel="TestLabel"
								menuMessages={{
									sign_out: { id: "msg.signout" },
									preferences: { id: "msg.prefs" },
									about: { id: "msg.about" },
								}}
								aboutMessages={{}}
								prefMessages={{}}
								scopeFilterPlaceholder={{
									id: "scope.filter",
									defaultMessage: "Filter",
								}}
							/>
						</I18n>
					</MemoryRouter>
				</Provider>,
			);
		});

		it("loads applications if not found", () => {
			state = state.setIn(["applications", "list"], Immutable.List());
			return expect(
				<Provider store={store}>
					<MemoryRouter>
						<I18n>
							<FullAppFrame {...props} />
						</I18n>
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to be ok",
			).then(() =>
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
			expect(<Base />, "when mounted", "to be ok").then(() =>
				expect(
					"html",
					"as a selector to have style rules",
					"to match",
					/html\s*\{\s*height: 100%;\s*\}/,
				),
			));

		it("ensures required body styling", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when mounted", "to be ok").then(() =>
				expect(
					"body",
					"as a selector to have style rules",
					"to match",
					/body\s*\{\s*height: 100%;\s*margin: 0;\s*overflow: hidden;\s*\}/,
				),
			));

		it("ensures required viewport styling", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when mounted", "to be ok").then(() =>
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
			"when mounted",
			"to have style rules satisfying",
			"not to contain",
			"translateX",
		));

	it("translates to the side when open", () =>
		expect(
			<ViewPort open />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"transform: translateX(150px);",
		));
});
