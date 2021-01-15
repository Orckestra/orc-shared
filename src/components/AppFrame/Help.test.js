import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Help, { HelpLink } from "./Help";
import { extractMessages } from "./../../utils/testUtils";
import sharedMessages from "./../../sharedMessages";
import { stringifyWithoutQuotes } from "./../../utils/parseHelper";

const messages = extractMessages(sharedMessages);

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

describe("Help", () => {
	let state, store, props, clicker, modalRoot;
	beforeEach(() => {
		state = Immutable.fromJS({
			authentication: { name: "foo@bar.com" },
			versionInfo: { version: "ver4", defaultHelpUrl: "help_url", moduleHelpUrls: [] },
		});
		store = {
			subscribe: () => { },
			dispatch: () => { },
			getState: () => state,
		};
		clicker = () => { };
		props = {
			onClick: clicker,
			helpUrl: "any_help_url.com",
		};
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	it("renders a help button", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en-US" messages={messages}>
					<Help {...props} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<HelpLink href="any_help_url.com">
				{stringifyWithoutQuotes(messages['orc-shared.help'])}
			</HelpLink>,
		));

	it("sets css for help button ", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en-US" messages={messages}>
					<Help {...props} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "cursor: pointer;")
				.and("to contain", ":hover {color: #cccccc;}"),
		));
});
