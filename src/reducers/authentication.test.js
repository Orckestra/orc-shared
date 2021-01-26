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
