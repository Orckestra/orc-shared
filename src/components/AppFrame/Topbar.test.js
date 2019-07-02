import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import { Provider } from "react-redux";
import { RSAA } from "redux-api-middleware";
import { IntlProvider } from "react-intl";
import { VIEW_STATE_SET_FIELD } from "../../actions/view";
import {
	SIGN_OUT_REQUEST,
	SIGN_OUT_SUCCESS,
	SIGN_OUT_FAILURE,
} from "../../actions/authentication";
import { PREFS_NAME } from "./Preferences";
import { ABOUT_NAME } from "./About";
import ApplicationSelector from "./ApplicationSelector";
import Topbar, {
	withUserMenu,
	Wrapper,
	AppBox,
	CurrentApp,
	AppLabel,
	AppLogo,
	Menu,
} from "./Topbar";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

describe("Topbar", () => {
	let applications, props, linkHOC, path, clicker, menuMessages;
	beforeEach(() => {
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
		linkHOC = x => x;
		path = [{ crumb: 1 }, { crumb: 2 }, { crumb: 3 }];
		clicker = () => {};
		menuMessages = {
			sign_out: { id: "msg.signout" },
			preferences: { id: "msg.prefs" },
			about: { id: "msg.about" },
		};
		props = {
			onClick: clicker,
			path,
			linkHOC,
			menuLabel: "TestLabel",
			menuMessages,
			applications,
			applicationId: "current",
		};
	});

	it("renders a top bar of an app", () =>
		expect(
			<Topbar {...props} />,
			"to render as",
			<Wrapper onClick={clicker}>
				<AppBox>
					<ApplicationSelector
						{...{
							applications,
							applicationId: "current",
						}}
					/>
					<CurrentApp displayName="Test label" iconUri="/test/url" />
				</AppBox>
				<Menu menuLabel="TestLabel" messages={menuMessages} />
			</Wrapper>,
		));

	it("doesn't break if no current app", () =>
		expect(
			<Topbar {...props} applicationId="wrong" />,
			"to render as",
			<Wrapper onClick={clicker}>
				<AppBox>
					<CurrentApp />
				</AppBox>
				<Menu menuLabel="TestLabel" messages={menuMessages} />
			</Wrapper>,
		));

	it("doesn't break if no apps at all", () =>
		expect(
			<Topbar {...props} applications={undefined} />,
			"to render as",
			<Wrapper onClick={clicker}>
				<AppBox>
					<CurrentApp />
				</AppBox>
				<Menu menuLabel="TestLabel" messages={menuMessages} />
			</Wrapper>,
		));
});

describe("withUserMenu", () => {
	const TestComp = () => <div />;
	let state, store, messages;
	beforeEach(() => {
		state = Immutable.fromJS({});
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
		expect(withUserMenu, "called with", [TestComp])
			.then(EnhComp =>
				expect(
					<Provider store={store}>
						<IntlProvider locale="en">
							<EnhComp messages={messages} />
						</IntlProvider>
					</Provider>,
					"when deeply rendered",
					"to contain",
					<TestComp
						menuItems={[
							{
								label: "Sign out",
								handler: expect.it("called"),
								icon: "logout-1",
							},
							{
								label: "Preferences",
								handler: expect.it("called"),
								icon: "settings-cogwheel",
							},
							{
								label: "About",
								handler: expect.it("called"),
								icon: "infomation-circle",
							},
						]}
					/>,
				),
			)
			.then(() =>
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
			"to render as",
			<AppLabel>
				<AppLogo src="/test/url" />
				Test label
			</AppLabel>,
		));
});
