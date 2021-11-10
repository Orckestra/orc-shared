import Immutable from "immutable";
import reducer from "./settings";
import { GET_MY_APPLICATION_SUCCESS, SET_MY_APPLICATION_SUCCESS } from "../actions/applications";
import {
	GET_APPLICATION_MODULES_SUCCESS,
	GET_MY_SCOPE_SUCCESS,
	GET_SCOPES_FAILURE,
	GET_SCOPES_SUCCESS,
} from "../actions/scopes";

describe("settings", () => {
	const initialState = Immutable.fromJS({
		defaultApp: 0,
		defaultScope: null,
		loadedModulesScope: [],
		modules: [],
	});

	it("behaves as a reducer should", () => expect(reducer, "to be a reducer with initial state", initialState));

	it("stores results of getting your personal default application", () => {
		const oldState = Immutable.fromJS({
			defaultApp: 0,
		});
		const action = {
			type: GET_MY_APPLICATION_SUCCESS,
			payload: {
				id: 9,
				name: "HTMLMarketing",
				isVisible: true,
				isAbsoluteUrl: true,
				url: "https://orc-env18-oco.develop.orckestra.cloud/marketing",
				iconUri: "https://orc-env18-oco.develop.orckestra.cloud/marketing/icon.png",
				displayName: {
					"en-CA": "Product Information Beta",
					"en-US": "Product Information Beta",
					"fr-CA": "Informations Produit Bêta",
					"fr-FR": "Informations Produit Bêta",
					"it-IT": "Informazioni sul prodotto Bêta",
				},
			},
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			defaultApp: 9,
		});
	});

	it("stores a newly set default application", () => {
		const oldState = Immutable.fromJS({
			defaultApp: 9,
		});
		const action = {
			type: SET_MY_APPLICATION_SUCCESS,
			meta: { appId: 12 },
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			defaultApp: 12,
		});
	});

	it("stores a newly set default scope", () => {
		const oldState = Immutable.fromJS({
			defaultScope: null,
		});
		const action = {
			type: GET_MY_SCOPE_SUCCESS,
			payload: { id: "aScope" },
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			defaultScope: "aScope",
		});
	});

	it("stores modules for the application", () => {
		const oldState = Immutable.fromJS({
			modules: [],
		});
		const action = {
			type: GET_APPLICATION_MODULES_SUCCESS,
			payload: [{ name: "Customers" }, { name: "Orders" }, { name: "Administration" }],
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			modules: ["Customer", "Order", "Administration"],
		});
	});

	it("stores module as loaded when it is a success", () => {
		const oldState = Immutable.fromJS({
			loadedModulesScope: [],
		});
		const action = {
			type: GET_SCOPES_SUCCESS,
			meta: { module: "Order" },
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			loadedModulesScope: ["Order"],
		});
	});

	it("stores module as loaded when it is a failure with status 500", () => {
		const oldState = Immutable.fromJS({
			loadedModulesScope: [],
		});
		const action = {
			type: GET_SCOPES_FAILURE,
			payload: {
				status: 500,
			},
			meta: { module: "Order" },
		};
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and("to satisfy", {
			loadedModulesScope: ["Order"],
		});
	});

	it("does not store module as loaded when it is a failure with other errors", () => {
		const oldState = Immutable.fromJS({
			loadedModulesScope: [],
		});
		const action = {
			type: GET_SCOPES_FAILURE,
			payload: {
				status: 404,
			},
			meta: { module: "Order" },
		};
		const newState = reducer(oldState, action);
		expect(newState, "to be", oldState);
	});
});
