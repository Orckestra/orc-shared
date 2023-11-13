import Immutable from "immutable";
import sinon from "sinon";
import { GET_AUTHENTICATION_PROFILE_SUCCESS, SIGN_OUT_SUCCESS } from "../actions/authentication";
import reducer from "./authentication";

describe("authentication", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			upn: null,
			name: null,
			rolesClaimsValues: {},
		}));

	describe("storing authentication", () => {
		it("stores the upn", () => {
			const oldState = Immutable.fromJS({
				upn: null,
				name: null,
				rolesClaimsValues: {},
			});
			const action = {
				type: GET_AUTHENTICATION_PROFILE_SUCCESS,
				payload: {
					upn: "upnvalue",
					name: "username",
					rolesClaimsValues: [],
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and("to have value at", ["upn"], "upnvalue");
		});

		it("stores the name", () => {
			const oldState = Immutable.fromJS({
				upn: null,
				name: null,
				rolesClaimsValues: {},
			});
			const action = {
				type: GET_AUTHENTICATION_PROFILE_SUCCESS,
				payload: {
					upn: "upnvalue",
					name: "username",
					rolesClaimsValues: [],
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and("to have value at", ["name"], "username");
		});

		it("stores roles and claims", () => {
			const oldState = Immutable.fromJS({
				upn: null,
				name: null,
				rolesClaimsValues: {},
			});
			const action = {
				type: GET_AUTHENTICATION_PROFILE_SUCCESS,
				payload: {
					upn: "upnvalue",
					name: "username",
					rolesClaimsValues: [
						"Search/*/Administrator",
						"Orders/*/Editor",
						"Orders/*/Reader",
						"Products/*/Publisher",
						"Products/*/Editor",
					],
				},
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to have value at",
				["rolesClaimsValues"],
				Immutable.fromJS({
					Search: { "*": { Administrator: true } },
					Orders: { "*": { Editor: true, Reader: true } },
					Products: { "*": { Publisher: true, Editor: true } },
				}),
			);
		});
	});

	describe("storing authentication with override", () => {
		it("clears existing roles and claims if override is true", () => {
			const oldState = Immutable.fromJS({
				upn: "oldupn",
				name: "oldname",
				rolesClaimsValues: {
					Customer: { "*": { Reader: true } },
					Generic: { "*": { Reader: true } },
				},
			});
			const action = {
				type: GET_AUTHENTICATION_PROFILE_SUCCESS,
				payload: {
					upn: "newupn",
					name: "newname",
					rolesClaimsValues: ["Setting/*/Reader", "Tenant/*/Reader"],
				},
				meta: { overrideClaims: true },
			};
			const newState = reducer(oldState, action);
			return expect(newState, "to have value at", ["rolesClaimsValues"], Immutable.fromJS({
				Setting: { "*": { Reader: true } },
				Tenant: { "*": { Reader: true } },
			}));
		});
	
		it("does not clear existing roles and claims if override is false", () => {
			const oldState = Immutable.fromJS({
				upn: "oldupn",
				name: "oldname",
				rolesClaimsValues: {
					Customer: { "*": { Reader: true } },
					Generic: { "*": { Reader: true } },
				},
			});
			const action = {
				type: GET_AUTHENTICATION_PROFILE_SUCCESS,
				payload: {
					upn: "newupn",
					name: "newname",
					rolesClaimsValues: ["Setting/*/Reader", "Tenant/*/Reader"],
				},
				meta: { overrideClaims: false },
			};
			const newState = reducer(oldState, action);
			return expect(newState, "to have value at", ["rolesClaimsValues"], Immutable.fromJS({
				Customer: { "*": { Reader: true } },
				Generic: { "*": { Reader: true } },
				Setting: { "*": { Reader: true } },
				Tenant: { "*": { Reader: true } },
			}));
		});
	
		it("does not clear existing roles and claims if override is not provided", () => {
			const oldState = Immutable.fromJS({
				upn: "oldupn",
				name: "oldname",
				rolesClaimsValues: {
					Customer: { "*": { Reader: true } },
					Generic: { "*": { Reader: true } },
				},
			});
			const action = {
				type: GET_AUTHENTICATION_PROFILE_SUCCESS,
				payload: {
					upn: "newupn",
					name: "newname",
					rolesClaimsValues: ["Setting/*/Reader", "Tenant/*/Reader"],
				},
				// meta: { overrideClaims: false }, // Intentionally omitted
			};
			const newState = reducer(oldState, action);
			return expect(newState, "to have value at", ["rolesClaimsValues"], Immutable.fromJS({
				Customer: { "*": { Reader: true } },
				Generic: { "*": { Reader: true } },
				Setting: { "*": { Reader: true } },
				Tenant: { "*": { Reader: true } },
			}));
		});
	});

	describe("sign out", () => {
		const { location } = window;
		beforeAll(() => {
			delete window.location;
			window.location = { assign: sinon.spy().named("window.location.assign") };
		});
		afterEach(() => {
			window.location.assign.resetHistory();
		});
		afterAll(() => {
			window.location = location;
		});

		it("redirects to the sign out page", () => {
			const oldState = Immutable.fromJS({
				upn: null,
				name: null,
				rolesClaimsValues: {},
			});
			const action = {
				type: SIGN_OUT_SUCCESS,
				payload: "https://mock.logout.url/LogOut",
			};
			const newState = reducer(oldState, action);
			expect(newState, "to be", oldState);
			expect(window.location.assign, "to have calls satisfying", [{ args: ["https://mock.logout.url/LogOut"] }]);
		});
	});
});
