import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import { Provider } from "react-redux";
import { RSAA } from "redux-api-middleware";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import { VIEW_STATE_SET_FIELD } from "../../actions/view";
import {
	SIGN_OUT_REQUEST,
	SIGN_OUT_SUCCESS,
	SIGN_OUT_FAILURE,
} from "../../actions/authentication";
import { PREFS_NAME } from "./Preferences";
import { ABOUT_NAME } from "./About";
import { Wrapper as AppSelWrapper, MenuIcon } from "./ApplicationSelector/Header";
import { Wrapper as MenuWrapper } from "../DropMenu";
import Topbar, {
	Wrapper,
	AppBox,
	CurrentApp,
	AppLabel,
	AppLogo,
	useMenuProps,
} from "./Topbar";
import { HelpLink } from "./Help";

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
			<Wrapper onClick={clicker}>
				<AppBox>
					<AppSelWrapper>
						<MenuIcon />
					</AppSelWrapper>
					<AppLabel>
						<AppLogo src="/test/url" />
						Test label
					</AppLabel>
				</AppBox>
				<MenuWrapper>
					<Ignore />
				</MenuWrapper>
				<HelpLink>Help</HelpLink>
			</Wrapper>,
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
			<Wrapper onClick={clicker}>
				<AppBox>
					<Ignore />
					<AppLabel>
						<AppLogo />
					</AppLabel>
				</AppBox>
				<MenuWrapper>
					<Ignore />
				</MenuWrapper>
				<HelpLink>Help</HelpLink>
			</Wrapper>,
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
			<Wrapper onClick={clicker}>
				<AppBox>
					<Ignore />
					<AppLabel>
						<AppLogo />
					</AppLabel>
				</AppBox>
				<MenuWrapper>
					<Ignore />
				</MenuWrapper>
				<HelpLink>Help</HelpLink>
			</Wrapper>,
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
						icon: "logout-1",
					},
					{
						id: "userMenuPrefsMenu",
						label: "Preferences",
						handler: () => {},
						icon: "settings-cogwheel",
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

describe("CurrentApp", () => {
	it("renders the app logo and name", () =>
		expect(
			<CurrentApp displayName="Test label" iconUri="/test/url" />,
			"when mounted",
			"to satisfy",
			<AppLabel>
				<AppLogo src="/test/url" />
				Test label
			</AppLabel>,
		));
});
