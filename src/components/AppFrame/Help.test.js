import React from "react";
import sinon from "sinon";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Help, { HelpWrapper } from "./Help";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

describe("Help", () => {
	let state, store, props, clicker, helpMessages, modalRoot, windowOpenSpy, windowOpen;
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

		windowOpen = window.open;
		windowOpenSpy = sinon.spy().named("windowOpen");
		window.open = windowOpenSpy;
	});
	afterEach(() => {
		window.open = windowOpen;

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
			<HelpWrapper>HELP</HelpWrapper>,
		));

	it("renders a help button and expect click to open the url", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Help {...props} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click" },
		).then(() =>
			expect(windowOpenSpy, "to have calls satisfying", [
				{ args: ["any_help_url.com", "_blank"] },
			]),
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
				.and("to contain", ":hover {color: #ccc;}"),
		));
});
