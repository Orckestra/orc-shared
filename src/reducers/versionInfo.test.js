import Immutable from "immutable";
import reducer from "./versionInfo";
import { GET_VERSION_INFO_SUCCESS, RESET_VERSION_INFO } from "../actions/versionInfo";

describe("versionInfo", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			version: null,
			defaultHelpUrl: null,
			moduleHelpUrls: [],
		}));

	it("saves version information", () => {
		const oldState = Immutable.fromJS({
			version: null,
			defaultHelpUrl: null,
			moduleHelpUrls: [],
		});
		const action = {
			type: GET_VERSION_INFO_SUCCESS,
			payload: {
				versionOCC: "5.1.2.3",
				defaultHelpUrl: "help_url_default",
				moduleHelpUrls: [
					{ moduleName: "app1", helpUrl: "app1.com" },
					{ moduleName: "app2", helpUrl: "app2.com" },
				],
			},
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
			Immutable.fromJS({
				version: "5.1.2.3",
				defaultHelpUrl: "help_url_default",
				moduleHelpUrls: [
					{ moduleName: "app1", helpUrl: "app1.com" },
					{ moduleName: "app2", helpUrl: "app2.com" },
				],
			}),
		);
	});

	it("resets version information", () => {
		const oldState = Immutable.fromJS({
			version: "5.1.2.3",
			defaultHelpUrl: "help_url_default",
			moduleHelpUrls: [
				{ moduleName: "app1", helpUrl: "app1.com" },
				{ moduleName: "app2", helpUrl: "app2.com" },
			],
		});
		const action = {
			type: RESET_VERSION_INFO,
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
			Immutable.fromJS({
				version: null,
				defaultHelpUrl: null,
				moduleHelpUrls: [],
			}),
		);
	});

	it("handles version information with moduleHelpUrls being null", () => {
		const oldState = Immutable.fromJS({
			version: null,
			defaultHelpUrl: null,
			moduleHelpUrls: [],
		});
		const action = {
			type: GET_VERSION_INFO_SUCCESS,
			payload: {
				versionOCC: "5.1.2.3",
				defaultHelpUrl: "help_url_default",
				moduleHelpUrls: null,
			},
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to satisfy",
			Immutable.fromJS({
				version: "5.1.2.3",
				defaultHelpUrl: "help_url_default",
				moduleHelpUrls: [],
			}),
		);
	});
});
