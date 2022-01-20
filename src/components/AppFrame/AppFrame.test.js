import React from "react";
import Immutable from "immutable";
import { ThemeProvider } from "styled-components";
import { RSAA } from "redux-api-middleware";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import { mount, simulate } from "unexpected-reaction";
import { mount as enzymeMount } from "enzyme";
import { getStyledClassSelector } from "../../utils/testUtils";
import I18n from "../I18n";
import {
	GET_APPLICATIONS_REQUEST,
	GET_APPLICATIONS_SUCCESS,
	GET_APPLICATIONS_FAILURE,
} from "../../actions/applications";
import { ScopeBar, Bar as BarWrapper } from "../Scope";
import AppFrame, { Base, ViewPort } from "./AppFrame";
import ApplicationSelector from "./ApplicationSelector";
import { Wrapper as MenuWrapper } from "../DropMenu";
import { Wrapper, AppBox, AppLabel, AppLogo } from "./Topbar";
import { Bar as SideBar, MenuToggle, Logo } from "./Sidebar";
import { BlockWithA } from "./MenuItem";
import { HelpLink } from "./Help";
import { About } from "./About";
import {
	GET_VERSION_INFO_FAILURE,
	GET_VERSION_INFO_REQUEST,
	GET_VERSION_INFO_SUCCESS,
} from "../../actions/versionInfo";
import LoadingScreen from "../MaterialUI/Feedback/loadingScreen";
import ActionModal from "../MaterialUI/DataDisplay/PredefinedElements/ActionModal";
import sharedMessages from "../../sharedMessages";
import Button from "@material-ui/core/Button";

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
	let props, state, store, modalRoot, locationReloadSpy;

	const { location } = window;

	beforeAll(() => {
		locationReloadSpy = sinon.spy().named("locationReloads");

		delete window.location;

		window.location = {
			reload: locationReloadSpy,
		};
	});

	afterAll(() => {
		window.location = location;
	});

	beforeEach(() => {
		global.DEPENDENCIES = {
			"orc-shared": "0.9.0",
		};
		props = {
			applicationId: "Orders",
			modules: [],
			activeModules: { foo: true },
			menuLabel: "TestLabel",
			helpMessages: {
				help: { id: "msg.help", defaultMessage: "Help" },
			},
			menuMessages: {
				sign_out: { id: "msg.signout", defaultMessage: "Sign out" },
				preferences: { id: "msg.prefs", defaultMessage: "Preferences" },
				about: { id: "msg.about", defaultMessage: "About" },
			},
			aboutMessages: {
				ccName: {
					id: "msg.ccName",
					defaultMessage: "Orckestra Commerce Cloud",
				},
				ccVersion: {
					id: "msg.ccVersion",
					defaultMessage: "Commerce Cloud {version}",
				},
				sharedVersion: {
					id: "msg.sharedVersion",
					defaultMessage: "shared",
				},
				scriptsVersion: {
					id: "msg.scriptsVersion",
					defaultMessage: "scripts",
				},
				secretVersion: {
					id: "msg.secretVersion",
					defaultMessage: "secret",
				},
				copyrightTermsNotice: {
					id: "msg.copyrightTermsNotice",
					defaultMessage:
						"This computer program is protected by copyright laws and international treaties. Unauthorized reproduction or redistribution of this program, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law. Orckestra is a trademark of Orckestra Technologies Inc. All other trademarks are property of the respective owners.",
				},
				copyright: {
					id: "msg.copyright",
					defaultMessage: "© 2019 Orckestra Technologies Inc.",
				},
				allRightsReserved: {
					id: "msg.allRightsReserved",
					defaultMessage: "All rights reserved.",
				},
			},
			prefMessages: {
				preferences: { id: "msg.preferences", defaultMessage: "Preferences" },
				save: { id: "msg.save", defaultMessage: "Save" },
				cancel: { id: "msg.cancel", defaultMessage: "Cancel" },
				language: { id: "msg.language", defaultMessage: "Display language" },
				defaultApp: {
					id: "msg.defaultApp",
					defaultMessage: "Default application",
				},
			},
			scopeFilterPlaceholder: { id: "scope.filter", defaultMessage: "Filter" },
		};
		state = Immutable.fromJS({
			applications: {
				list: [
					{
						id: "3",
						name: "Orders",
						isVisible: true,
						isAbsoluteUrl: true,
						url: "https://orc-env18-oco.develop.orckestra.cloud/oms",
						iconUri: "https://orc-env18-oco.develop.orckestra.cloud/oms/icon.png",
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
				config: {
					prependHref: "/test1/",
				},
			},
			locale: {
				locale: "en-US",
				supportedLocales: [],
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
					name: { "en-CA": "Test 1", "en-US": "Test 1" },
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
					name: { "en-CA": "Test 3", "en-US": "Test 3" },
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
			modules: {
				tree: "modulesTree",
				visibleModules: ["a", "module123", "test1", "test2", "test3"],
				lastScopeAndModuleSelection: {
					scope: "Norway",
					moduleName: "Profiles",
					routingPerformed: false,
				},
			},
			settings: { defaultScope: "myScope", defaultApp: "12" },
			versionInfo: { version: "4.2", defaultHelpUrl: "help_url", moduleHelpUrls: [] },
			view: { scopeSelector: { filter: "1" }, __prefsDialog: { show: false } },
			toasts: { queue: [] },
			requests: {
				actives: Immutable.Map(),
				logout: false,
				error: null,
			},
		});
		store = {
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
			getState: () => state,
		};
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	it("renders a viewport with scope selector, top bar and sidebar", () => {
		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [<TestComp1 key="1" />, <TestComp2 key="2" />, <TestComp3 key="3" />];
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Foo/bar"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<AppFrame {...props} />
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<Base>
							<Wrapper>
								<AppBox>
									<ApplicationSelector {...props} />
									<AppLabel>
										<AppLogo />
										Marketing Legacy
									</AppLabel>
								</AppBox>
								<MenuWrapper>
									<Ignore />
								</MenuWrapper>
								<HelpLink>Help</HelpLink>
							</Wrapper>
							<SideBar>
								<MenuToggle />
								<Ignore />
								<Ignore />
								<Ignore />
								<Logo />
							</SideBar>
							<ViewPort>
								<ScopeBar name="Test 1" />
								<TestComp1 key="1" />
								<TestComp2 key="2" />
								<TestComp3 key="3" />
							</ViewPort>
							<About messages={props.aboutMessages} />
							<LoadingScreen />
						</Base>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		);

		expect(document.title, "to equal", "Marketing Legacy");
	});

	it("renders a viewport with scope selector, top bar and sidebar TODOJOC", () => {
		props.modules = null;
		props.children = [<TestComp1 key="1" />, <TestComp2 key="2" />, <TestComp3 key="3" />];
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Foo/bar"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<AppFrame {...props} />
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<Base>
							<Wrapper>
								<AppBox>
									<ApplicationSelector {...props} />
									<AppLabel>
										<AppLogo />
										Marketing Legacy
									</AppLabel>
								</AppBox>
								<MenuWrapper>
									<Ignore />
								</MenuWrapper>
								<HelpLink>Help</HelpLink>
							</Wrapper>
							<SideBar>
								<MenuToggle />
								<Logo />
							</SideBar>
							<ViewPort>
								<ScopeBar name="Test 1" />
								<TestComp1 key="1" />
								<TestComp2 key="2" />
								<TestComp3 key="3" />
							</ViewPort>
							<About messages={props.aboutMessages} />
							<LoadingScreen />
						</Base>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		);

		expect(document.title, "to equal", "Marketing Legacy");
	});

	it("renders a viewport with scope selector, top bar and sidebar when no current application", () => {
		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [<TestComp1 key="1" />, <TestComp2 key="2" />, <TestComp3 key="3" />];
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Foo/bar"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<AppFrame {...props} applicationId="other" />
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<Base>
							<Wrapper>
								<AppBox>
									<ApplicationSelector {...props} />
									<AppLabel>
										<AppLogo />
									</AppLabel>
								</AppBox>
								<MenuWrapper>
									<Ignore />
								</MenuWrapper>
								<HelpLink>Help</HelpLink>
							</Wrapper>
							<SideBar>
								<MenuToggle />
								<Ignore />
								<Ignore />
								<Ignore />
								<Logo />
							</SideBar>
							<ViewPort>
								<ScopeBar name="Test 1" />
								<TestComp1 key="1" />
								<TestComp2 key="2" />
								<TestComp3 key="3" />
							</ViewPort>
							<About messages={props.aboutMessages} />
							<LoadingScreen />
						</Base>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		);

		expect(document.title, "to equal", "other");
	});

	it("renders a viewport with scope selector, top bar and sidebar when no applications at all", () => {
		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [<TestComp1 key="1" />, <TestComp2 key="2" />, <TestComp3 key="3" />];
		state = state.setIn(["applications", "list"], Immutable.fromJS([]));
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Foo/bar"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<AppFrame {...props} applicationId="other" />
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<Base>
							<Wrapper>
								<AppBox>
									<ApplicationSelector {...props} />
									<AppLabel>
										<AppLogo />
									</AppLabel>
								</AppBox>
								<MenuWrapper>
									<Ignore />
								</MenuWrapper>
								<HelpLink>Help</HelpLink>
							</Wrapper>
							<SideBar>
								<MenuToggle />
								<Ignore />
								<Ignore />
								<Ignore />
								<Logo />
							</SideBar>
							<ViewPort>
								<ScopeBar name="Test 1" />
								<TestComp1 key="1" />
								<TestComp2 key="2" />
								<TestComp3 key="3" />
							</ViewPort>
							<About messages={props.aboutMessages} />
							<LoadingScreen />
						</Base>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		);

		expect(document.title, "to equal", "other");
	});

	it("renders a viewport without scope selector", () => {
		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [<TestComp1 key="1" />, <TestComp2 key="2" />, <TestComp3 key="3" />];
		return expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Foo/bar"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<AppFrame noScope {...props} />
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<Base>
							<Wrapper>
								<AppBox>
									<ApplicationSelector {...props} />
									<AppLabel>
										<AppLogo />
										Marketing Legacy
									</AppLabel>
								</AppBox>
								<MenuWrapper>
									<Ignore />
								</MenuWrapper>
								<HelpLink>Help</HelpLink>
							</Wrapper>
							<SideBar>
								<MenuToggle />
								<Ignore />
								<Ignore />
								<Ignore />
								<Logo />
							</SideBar>
							<ViewPort>
								<BarWrapper />
								<TestComp1 />
								<TestComp2 />
								<TestComp3 />
							</ViewPort>
							<LoadingScreen />
						</Base>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		);
	});

	it("renders a viewport with cursor pointer event disabled", () => {
		state = state.setIn(["view", "__prefsDialog", "show"], true);
		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [<TestComp1 key="1" />, <TestComp2 key="2" />, <TestComp3 key="3" />];
		return expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Foo/bar"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<AppFrame {...props} />
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<Base preferencesOpen={true}>
							<Ignore />
							<Ignore />
							<Ignore />
							<Ignore />
						</Base>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		);
	});

	it("provides open flag, toggle and reset functions", () => {
		const element = mount(
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<I18n>
							<AppFrame {...props} />
						</I18n>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
		);
		simulate(element, {
			type: "click",
			target: getStyledClassSelector(BlockWithA),
		});
		expect(
			element,
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<Base>
						<Wrapper>
							<Ignore />
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
						<LoadingScreen />
					</Base>
				</ThemeProvider>
			</Provider>,
		);
		simulate(element, {
			type: "click",
			target: getStyledClassSelector(Wrapper),
		});
		expect(
			element,
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<Base>
						<Wrapper>
							<Ignore />
							<Ignore />
							<Ignore />
						</Wrapper>
						<SideBar>
							<MenuToggle />
							<Logo />
						</SideBar>
						<ViewPort>
							<Ignore />
						</ViewPort>
						<LoadingScreen />
					</Base>
				</ThemeProvider>
			</Provider>,
		);
		simulate(element, {
			type: "click",
			target: getStyledClassSelector(BlockWithA),
		});
		expect(
			element,
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<Base>
						<Wrapper>
							<Ignore />
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
						<LoadingScreen />
					</Base>
				</ThemeProvider>
			</Provider>,
		);
		simulate(element, {
			type: "click",
			target: getStyledClassSelector(ViewPort),
		});
		expect(
			element,
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<Base>
						<Wrapper>
							<Ignore />
							<Ignore />
							<Ignore />
						</Wrapper>
						<SideBar>
							<MenuToggle />
							<Logo />
						</SideBar>
						<ViewPort>
							<Ignore />
						</ViewPort>
						<LoadingScreen />
					</Base>
				</ThemeProvider>
			</Provider>,
		);
	});

	it("loads applications if not found", () => {
		state = state.setIn(["applications", "list"], Immutable.List());
		return expect(
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<I18n>
							<AppFrame {...props} />
						</I18n>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to be truthy",
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{
					args: [
						{
							[RSAA]: {
								types: [GET_APPLICATIONS_REQUEST, GET_APPLICATIONS_SUCCESS, GET_APPLICATIONS_FAILURE],
								endpoint: "URL",
								method: "GET",
							},
						},
					],
				},
			]),
		);
	});

	it("loads version info if no help url yet", () => {
		state = state.setIn(["versionInfo", "defaultHelpUrl"], null);
		return expect(
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<MemoryRouter initialEntries={["/Foo/bar"]}>
						<I18n>
							<AppFrame {...props} />
						</I18n>
					</MemoryRouter>
				</ThemeProvider>
			</Provider>,
			"when mounted",
			"to be truthy",
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{
					args: [
						{
							[RSAA]: {
								types: [GET_VERSION_INFO_REQUEST, GET_VERSION_INFO_SUCCESS, GET_VERSION_INFO_FAILURE],
								endpoint: "URL",
								method: "GET",
							},
						},
					],
				},
			]),
		);
	});

	it("Display dialog to refresh the application when login is needed ", () => {
		state = state.setIn(["requests", "logout"], true);

		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [<TestComp1 key="1" />, <TestComp2 key="2" />, <TestComp3 key="3" />];

		const title = sharedMessages.error.defaultMessage;
		const message = sharedMessages.needToRefresh.defaultMessage;

		const refreshCallback = jest.fn();

		const actions = [{ label: sharedMessages.refresh, handler: refreshCallback, isPrimary: true }];

		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Foo/bar"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<AppFrame {...props} />
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider store={store}>
				<ThemeProvider theme={{}}>
					<I18n>
						<MemoryRouter initialEntries={["/Foo/bar"]}>
							<Base>
								<ActionModal open={true} title={title} message={message} actions={actions} />
								<Wrapper>
									<AppBox>
										<ApplicationSelector {...props} />
										<AppLabel>
											<AppLogo />
											Marketing Legacy
										</AppLabel>
									</AppBox>
									<MenuWrapper>
										<Ignore />
									</MenuWrapper>
									<HelpLink>Help</HelpLink>
								</Wrapper>
								<SideBar>
									<MenuToggle />
									<Ignore />
									<Ignore />
									<Ignore />
									<Logo />
								</SideBar>
								<ViewPort>
									<ScopeBar name="Test 1" />
									<TestComp1 key="1" />
									<TestComp2 key="2" />
									<TestComp3 key="3" />
								</ViewPort>
								<About messages={props.aboutMessages} />
								<LoadingScreen />
							</Base>
						</MemoryRouter>
					</I18n>
				</ThemeProvider>
			</Provider>,
		);
	});

	it("Invoke page reload when refresh button is clicked", () => {
		state = state.setIn(["requests", "logout"], true);

		props.modules = [
			{ id: "test1", component: TestComp1, route: "/test1" },
			{ id: "test2", component: TestComp2, route: "/test2" },
			{ id: "test3", component: TestComp3, route: "/test3" },
		];
		props.children = [<TestComp1 key="1" />, <TestComp2 key="2" />, <TestComp3 key="3" />];

		const component = (
			<Provider store={store}>
				<MemoryRouter initialEntries={["/Foo/bar"]}>
					<ThemeProvider theme={{}}>
						<I18n>
							<AppFrame {...props} />
						</I18n>
					</ThemeProvider>
				</MemoryRouter>
			</Provider>
		);

		const mountedComponent = enzymeMount(component);

		const actionModal = mountedComponent.find(ActionModal);

		const refreshButton = actionModal.find(Button);

		refreshButton.invoke("onClick")();

		expect(locationReloadSpy, "was called");
	});
});

describe("ViewPort", () => {
	it("does not translate when closed", () =>
		expect(<ViewPort />, "when mounted", "to have style rules satisfying", "to contain", "width: calc(100% - 50px)"));

	it("translates to the side when open", () =>
		expect(
			<ViewPort open />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"width: calc(100% - 200px);",
		));
});

describe("Base", () => {
	it("pointer-events should be to default when preferences is hidden", () =>
		expect(<Base />, "when mounted", "to have style rules satisfying", "not to contain", "pointer-events: none;"));

	it("pointer-events should be none when preferences is shown", () =>
		expect(
			<Base preferencesOpen={true} />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"pointer-events: none;",
		));
});
