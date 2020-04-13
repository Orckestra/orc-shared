import Immutable from "immutable";
import reducer from "./versionInfo";
import { GET_VERSION_INFO_SUCCESS } from "../actions/versionInfo";

describe("versionInfo", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			version: null,
			helpUrlDefault: null,
			moduleHelpUrls: [],
		}));

	it("saves version information", () => {
		const oldState = Immutable.fromJS({
			version: null,
			helpUrlDefault: null,
			moduleHelpUrls: [],
		});
		const action = {
			type: GET_VERSION_INFO_SUCCESS,
			payload: {
				versionOCC: "5.1.2.3",
				helpUrlDefault: "help_url_default",
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
				helpUrlDefault: "help_url_default",
				moduleHelpUrls: [
					{ moduleName: "app1", helpUrl: "app1.com" },
					{ moduleName: "app2", helpUrl: "app2.com" },
				],
			}),
		);
	});
});
