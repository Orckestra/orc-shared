import Immutable from "immutable";
import {
	GET_ORDER_LOOKUPS_SUCCESS,
	GET_CUSTOMER_LOOKUPS_SUCCESS,
	GET_PRODUCT_LOOKUPS_SUCCESS,
	incrementOrderLookupsPage,
	refreshPagedOrderLookups,
	lookupsPageLength,
	setPagedOrderLookupsCurrentInfo,
	GET_ORDER_DEFINITIONS_SUCCESS,
	GET_CUSTOMER_DEFINITIONS_SUCCESS,
	GET_PRODUCT_DEFINITIONS_SUCCESS,
	GET_PROFILE_ATTRIBUTE_GROUPS_SUCCESS,
	setPagedCustomerLookupsCurrentInfo,
	refreshPagedCustomerLookups,
	incrementCustomerLookupsPage,
	SAVE_CUSTOMER_LOOKUP_SUCCESS,
	CREATE_PROFILE_DEFINITION_SUCCESS,
	UPDATE_PROFILE_DEFINITION_SUCCESS,
	SAVE_ORDER_LOOKUP_SUCCESS,
	ADD_ORDER_LOOKUP_SUCCESS,
	ADD_CUSTOMER_LOOKUP_SUCCESS,
	GET_ORDER_LOOKUP_SUCCESS,
	GET_CUSTOMER_LOOKUP_SUCCESS,
} from "../actions/metadata";
import reducer from "./metadata";

export const generateLookups = max => {
	if (max < 1 || max > 25) {
		throw new Error("Max must be between 1 and 25 inclusively");
	}

	return Array.from({ length: max }).reduce((accumulator, currentValue, currentIndex) => {
		const name = String.fromCharCode(90 - currentIndex);

		accumulator[name] = {
			lookupName: name,
			values: {
				Completed: {
					id: "03caa0ebecd04792a96c2f8df5b9b35a",
					value: "Completed",
					lookupId: "OrderStatus",
					displayName: {
						"en-US": "Completed",
					},
					sortOrder: 0,
					isActive: true,
					isSystem: true,
				},
				InProgress: {
					id: "13caa0ebecd04792a96c2f8df5b9b35a",
					value: "InProgress",
					lookupId: "InProgress",
					displayName: {
						"en-US": "In Progress",
					},
					sortOrder: 1,
					isActive: false,
					isSystem: true,
				},
			},
		};

		return accumulator;
	}, {});
};

describe("metadata", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			lookups: {
				order: {
					index: {},
					list: [],
				},
				customer: {
					index: {},
					list: [],
				},
				product: {
					index: {},
					list: [],
				},
			},
			definitions: {
				customer: {},
				order: {},
				product: {},
			},
		}));

	describe("order", () => {
		it("get order metadata", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: {},
						list: [],
					},
				},
			});
			const action = {
				type: GET_ORDER_LOOKUPS_SUCCESS,
				payload: [
					{
						lookupName: "CanceledStatusReasons",
						values: [
							{
								id: "6bbfe77703c745d68b8eaceb9cd484b1",
								value: "CanceledReason2",
								lookupId: "CanceledStatusReasons",
								sortOrder: 0,
								isActive: true,
								isSystem: true,
							},
							{
								id: "e16d07f847284775b77cfb985724cf58",
								value: "CanceledReason1",
								lookupId: "CanceledStatusReasons",
								sortOrder: 0,
								isActive: true,
								isSystem: true,
							},
						],
						isActive: true,
						isSystem: true,
					},
					{
						lookupName: "CartStatus",
						values: [],
						isActive: true,
						isSystem: true,
					},
				],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: {
								CanceledStatusReasons: {
									lookupName: "CanceledStatusReasons",
									values: {
										CanceledReason1: {
											id: "e16d07f847284775b77cfb985724cf58",
											value: "CanceledReason1",
											lookupId: "CanceledStatusReasons",
											sortOrder: 0,
											isActive: true,
											isSystem: true,
										},
										CanceledReason2: {
											id: "6bbfe77703c745d68b8eaceb9cd484b1",
											value: "CanceledReason2",
											lookupId: "CanceledStatusReasons",
											sortOrder: 0,
											isActive: true,
											isSystem: true,
										},
									},
									isActive: true,
									isSystem: true,
								},
								CartStatus: {
									lookupName: "CartStatus",
									values: {},
									isActive: true,
									isSystem: true,
								},
							},
							list: [],
						},
					},
				}),
			);
		});

		it("get order lookup success", () => {
			const lookups = {
				CanceledStatusReasons: {
					lookupName: "CanceledStatusReasons",
					values: {
						CanceledReason1: {
							id: "e16d07f847284775b77cfb985724cf58",
							value: "CanceledReason1",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
						CanceledReason2: {
							id: "6bbfe77703c745d68b8eaceb9cd484b1",
							value: "CanceledReason2",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
					},
					isActive: true,
					isSystem: true,
				},
				CartStatus: {
					lookupName: "CartStatus",
					values: {},
					isActive: true,
					isSystem: true,
				},
			};

			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: { CartStatus: lookups.CartStatus },
						list: [],
					},
				},
			});
			const action = {
				type: GET_ORDER_LOOKUP_SUCCESS,
				payload: lookups.CanceledStatusReasons,
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: lookups,
							list: [],
						},
					},
				}),
			);
		});

		it("save order metadata success", () => {
			const lookups = {
				CanceledStatusReasons: {
					lookupName: "CanceledStatusReasons",
					values: {
						CanceledReason1: {
							id: "e16d07f847284775b77cfb985724cf58",
							value: "CanceledReason1",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
						CanceledReason2: {
							id: "6bbfe77703c745d68b8eaceb9cd484b1",
							value: "CanceledReason2",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
					},
					isActive: true,
					isSystem: true,
				},
				CartStatus: {
					lookupName: "CartStatus",
					values: {},
					isActive: true,
					isSystem: true,
				},
			};

			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: { CartStatus: lookups.CartStatus },
						list: [],
					},
				},
			});
			const action = {
				type: SAVE_ORDER_LOOKUP_SUCCESS,
				payload: lookups.CanceledStatusReasons,
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: lookups,
							list: [],
						},
					},
				}),
			);
		});

		it("add order metadata success", () => {
			const lookups = {
				NewStatusReasons: {
					lookupName: "NewStatusReasons",
					values: {
						CanceledReason1: {
							id: "e16d07f847284775b77cfb985724cf58",
							value: "CanceledReason1",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
						CanceledReason2: {
							id: "6bbfe77703c745d68b8eaceb9cd484b1",
							value: "CanceledReason2",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
					},
					isActive: true,
					isSystem: true,
				},
				CartStatus: {
					lookupName: "CartStatus",
					values: {},
					isActive: true,
					isSystem: true,
				},
			};

			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: { CartStatus: lookups.CartStatus },
						list: [],
					},
				},
			});
			const action = {
				type: ADD_ORDER_LOOKUP_SUCCESS,
				payload: lookups.NewStatusReasons,
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: lookups,
							list: ["CartStatus", "NewStatusReasons"],
							totalCount: 2,
						},
					},
				}),
			);
		});

		it("increments the page number", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: {},
						list: [],
					},
				},
			});
			const action = incrementOrderLookupsPage(2);
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: {},
							list: [],
							nextPageToLoad: 2,
						},
					},
				}),
			);
		});

		it("sets the index for the items to display", () => {
			const lookups = generateLookups(25);
			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: lookups,
						list: [],
					},
				},
			});
			const action = refreshPagedOrderLookups();
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: lookups,
							list: Object.keys(lookups).sort().slice(0, lookupsPageLength),
							totalCount: 25,
						},
					},
				}),
			);
		});

		it("sets the index for the items to display using case insensitive", () => {
			const lookups = generateLookups(5);
			lookups["a"] = {
				lookupName: "a",
				values: {
					Completed: {
						id: "03caa0ebecd04792a96c2f8df5b9b35a",
						value: "Completed",
						lookupId: "OrderStatus",
						displayName: {
							"en-US": "Completed",
						},
						sortOrder: 0,
						isActive: true,
						isSystem: true,
					},
					InProgress: {
						id: "13caa0ebecd04792a96c2f8df5b9b35a",
						value: "InProgress",
						lookupId: "InProgress",
						displayName: {
							"en-US": "In Progress",
						},
						sortOrder: 1,
						isActive: false,
						isSystem: true,
					},
				},
			};

			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: lookups,
						list: [],
					},
				},
			});
			const action = refreshPagedOrderLookups();
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: lookups,
							list: ["a", "V", "W", "X", "Y", "Z"],
							totalCount: 6,
						},
					},
				}),
			);
		});

		it("sets the index for the items to display for second page", () => {
			const lookups = generateLookups(25);
			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: lookups,
						list: [],
						nextPageToLoad: 2,
					},
				},
			});
			const action = refreshPagedOrderLookups();
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: lookups,
							list: Object.keys(lookups).sort().slice(0, 25),
							totalCount: 25,
							nextPageToLoad: 2,
						},
					},
				}),
			);
		});

		it("sets current page info", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: {},
						list: [],
					},
				},
			});
			const action = setPagedOrderLookupsCurrentInfo(2);
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: {},
							list: [],
							currentPage: 2,
							nextPageToLoad: 2,
						},
					},
				}),
			);
		});

		it("sets current page info with reset", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					order: {
						index: {},
						list: [],
					},
				},
			});
			const action = setPagedOrderLookupsCurrentInfo(2, true);
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						order: {
							index: {},
							list: [],
							currentPage: null,
							nextPageToLoad: 1,
						},
					},
				}),
			);
		});

		it("set order definitions", () => {
			const oldState = Immutable.fromJS({
				definitions: {
					order: {},
				},
			});

			const action = {
				type: GET_ORDER_DEFINITIONS_SUCCESS,
				payload: {
					Order: {
						displayName: {
							"en-US": "Order",
							"fr-CA": "Commande",
						},
						entityTypeName: "Order",
						isBuiltIn: true,
						attributes: [
							{
								maximum: 32,
								dataType: "Text",
								isRequired: true,
								name: "MyFirstAttribute",
								displayOrder: 0,
								isSearchable: false,
								displayName: {
									"en-US": "My First Attribute",
									"fr-CA": "Mon Premier Attribut",
								},
								minimum: 0,
								multilingual: false,
								isBuiltIn: false,
								allowMultipleValues: false,
							},
							{
								maximum: 256,
								dataType: "Text",
								isRequired: true,
								name: "MySecondAttribute",
								displayOrder: 0,
								isSearchable: false,
								displayName: {
									"en-US": "My Second Attribute",
									"fr-CA": "Mon Second Attribut",
								},
								minimum: 0,
								multilingual: false,
								isBuiltIn: false,
								allowMultipleValues: false,
							},
						],
					},
				},
			};

			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					definitions: {
						order: {
							Order: {
								displayName: {
									"en-US": "Order",
									"fr-CA": "Commande",
								},
								entityTypeName: "Order",
								isBuiltIn: true,
								attributes: [
									{
										maximum: 32,
										dataType: "Text",
										isRequired: true,
										name: "MyFirstAttribute",
										displayOrder: 0,
										isSearchable: false,
										displayName: {
											"en-US": "My First Attribute",
											"fr-CA": "Mon Premier Attribut",
										},
										minimum: 0,
										multilingual: false,
										isBuiltIn: false,
										allowMultipleValues: false,
									},
									{
										maximum: 256,
										dataType: "Text",
										isRequired: true,
										name: "MySecondAttribute",
										displayOrder: 0,
										isSearchable: false,
										displayName: {
											"en-US": "My Second Attribute",
											"fr-CA": "Mon Second Attribut",
										},
										minimum: 0,
										multilingual: false,
										isBuiltIn: false,
										allowMultipleValues: false,
									},
								],
							},
						},
					},
				}),
			);
		});
	});

	describe("customer", () => {
		it("gets customer metadata", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: {},
						list: [],
					},
				},
			});
			const action = {
				type: GET_CUSTOMER_LOOKUPS_SUCCESS,
				payload: [
					{
						lookupName: "CustomerLookup_1",
						values: [
							{
								id: "6bbfe33303c745d75b8eaceb9cd484b1",
								value: "CustomerLookup_1_Value1",
								lookupId: "CustomerLookup_1",
								sortOrder: 0,
								isActive: true,
								isSystem: true,
							},
							{
								id: "6yyfe33303c745d75b8eaceb9cd411b1",
								value: "CustomerLookup_1_Value2",
								lookupId: "CustomerLookup_1",
								sortOrder: 0,
								isActive: true,
								isSystem: true,
							},
						],
						isActive: true,
						isSystem: true,
					},
					{
						lookupName: "CustomerLookup_2",
						values: [],
						isActive: true,
						isSystem: true,
					},
				],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: {
								CustomerLookup_1: {
									lookupName: "CustomerLookup_1",
									values: {
										CustomerLookup_1_Value1: {
											id: "6bbfe33303c745d75b8eaceb9cd484b1",
											value: "CustomerLookup_1_Value1",
											lookupId: "CustomerLookup_1",
											sortOrder: 0,
											isActive: true,
											isSystem: true,
										},
										CustomerLookup_1_Value2: {
											id: "6yyfe33303c745d75b8eaceb9cd411b1",
											value: "CustomerLookup_1_Value2",
											lookupId: "CustomerLookup_1",
											sortOrder: 0,
											isActive: true,
											isSystem: true,
										},
									},
									isActive: true,
									isSystem: true,
								},
								CustomerLookup_2: {
									lookupName: "CustomerLookup_2",
									values: {},
									isActive: true,
									isSystem: true,
								},
							},
							list: [],
						},
					},
				}),
			);
		});

		it("get customer lookup success", () => {
			const lookups = {
				CanceledStatusReasons: {
					lookupName: "CanceledStatusReasons",
					values: {
						CanceledReason1: {
							id: "e16d07f847284775b77cfb985724cf58",
							value: "CanceledReason1",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
						CanceledReason2: {
							id: "6bbfe77703c745d68b8eaceb9cd484b1",
							value: "CanceledReason2",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
					},
					isActive: true,
					isSystem: true,
				},
				CartStatus: {
					lookupName: "CartStatus",
					values: {},
					isActive: true,
					isSystem: true,
				},
			};

			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: { CartStatus: lookups.CartStatus },
						list: [],
					},
				},
			});
			const action = {
				type: GET_CUSTOMER_LOOKUP_SUCCESS,
				payload: lookups.CanceledStatusReasons,
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: lookups,
							list: [],
						},
					},
				}),
			);
		});

		it("save customer metadata success", () => {
			const lookups = {
				CanceledStatusReasons: {
					lookupName: "CanceledStatusReasons",
					values: {
						CanceledReason1: {
							id: "e16d07f847284775b77cfb985724cf58",
							value: "CanceledReason1",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
						CanceledReason2: {
							id: "6bbfe77703c745d68b8eaceb9cd484b1",
							value: "CanceledReason2",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
					},
					isActive: true,
					isSystem: true,
				},
				CartStatus: {
					lookupName: "CartStatus",
					values: {},
					isActive: true,
					isSystem: true,
				},
			};

			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: { CartStatus: lookups.CartStatus },
						list: [],
					},
				},
			});
			const action = {
				type: SAVE_CUSTOMER_LOOKUP_SUCCESS,
				payload: lookups.CanceledStatusReasons,
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: lookups,
							list: [],
						},
					},
				}),
			);
		});

		it("add customer metadata success", () => {
			const lookups = {
				NewStatusReasons: {
					lookupName: "NewStatusReasons",
					values: {
						CanceledReason1: {
							id: "e16d07f847284775b77cfb985724cf58",
							value: "CanceledReason1",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
						CanceledReason2: {
							id: "6bbfe77703c745d68b8eaceb9cd484b1",
							value: "CanceledReason2",
							lookupId: "CanceledStatusReasons",
							sortOrder: 0,
							isActive: true,
							isSystem: true,
						},
					},
					isActive: true,
					isSystem: true,
				},
				CartStatus: {
					lookupName: "CartStatus",
					values: {},
					isActive: true,
					isSystem: true,
				},
			};

			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: { CartStatus: lookups.CartStatus },
						list: [],
					},
				},
			});
			const action = {
				type: ADD_CUSTOMER_LOOKUP_SUCCESS,
				payload: lookups.NewStatusReasons,
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: lookups,
							list: ["CartStatus", "NewStatusReasons"],
							totalCount: 2,
						},
					},
				}),
			);
		});

		it("increments the page number", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: {},
						list: [],
					},
				},
			});
			const action = incrementCustomerLookupsPage(2);
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: {},
							list: [],
							nextPageToLoad: 2,
						},
					},
				}),
			);
		});

		it("sets the index for the items to display", () => {
			const lookups = generateLookups(25);
			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: lookups,
						list: [],
					},
				},
			});
			const action = refreshPagedCustomerLookups();
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: lookups,
							list: Object.keys(lookups).sort().slice(0, lookupsPageLength),
							totalCount: 25,
						},
					},
				}),
			);
		});

		it("sets the index for the items to display for second page", () => {
			const lookups = generateLookups(25);
			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: lookups,
						list: [],
						nextPageToLoad: 2,
					},
				},
			});
			const action = refreshPagedCustomerLookups();
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: lookups,
							list: Object.keys(lookups).sort().slice(0, 25),
							totalCount: 25,
							nextPageToLoad: 2,
						},
					},
				}),
			);
		});

		it("sets current page info", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: {},
						list: [],
					},
				},
			});
			const action = setPagedCustomerLookupsCurrentInfo(2);
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: {},
							list: [],
							currentPage: 2,
							nextPageToLoad: 2,
						},
					},
				}),
			);
		});

		it("sets current page info with reset", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					customer: {
						index: {},
						list: [],
					},
				},
			});
			const action = setPagedCustomerLookupsCurrentInfo(2, true);
			const newState = reducer(oldState, action);

			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						customer: {
							index: {},
							list: [],
							currentPage: null,
							nextPageToLoad: 1,
						},
					},
				}),
			);
		});

		it("saves customer definitions metadata", () => {
			const definitionsPayload = {
				displayName: {
					"en-CA": "",
					"en-US": "Address",
					"fr-CA": "Adresse",
					"it-IT": "Indirizzo",
				},
				entityTypeName: "ADDRESS",
				isBuiltIn: true,
				attributes: [
					{
						name: "AddressName",
						groupId: "Default",
						displayName: {
							"en-CA": "",
							"en-US": "Address Name",
							"fr-CA": "Nom adresse",
							"it-IT": "Nome indirizzo",
						},
						isRequired: false,
						displayOrder: 0,
						dataType: "Text",
						isBuiltIn: true,
						allowMultipleValues: false,
						multilingual: false,
						minimum: 0,
						maximum: 64,
						isSearchable: true,
					},
				],
			};
			const oldState = Immutable.fromJS({
				definitions: {
					customer: {},
				},
			});
			const action = {
				type: GET_CUSTOMER_DEFINITIONS_SUCCESS,
				payload: [definitionsPayload],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					definitions: {
						customer: {
							ADDRESS: definitionsPayload,
						},
					},
				}),
			);
		});

		it("create custom profile definition success", () => {
			const definition = {
				displayName: {
					"en-CA": "",
					"en-US": "Address",
					"fr-CA": "Adresse",
					"it-IT": "Indirizzo",
				},
				entityTypeName: "ADDRESS",
				isBuiltIn: true,
				attributes: [],
			};
			const oldState = Immutable.fromJS({
				definitions: {
					customer: {},
				},
			});
			const action = {
				type: CREATE_PROFILE_DEFINITION_SUCCESS,
				payload: definition,
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					definitions: {
						customer: {
							ADDRESS: {
								displayName: { "en-CA": "", "en-US": "Address", "fr-CA": "Adresse", "it-IT": "Indirizzo" },
								entityTypeName: "ADDRESS",
								isBuiltIn: true,
								attributes: [],
							},
						},
					},
				}),
			);
		});

		it("update custom profile definition success", () => {
			const definition = {
				displayName: {
					"en-CA": "",
					"en-US": "Address",
					"fr-CA": "Adresse",
					"it-IT": "Indirizzo",
				},
				entityTypeName: "ADDRESS",
				isBuiltIn: true,
				attributes: [],
			};
			const oldState = Immutable.fromJS({
				definitions: {
					customer: {
						ADDRESS: {
							displayName: {
								"en-CA": "",
								"en-US": "",
								"fr-CA": "",
								"it-IT": "",
							},
							entityTypeName: "ADDRESS",
							isBuiltIn: true,
							attributes: [],
						},
					},
				},
			});
			const action = {
				type: UPDATE_PROFILE_DEFINITION_SUCCESS,
				payload: definition,
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					definitions: {
						customer: {
							ADDRESS: {
								displayName: { "en-CA": "", "en-US": "Address", "fr-CA": "Adresse", "it-IT": "Indirizzo" },
								entityTypeName: "ADDRESS",
								isBuiltIn: true,
								attributes: [],
							},
						},
					},
				}),
			);
		});
	});

	describe("product", () => {
		it("gets product metadata", () => {
			const oldState = Immutable.fromJS({
				lookups: {
					product: {
						index: {},
						list: [],
					},
				},
			});
			const action = {
				type: GET_PRODUCT_LOOKUPS_SUCCESS,
				payload: [
					{
						lookupName: "ProductLookup_1",
						values: [
							{
								id: "6bbfe33303c745d75b8eaceb9cd484b1",
								value: "ProductLookup_1_Value1",
								lookupId: "ProductLookup_1",
								sortOrder: 0,
								isActive: true,
								isSystem: true,
							},
							{
								id: "6yyfe33303c745d75b8eaceb9cd411b1",
								value: "ProductLookup_1_Value2",
								lookupId: "ProductLookup_1",
								sortOrder: 0,
								isActive: true,
								isSystem: true,
							},
						],
						isActive: true,
						isSystem: true,
					},
					{
						lookupName: "ProductLookup_2",
						values: [],
						isActive: true,
						isSystem: true,
					},
				],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					lookups: {
						product: {
							index: {
								ProductLookup_1: {
									lookupName: "ProductLookup_1",
									values: {
										ProductLookup_1_Value1: {
											id: "6bbfe33303c745d75b8eaceb9cd484b1",
											value: "ProductLookup_1_Value1",
											lookupId: "ProductLookup_1",
											sortOrder: 0,
											isActive: true,
											isSystem: true,
										},
										ProductLookup_1_Value2: {
											id: "6yyfe33303c745d75b8eaceb9cd411b1",
											value: "ProductLookup_1_Value2",
											lookupId: "ProductLookup_1",
											sortOrder: 0,
											isActive: true,
											isSystem: true,
										},
									},
									isActive: true,
									isSystem: true,
								},
								ProductLookup_2: {
									lookupName: "ProductLookup_2",
									values: {},
									isActive: true,
									isSystem: true,
								},
							},
							list: [],
						},
					},
				}),
			);
		});
		it("saves product definitions metadata", () => {
			const definitionsPayload = {
				name: "RetailVariantSpecifics",
				displayName: {
					"en-CA": "Retail Variant specifics",
					"en-US": "Retail Variant specifics",
				},
				productType: "Product",
				sequenceNumber: 0,
				properties: [],
				propertyGroups: [
					{
						displayOrder: 10,
						properties: [
							{
								propertyName: "ArrivalDate",
								maxMultiplicity: "1",
								isHiddenInOrchestrator: false,
								dataType: "DateTime",
								isVariantGroup: false,
								includeInAllVariantDefinition: false,
								includeInAllCategoryDefinition: false,
								isRequired: false,
								groupName: "Caracteristics",
								displayOrder: 0,
								displayName: {
									"en-CA": "Arrival Date",
									"en-US": "Arrival Date",
								},
								isFacettableAdmin: false,
								includeInAllProductDefinition: false,
								isKeyVariant: false,
								isFacettableWeb: false,
								localizable: false,
								isSystem: false,
								isVariant: false,
							},
						],
						name: "Caracteristics",
						displayName: {
							"en-CA": "Caracteristics",
							"en-US": "Caracteristics",
							"fr-CA": "Caracteristiques",
						},
						isSystem: false,
						description: "Caracteristics",
					},
				],
			};
			const oldState = Immutable.fromJS({
				definitions: {
					product: {},
				},
			});
			const action = {
				type: GET_PRODUCT_DEFINITIONS_SUCCESS,
				payload: [definitionsPayload],
			};
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and(
				"to equal",
				Immutable.fromJS({
					definitions: {
						product: {
							RetailVariantSpecifics: definitionsPayload,
						},
					},
				}),
			);
		});
	});
});

describe("profileAttributeGroups", () => {
	it("saves profileAttributeGroups metadata", () => {
		const profileAttributeGroupsPayload = {
			displayOrder: 1,
			name: "Default",
			displayName: {
				"en-US": "Default",
				"fr-CA": "Défaut",
			},
			isSystem: false,
		};
		const oldState = Immutable.fromJS({
			profileAttributeGroups: {},
		});
		const action = {
			type: GET_PROFILE_ATTRIBUTE_GROUPS_SUCCESS,
			payload: { profileAttributeGroups: [profileAttributeGroupsPayload] },
		};
		const newState = reducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				profileAttributeGroups: {
					Default: profileAttributeGroupsPayload,
				},
			}),
		);
	});
});
