import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import useApplicationHelpUrl from "./useApplicationHelpUrl";

const TestComp = ({ appId }) => {
	const [helpUrl] = useApplicationHelpUrl(appId);
	return <div>{helpUrl}</div>;
};

describe("useApplicationHelpUrl", () => {
	let state, store;
	beforeEach(() => {
		state = Immutable.fromJS({
			input: {},
			locale: {
				locale: "en-CA",
				supportedLocales: ["en-US", "en-CA"],
			},
			navigation: {
				route: { location: {}, match: { params: { scope: "test3" } } },
			},
			versionInfo: {
				version: "1.1.2.9",
				defaultHelpUrl: "default_url.com",
				moduleHelpUrls: [{ moduleName: "myApp", helpUrl: "my_app_help_url.com" }, { moduleName: "myOtherApp" }],
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("provides my application help url", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp appId="myApp" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>my_app_help_url.com</div>,
		));

	it("provides my unknown application default help url", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp appId="myUnknownApp" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>default_url.com</div>,
		));

	it("provides my other application default help url", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<TestComp appId="myOtherApp" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>default_url.com</div>,
		));
});
