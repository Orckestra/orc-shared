import React from "react";
import sinon from "sinon";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Help, { HelpLink } from "./Help";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

describe("Help", () => {
	let state, store, props, clicker, helpMessages, modalRoot;
	beforeEach(() => {
		state = Immutable.fromJS({
			authentication: { name: "foo@bar.com" },
			versionInfo: { version: "ver4", defaultHelpUrl: "help_url", moduleHelpUrls: [] },
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
		clicker = () => {};
		helpMessages = {
			help: { id: "msg.help", defaultMessage: "HELP" },
		};
		props = {
			onClick: clicker,
			messages: helpMessages,
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
				<IntlProvider locale="en">
					<Help {...props} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<HelpLink href="any_help_url.com">HELP</HelpLink>,
		));

	it("sets css for help button ", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
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
