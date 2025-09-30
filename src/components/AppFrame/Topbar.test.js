import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import { Provider } from "react-redux";
import { RSAA } from "redux-api-middleware";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import { VIEW_STATE_SET_FIELD } from "../../actions/view";
import { SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE } from "../../actions/authentication";
import { PREFS_NAME } from "./Preferences";
import { ABOUT_NAME } from "./About";
import ApplicationSelector from "./ApplicationSelector";
import Topbar, { CurrentApp, getAppEnvironmentInfo, sanitizeEnvironmentCode, useMenuProps } from "./Topbar";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

describe("Topbar", () => {
	let state, store, applications, props, clicker, menuMessages, helpMessages, modalRoot;
	beforeEach(() => {
		state = Immutable.fromJS({ authentication: { name: "foo@bar.com" } });
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
		applications = [
			{
				name: "current",
				displayName: "Test label",
				iconUri: "/test/url",
			},
			{
				name: "other",
				displayName: "Test again",
				iconUri: "/test/elsewhere",
			},
		];
		clicker = () => {};
		menuMessages = {
			sign_out: { id: "msg.signout", defaultMessage: "Sign out" },
			preferences: { id: "msg.prefs", defaultMessage: "Preferences" },
			about: { id: "msg.about", defaultMessage: "About" },
		};
		helpMessages = {
			help: { id: "msg.help", defaultMessage: "Help" },
		};
		props = {
			onClick: clicker,
			menuMessages,
			helpMessages,
			applications,
			currentApplication: applications[0],
			applicationId: "current",
			helpUrl: "an_help_url.com",
		};
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	it("renders a top bar of an app", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Topbar {...props} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div onClick={clicker}>
				<div>
					<ApplicationSelector {...props} />
					<div>
						<img src="/test/url" />
						Test label — localdev
					</div>
				</div>
				<Ignore />
				<a>Help</a>
			</div>,
		));

	it("doesn't break if no current app", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Topbar {...props} currentApplication={{}} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div onClick={clicker}>
				<div>
					<Ignore />
					<div>
						<img />
						{" — localdev"}
					</div>
				</div>
				<Ignore />
				<a>Help</a>
			</div>,
		));

	it("doesn't break if no apps at all", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Topbar {...props} currentApplication={undefined} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div onClick={clicker}>
				<div>
					<Ignore />
					<div>
						<img />
						{" — localdev"}
					</div>
				</div>
				<Ignore />
				<a>Help</a>
			</div>,
		));
});

describe("useMenuProps", () => {
	const TestComp = ({ id, menuItems }) => (
		<div id={id}>
			{menuItems.map(({ id, handler, icon, label }) => (
				<button key={label} onClick={handler} id={id}>
					{icon} - {label}
				</button>
			))}
		</div>
	);
	const EnhComp = ({ messages }) => <TestComp {...useMenuProps(messages)} />;

	let state, store, messages;
	beforeEach(() => {
		state = Immutable.fromJS({ authentication: { name: "foo@bar.com" } });
		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
		messages = {
			sign_out: { id: "msg.signout", defaultMessage: "Sign out" },
			preferences: { id: "msg.prefs", defaultMessage: "Preferences" },
			about: { id: "msg.about", defaultMessage: "About" },
		};
	});

	it("sets a menu configuration on the wrapped component", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<EnhComp messages={messages} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: "#userMenuSignOut" },
			"with event",
			{ type: "click", target: "#userMenuPrefsMenu" },
			"with event",
			{ type: "click", target: "#userMenuAbout" },
			"to satisfy",
			<TestComp
				id="userMenu"
				menuLabel="foo@bar.com"
				menuItems={[
					{
						id: "userMenuSignOut",
						label: "Sign out",
						handler: () => {},
						icon: "logout",
					},
					{
						id: "userMenuPrefsMenu",
						label: "Preferences",
						handler: () => {},
						icon: "cogwheel",
					},
					{
						id: "userMenuAbout",
						label: "About",
						handler: () => {},
						icon: "info",
					},
				]}
			/>,
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{
					args: [
						{
							[RSAA]: {
								types: [SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE],
								endpoint: "URL",
								method: "POST",
								body: undefined,
								credentials: "include",
							},
						},
					],
				},
				{
					args: [
						{
							type: VIEW_STATE_SET_FIELD,
							payload: { name: PREFS_NAME, field: "show", value: true },
						},
					],
				},
				{
					args: [
						{
							type: VIEW_STATE_SET_FIELD,
							payload: { name: ABOUT_NAME, field: "show", value: true },
						},
					],
				},
			]),
		));
});

describe("CurrentApp for production site", () => {
	const { location } = window;

	beforeAll(() => {
		delete window.location;

		window.location = {
			hostname: "oco.prd.platform.orckestra.cloud",
		};
	});
	afterAll(() => {
		window.location = location;
	});

	it("renders the app logo and name", () =>
		expect(
			<CurrentApp displayName="Test label" iconUri="/test/url" />,
			"when mounted",
			"to satisfy",
			<div>
				<img src="/test/url" />
				Test label
			</div>,
		));
});

describe("CurrentApp for localhost", () => {
	it("renders the app logo and name and with build info", () => {
		expect(
			<CurrentApp displayName="Test label" iconUri="/test/url" />,
			"when mounted",
			"to satisfy",
			<div>
				<img src="/test/url" />
				Test label — localdev
			</div>,
		);
	});
});

describe("sanitizeEnvironmentCode", () => {
	it.each([
		[null, null],
		[undefined, undefined],
		["demo1", "demo1"],
		["prd", "prd"],
		["prdhi", "prd"],
		["prd2", "prd"],
		["qa", "qa"],
		["qahi", "qa"],
		["qa2", "qa"],
		["int", "int"],
		["inthi", "int"],
		["int2", "int"],
		["stg", "stg"],
		["stghi", "stg"],
		["stg2", "stg"],
		["localdev", "localdev"],
		["localdevhi", "localdev"],
		["localdev2", "localdev"],
	])("Should sanitize %s as %s", (code, expectedSanitizedVersion) => {
		const sanitizedVersion = sanitizeEnvironmentCode(code);

		expect(sanitizedVersion, "to equal", expectedSanitizedVersion);
	});
});

describe("getAppEnvironmentInfo", () => {
	let originalBuildNumber;

	beforeEach(() => {
		originalBuildNumber = window.BUILD_NUMBER;
		window.BUILD_NUMBER = "1.2-alpha888";
	});

	afterEach(() => {
		window.BUILD_NUMBER = originalBuildNumber;
	});

	it.each([
		[null, "prd", "", null],
		["", "prd", "", null],
		["prd", null, "", null],
		["prd", "", "", null],
		["prd", "prd", "", null],
		["prd", "qa", "1.2-alpha888/qa", "qa"],
		["prd", "int", "1.2-alpha888/int", "qa"],
		["qa", "prd", "qa", "qa"],
		["qa", "qa", "qa — 1.2-alpha888/qa", "qa"],
		["qa", "int", "qa — 1.2-alpha888/int", "qa"],
		["int", "prd", "int", "int"],
		["int", "qa", "int — 1.2-alpha888/qa", "int"],
		["int", "int", "int — 1.2-alpha888/int", "int"],
		["stg", "prd", "stg", "stg"],
		["stg", "stg", "stg — 1.2-alpha888/stg", "stg"],
		["stg", "int", "stg — 1.2-alpha888/int", "stg"],
		["demo1", "prd", "demo1", "int"],
		["demo1", "stg", "demo1 — 1.2-alpha888/stg", "int"],
		["demo1", "int", "demo1 — 1.2-alpha888/int", "int"],
		["rel", "prd", "", null],
		["rel", "stg", "", null],
		["rel", "int", "", null],
	])(
		"getAppEnvironmentInfo for %s url and %s UI container",
		(envCode, uiContainerName, expectedName, expectedCssClassCategory) => {
			const info = getAppEnvironmentInfo(
				envCode ? `oco.${envCode}.platform.orckestra.cloud` : envCode,
				uiContainerName,
			);

			const expected = {
				name: expectedName,
				cssClassCategory: expectedCssClassCategory,
			};

			expect(info, "to equal", expected);
		},
	);

	it("getAppEnvironmentInfo for localdev (occ-dev-oco.develop.orckestra.cloud) and prd UI container", () => {
		const info = getAppEnvironmentInfo("occ-dev-oco.develop.orckestra.cloud", "prd");

		const expected = {
			name: "localdev",
			cssClassCategory: "localdev",
		};

		expect(info, "to equal", expected);
	});

	it("getAppEnvironmentInfo for localdev (local.develop.orckestra.cloud) and prd UI container", () => {
		const info = getAppEnvironmentInfo("local.develop.orckestra.cloud", "prd");

		const expected = {
			name: "localdev",
			cssClassCategory: "localdev",
		};

		expect(info, "to equal", expected);
	});

	it("getAppEnvironmentInfo for localdev (localhost) and prd UI container", () => {
		const info = getAppEnvironmentInfo("localhost", "prd");

		const expected = {
			name: "localdev",
			cssClassCategory: "localdev",
		};

		expect(info, "to equal", expected);
	});
});
