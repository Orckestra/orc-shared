import { RSAA } from "redux-api-middleware";
import {
	GET_ORDER_LOOKUPS_REQUEST,
	GET_ORDER_LOOKUPS_SUCCESS,
	GET_ORDER_LOOKUPS_FAILURE,
	getOrderLookups,
	GET_CUSTOMER_LOOKUPS_REQUEST,
	GET_CUSTOMER_LOOKUPS_SUCCESS,
	GET_CUSTOMER_LOOKUPS_FAILURE,
	getCustomerLookups,
	setPagedOrderLookupsCurrentInfo,
	SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO,
	REFRESH_PAGED_ORDER_LOOKUPS,
	refreshPagedOrderLookups,
	incrementOrderLookupsPage,
	INCREMENT_ORDER_LOOKUPS_PAGE,
	getCustomerDefinitions,
	GET_CUSTOMER_DEFINITIONS_REQUEST,
	GET_CUSTOMER_DEFINITIONS_SUCCESS,
	GET_CUSTOMER_DEFINITIONS_FAILURE,
	getOrderDefinitions,
	GET_ORDER_DEFINITIONS_REQUEST,
	GET_ORDER_DEFINITIONS_SUCCESS,
	GET_ORDER_DEFINITIONS_FAILURE,
	getProductDefinitions,
	GET_PRODUCT_DEFINITIONS_REQUEST,
	GET_PRODUCT_DEFINITIONS_SUCCESS,
	GET_PRODUCT_DEFINITIONS_FAILURE,
	getProfileAttributeGroups,
	GET_PROFILE_ATTRIBUTE_GROUPS_REQUEST,
	GET_PROFILE_ATTRIBUTE_GROUPS_SUCCESS,
	GET_PROFILE_ATTRIBUTE_GROUPS_FAILURE,
	setPagedCustomerLookupsCurrentInfo,
	SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO,
	refreshPagedCustomerLookups,
	REFRESH_PAGED_CUSTOMER_LOOKUPS,
	incrementCustomerLookupsPage,
	INCREMENT_CUSTOMER_LOOKUPS_PAGE,
	saveOrderLookup,
	SAVE_ORDER_LOOKUP_REQUEST,
	SAVE_ORDER_LOOKUP_SUCCESS,
	SAVE_ORDER_LOOKUP_FAILURE,
	getProductLookups,
	GET_PRODUCT_LOOKUPS_REQUEST,
	GET_PRODUCT_LOOKUPS_SUCCESS,
	GET_PRODUCT_LOOKUPS_FAILURE,
	saveCustomerLookup,
	SAVE_CUSTOMER_LOOKUP_REQUEST,
	SAVE_CUSTOMER_LOOKUP_SUCCESS,
	SAVE_CUSTOMER_LOOKUP_FAILURE,
	createProfileDefinition,
	ADD_ORDER_LOOKUP_FAILURE,
	ADD_ORDER_LOOKUP_SUCCESS,
	ADD_ORDER_LOOKUP_REQUEST,
	addOrderLookup,
	addCustomerLookup,
	ADD_CUSTOMER_LOOKUP_FAILURE,
	ADD_CUSTOMER_LOOKUP_SUCCESS,
	ADD_CUSTOMER_LOOKUP_REQUEST,
} from "./metadata";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") => "URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("order metadata", () => {
	it("creates a RSAA to get order lookups", () =>
		expect(getOrderLookups, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_ORDER_LOOKUPS_REQUEST, GET_ORDER_LOOKUPS_SUCCESS, GET_ORDER_LOOKUPS_FAILURE],
				endpoint: 'URL: metadata/lookups/order ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates the action to set the current page", () => {
		expect(setPagedOrderLookupsCurrentInfo, "when called with", [2], "to exhaustively satisfy", {
			type: SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO,
			payload: {
				nextPageToLoad: 2,
				resetList: false,
			},
		});
	});
	it("creates the action to set the current page if it is not passed", () => {
		expect(setPagedOrderLookupsCurrentInfo, "when called with", [], "to exhaustively satisfy", {
			type: SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO,
			payload: {
				nextPageToLoad: 1,
				resetList: false,
			},
		});
	});
	it("creates the action to set the current page with resetList=true", () => {
		expect(setPagedOrderLookupsCurrentInfo, "when called with", [2, true], "to exhaustively satisfy", {
			type: SET_PAGED_ORDER_LOOKUPS_CURRENT_INFO,
			payload: {
				nextPageToLoad: 2,
				resetList: true,
			},
		});
	});

	it("creates the action to get the lookups", () => {
		expect(refreshPagedOrderLookups, "when called", "to exhaustively satisfy", {
			type: REFRESH_PAGED_ORDER_LOOKUPS,
		});
	});

	it("creates the action to increment the page", () => {
		expect(incrementOrderLookupsPage, "when called with", [2], "to exhaustively satisfy", {
			type: INCREMENT_ORDER_LOOKUPS_PAGE,
			pageToLoad: 2,
		});
	});
});

describe("getCustomerLookups", () => {
	it("creates a RSAA to get order lookups", () =>
		expect(getCustomerLookups, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_CUSTOMER_LOOKUPS_REQUEST, GET_CUSTOMER_LOOKUPS_SUCCESS, GET_CUSTOMER_LOOKUPS_FAILURE],
				endpoint: 'URL: metadata/lookups/customer ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates the action to set the current page", () => {
		expect(setPagedCustomerLookupsCurrentInfo, "when called with", [2], "to exhaustively satisfy", {
			type: SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO,
			payload: {
				nextPageToLoad: 2,
				resetList: false,
			},
		});
	});
	it("creates the action to set the current page if it is not passed", () => {
		expect(setPagedCustomerLookupsCurrentInfo, "when called with", [], "to exhaustively satisfy", {
			type: SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO,
			payload: {
				nextPageToLoad: 1,
				resetList: false,
			},
		});
	});

	it("creates the action to set the current page with resetList=true", () => {
		expect(setPagedCustomerLookupsCurrentInfo, "when called with", [2, true], "to exhaustively satisfy", {
			type: SET_PAGED_CUSTOMER_LOOKUPS_CURRENT_INFO,
			payload: {
				nextPageToLoad: 2,
				resetList: true,
			},
		});
	});

	it("creates the action to get the lookups", () => {
		expect(refreshPagedCustomerLookups, "when called", "to exhaustively satisfy", {
			type: REFRESH_PAGED_CUSTOMER_LOOKUPS,
		});
	});

	it("creates the action to increment the page", () => {
		expect(incrementCustomerLookupsPage, "when called with", [2], "to exhaustively satisfy", {
			type: INCREMENT_CUSTOMER_LOOKUPS_PAGE,
			pageToLoad: 2,
		});
	});
});

describe("getProductLookups", () => {
	it("creates a RSAA to get order lookups", () =>
		expect(getProductLookups, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_PRODUCT_LOOKUPS_REQUEST, GET_PRODUCT_LOOKUPS_SUCCESS, GET_PRODUCT_LOOKUPS_FAILURE],
				endpoint: 'URL: metadata/lookups/product ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("saveOrderLookup", () => {
	const lookup = {
		lookupName: "aLookUpForText",
		description: "a description for the lookup",
		values: [
			{ value: "first Value", sortOrder: 100 },
			{ value: "second Value", sortOrder: 50 },
		],
	};

	it("creates a RSAA to save an order lookup", () =>
		expect(saveOrderLookup, "when called with", [lookup, { data: "someData" }], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: SAVE_ORDER_LOOKUP_REQUEST, meta: { data: "someData" } },
					{ type: SAVE_ORDER_LOOKUP_SUCCESS, meta: { data: "someData" } },
					{ type: SAVE_ORDER_LOOKUP_FAILURE, meta: { data: "someData" } },
				],
				endpoint: 'URL: metadata/lookups/order/aLookUpForText ""',
				method: "PUT",
				body: JSON.stringify(lookup),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates a RSAA to save an order lookup without context", () =>
		expect(saveOrderLookup, "when called with", [lookup], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: SAVE_ORDER_LOOKUP_REQUEST, meta: {} },
					{ type: SAVE_ORDER_LOOKUP_SUCCESS, meta: {} },
					{ type: SAVE_ORDER_LOOKUP_FAILURE, meta: {} },
				],
				endpoint: 'URL: metadata/lookups/order/aLookUpForText ""',
				method: "PUT",
				body: JSON.stringify(lookup),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("addOrderLookup", () => {
	const lookup = {
		lookupName: "aLookUpForText",
		description: "a description for the lookup",
		values: [
			{ value: "first Value", sortOrder: 100 },
			{ value: "second Value", sortOrder: 50 },
		],
	};

	it("creates a RSAA to add an order lookup", () =>
		expect(addOrderLookup, "when called with", [lookup, { data: "someData" }], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: ADD_ORDER_LOOKUP_REQUEST, meta: { data: "someData" } },
					{ type: ADD_ORDER_LOOKUP_SUCCESS, meta: { data: "someData" } },
					{ type: ADD_ORDER_LOOKUP_FAILURE, meta: { data: "someData" } },
				],
				endpoint: 'URL: metadata/lookups/order/aLookUpForText ""',
				method: "POST",
				body: JSON.stringify(lookup),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates a RSAA to add an order lookup without context", () =>
		expect(addOrderLookup, "when called with", [lookup], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: ADD_ORDER_LOOKUP_REQUEST, meta: {} },
					{ type: ADD_ORDER_LOOKUP_SUCCESS, meta: {} },
					{ type: ADD_ORDER_LOOKUP_FAILURE, meta: {} },
				],
				endpoint: 'URL: metadata/lookups/order/aLookUpForText ""',
				method: "POST",
				body: JSON.stringify(lookup),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("saveCustomerLookup", () => {
	const lookup = {
		lookupName: "aLookUpForText",
		description: "a description for the lookup",
		values: [
			{ value: "first Value", sortOrder: 100 },
			{ value: "second Value", sortOrder: 50 },
		],
	};

	it("creates a RSAA to save a customer lookup", () =>
		expect(saveCustomerLookup, "when called with", [lookup, { data: "someData" }], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: SAVE_CUSTOMER_LOOKUP_REQUEST, meta: { data: "someData" } },
					{ type: SAVE_CUSTOMER_LOOKUP_SUCCESS, meta: { data: "someData" } },
					{ type: SAVE_CUSTOMER_LOOKUP_FAILURE, meta: { data: "someData" } },
				],
				endpoint: 'URL: metadata/lookups/customer/aLookUpForText ""',
				method: "PUT",
				body: JSON.stringify(lookup),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates a RSAA to save a customer lookup without context", () =>
		expect(saveCustomerLookup, "when called with", [lookup], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: SAVE_CUSTOMER_LOOKUP_REQUEST, meta: {} },
					{ type: SAVE_CUSTOMER_LOOKUP_SUCCESS, meta: {} },
					{ type: SAVE_CUSTOMER_LOOKUP_FAILURE, meta: {} },
				],
				endpoint: 'URL: metadata/lookups/customer/aLookUpForText ""',
				method: "PUT",
				body: JSON.stringify(lookup),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("addCustomerLookup", () => {
	const lookup = {
		lookupName: "aLookUpForText",
		description: "a description for the lookup",
		values: [
			{ value: "first Value", sortOrder: 100 },
			{ value: "second Value", sortOrder: 50 },
		],
	};

	it("creates a RSAA to add an customer lookup", () =>
		expect(addCustomerLookup, "when called with", [lookup, { data: "someData" }], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: ADD_CUSTOMER_LOOKUP_REQUEST, meta: { data: "someData" } },
					{ type: ADD_CUSTOMER_LOOKUP_SUCCESS, meta: { data: "someData" } },
					{ type: ADD_CUSTOMER_LOOKUP_FAILURE, meta: { data: "someData" } },
				],
				endpoint: 'URL: metadata/lookups/customer/aLookUpForText ""',
				method: "POST",
				body: JSON.stringify(lookup),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates a RSAA to add an customer lookup without context", () =>
		expect(addCustomerLookup, "when called with", [lookup], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: ADD_CUSTOMER_LOOKUP_REQUEST, meta: {} },
					{ type: ADD_CUSTOMER_LOOKUP_SUCCESS, meta: {} },
					{ type: ADD_CUSTOMER_LOOKUP_FAILURE, meta: {} },
				],
				endpoint: 'URL: metadata/lookups/customer/aLookUpForText ""',
				method: "POST",
				body: JSON.stringify(lookup),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("getCustomerDefinitions", () => {
	it("creates a RSAA to get customer definitions", () =>
		expect(getCustomerDefinitions, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_CUSTOMER_DEFINITIONS_REQUEST, GET_CUSTOMER_DEFINITIONS_SUCCESS, GET_CUSTOMER_DEFINITIONS_FAILURE],
				endpoint: 'URL: metadata/definitions/customer ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("createProfileDefinition", () => {
	const profileDefinition = JSON.stringify({
		entityTypeName: "testEntityTypeName",
		atributes: [],
		description: "test desription",
		displayName: "test",
		isSharedEntity: false,
	});
	it("creates a RSAA to create a custom profile definition", () =>
		expect(createProfileDefinition, "when called with", [profileDefinition], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: "CREATE_PROFILE_DEFINITION_REQUEST", meta: {} },
					{ type: "CREATE_PROFILE_DEFINITION_SUCCESS", meta: {} },
					{ type: "CREATE_PROFILE_DEFINITION_FAILURE", meta: {} },
				],
				endpoint: 'URL: metadata/EntityType/ ""',
				method: "POST",
				body: JSON.stringify(profileDefinition),
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("getOrderDefinitions", () => {
	it("creates a RSAA to get order definitions", () =>
		expect(getOrderDefinitions, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_ORDER_DEFINITIONS_REQUEST, GET_ORDER_DEFINITIONS_SUCCESS, GET_ORDER_DEFINITIONS_FAILURE],
				endpoint: 'URL: metadata/definitions/order/ ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("getProductDefinitions", () => {
	it("creates a RSAA to get order definitions", () =>
		expect(getProductDefinitions, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_PRODUCT_DEFINITIONS_REQUEST, GET_PRODUCT_DEFINITIONS_SUCCESS, GET_PRODUCT_DEFINITIONS_FAILURE],
				endpoint: 'URL: products/definitions ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("getProfileAttributeGroups", () => {
	it("creates a RSAA to get order definitions", () =>
		expect(getProfileAttributeGroups, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					GET_PROFILE_ATTRIBUTE_GROUPS_REQUEST,
					GET_PROFILE_ATTRIBUTE_GROUPS_SUCCESS,
					GET_PROFILE_ATTRIBUTE_GROUPS_FAILURE,
				],
				endpoint: 'URL: metadata/attributegroups/profile ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});
