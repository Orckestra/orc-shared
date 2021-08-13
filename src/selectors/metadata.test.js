import Immutable from "immutable";
import {
	namedLookupSelector,
	namedLookupValuesSelector,
	namedLookupLocalizedSelector,
	namedLookupLocalizedValuesSelector,
	lookupsListCurrentInfo,
	lookupsNextPageToLoad,
	mappedLookupListSelector,
	orderLookupsListCurrentInfo,
	orderLookupsNextPageToLoad,
	mappedOrderLookupsListSelector,
	groupedCustomAttributesDefinitionSelector,
	customAttributesDefinitionSelector,
	customProfileTypesSelector,
	productPropertyMapSelector,
	variantPropertyMapKvaSelector,
	productPropertyValueSelector,
	productPropertyValuesSelector,
	variantPropertyKeyValuesSelector,
	profileAttributeGroupsSelector,
	selectCurrentLookupDetails,
	saveOrderLookupRequestStateSelector,
	mappedDefinitionsListSelector,
	baseAttributesSelector,
} from "./metadata";
import { requestStates } from "../constants";

const orderLookups = {
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
				displayName: {
					"en-CA": "Cancel for reason 1",
					"en-US": "Cancel for reason 1",
					"fr-CA": "Annulé pour raison 1",
					"it-IT": "Annulla per motivo 1",
				},
			},
			CanceledReason2: {
				id: "6bbfe77703c745d68b8eaceb9cd484b1",
				value: "CanceledReason2",
				lookupId: "CanceledStatusReasons",
				sortOrder: 0,
				isActive: true,
				isSystem: true,
				displayName: {
					"en-CA": "Cancel for reason 2",
					"en-US": "Cancel for reason 2",
					"fr-CA": "Annulé pour raison 2",
				},
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

describe("namedLookupSelector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "fr-CA" },
			metadata: {
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
								displayName: {
									"en-CA": "Cancellation Reasons",
									"en-US": "Cancellation Reasons",
									"fr-CA": "Raison annulation",
									"it-IT": "Motivi per l'annullamento",
								},
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
			},
		});
	});

	it("gets a named lookup for a module", () =>
		expect(
			namedLookupSelector,
			"when called with",
			["order", "CanceledStatusReasons"],
			"when called with",
			[state],
			"to satisfy",
			Immutable.fromJS({
				lookupName: "CanceledStatusReasons",
				displayName: "Raison annulation",
				values: {},
				isActive: true,
				isSystem: true,
			}),
		));

	it("will get an empty Map if lookup does not exist", () =>
		expect(
			namedLookupSelector,
			"when called with",
			["order", "NotALookup"],
			"when called with",
			[state],
			"to equal",
			Immutable.Map(),
		));
});

describe("namedLookupValuesSelector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
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
										displayName: {
											"en-CA": "Cancel for reason 1",
											"en-US": "Cancel for reason 1",
											"fr-CA": "Annulé pour raison 1",
											"it-IT": "Annulla per motivo 1",
										},
									},
									CanceledReason2: {
										id: "6bbfe77703c745d68b8eaceb9cd484b1",
										value: "CanceledReason2",
										lookupId: "CanceledStatusReasons",
										sortOrder: 0,
										isActive: true,
										isSystem: true,
										displayName: {
											"en-CA": "Cancel for reason 2",
											"en-US": "Cancel for reason 2",
											"fr-CA": "Annulé pour raison 2",
											"it-IT": "Annulla per motivo 2",
										},
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
			},
		});
	});

	it("gets the value list for a named lookup", () =>
		expect(
			namedLookupValuesSelector,
			"when called with",
			["order", "CanceledStatusReasons"],
			"when called with",
			[state],
			"to satisfy",
			Immutable.fromJS({
				CanceledReason1: {
					id: "e16d07f847284775b77cfb985724cf58",
					value: "CanceledReason1",
					lookupId: "CanceledStatusReasons",
					sortOrder: 0,
					isActive: true,
					isSystem: true,
					displayName: "Annulla per motivo 1",
				},
				CanceledReason2: {
					id: "6bbfe77703c745d68b8eaceb9cd484b1",
					value: "CanceledReason2",
					lookupId: "CanceledStatusReasons",
					sortOrder: 0,
					isActive: true,
					isSystem: true,
					displayName: "Annulla per motivo 2",
				},
			}),
		));

	it("will get an empty Map if lookup does not exist", () =>
		expect(
			namedLookupValuesSelector,
			"when called with",
			["order", "NotALookup"],
			"when called with",
			[state],
			"to equal",
			Immutable.Map(),
		));

	it("retrieves localized values", () => {
		expect(
			namedLookupLocalizedSelector,
			"when called with",
			["order", "CanceledStatusReasons", "CanceledReason1"],
			"when called with",
			[state],
			"to satisfy",
			"Annulla per motivo 1",
		);
	});
});

describe("selectCurrentLookupDetails", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "fr-CA" },
			metadata: {
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
								displayName: {
									"en-CA": "Cancellation Reasons",
									"en-US": "Cancellation Reasons",
									"fr-CA": "Raison annulation",
									"it-IT": "Motivi per l'annullamento",
								},
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
			},
		});
	});

	it("gets a named lookup for a module", () =>
		expect(
			selectCurrentLookupDetails,
			"when called with",
			["order", "CanceledStatusReasons"],
			"when called with",
			[state],
			"to satisfy",
			Immutable.fromJS({
				lookupName: "CanceledStatusReasons",
				displayName: "Raison annulation",
				values: {},
				isActive: true,
				isSystem: true,
			}),
		));

	it("will get an empty Map if lookup does not exist", () =>
		expect(
			selectCurrentLookupDetails,
			"when called with",
			["order", "NotALookup"],
			"when called with",
			[state],
			"to equal",
			Immutable.Map(),
		));
});

describe("namedLookupLocalizedSelector", () => {
	let state, nullValuesState;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
				lookups: {
					order: {
						index: {
							...orderLookups,
							DistanceUOM: {
								lookupName: "DistanceUOM",
								values: {
									Inches: {
										value: "Inches",
										displayName: {
											"en-CA": "inEnCa",
											"en-US": "inEnUS",
											"fr-CA": "inFrCa",
											"it-IT": "inItIt",
										},
									},
								},
							},
						},
						list: [],
					},
				},
			},
		});

		nullValuesState = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
				lookups: {
					order: {
						CanceledStatusReasons: {
							lookupName: "CanceledStatusReasons",
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
				},
			},
		});
	});

	it("retrieves localized value", () => {
		expect(
			namedLookupLocalizedSelector,
			"when called with",
			["order", "CanceledStatusReasons", "CanceledReason1"],
			"when called with",
			[state],
			"to satisfy",
			"Annulla per motivo 1",
		);
	});

	it("retrieves correct localized value case insensitive", () => {
		expect(
			namedLookupLocalizedSelector,
			"when called with",
			["order", "DistanceUOM", "inches"],
			"when called with",
			[state],
			"to satisfy",
			"inItIt",
		);
	});

	it("retrieves default value (same as key)", () => {
		expect(
			namedLookupLocalizedSelector,
			"when called with",
			["order", "CanceledStatusReasons", "CanceledReason2"],
			"when called with",
			[state],
			"to satisfy",
			"[CanceledReason2]",
		);
	});

	it("retrieves default value using the provided value", () => {
		expect(
			namedLookupLocalizedSelector,
			"when called with",
			["order", "CanceledStatusReasons", "CanceledReason2", "TheDefaultValue"],
			"when called with",
			[state],
			"to satisfy",
			"[TheDefaultValue]",
		);
	});

	it("retrieves null if lookup does not exist", () => {
		expect(
			namedLookupLocalizedSelector,
			"when called with",
			["order", "CanceledStatusReasonsss", "CanceledReason2"],
			"when called with",
			[state],
			"to satisfy",
			"[CanceledReason2]",
		);
	});

	it("retrieves default value if values don't exist", () => {
		expect(
			namedLookupLocalizedSelector,
			"when called with",
			["order", "CanceledStatusReasons", "CanceledReason2"],
			"when called with",
			[nullValuesState],
			"to satisfy",
			"[CanceledReason2]",
		);
	});

	it("retrieves default value if wrong key", () => {
		expect(
			namedLookupLocalizedSelector,
			"when called with",
			["order", "CanceledStatusReasons", "CanceledReason22"],
			"when called with",
			[state],
			"to satisfy",
			"[CanceledReason22]",
		);
	});
});

describe("namedLookupLocalizedValuesSelector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
				lookups: {
					order: {
						index: orderLookups,
						list: [],
					},
				},
			},
		});
	});

	it("retrieves localized value", () => {
		state = state.setIn(["locale", "locale"], "fr-CA");
		return expect(
			namedLookupLocalizedValuesSelector,
			"when called with",
			["order", "CanceledStatusReasons"],
			"when called with",
			[state],
			"to satisfy",
			Immutable.fromJS({
				CanceledReason1: "Annulé pour raison 1",
				CanceledReason2: "Annulé pour raison 2",
			}),
		);
	});

	it("retrieves localized value with default value", () => {
		return expect(
			namedLookupLocalizedValuesSelector,
			"when called with",
			["order", "CanceledStatusReasons"],
			"when called with",
			[state],
			"to satisfy",
			Immutable.fromJS({
				CanceledReason1: "Annulla per motivo 1",
				CanceledReason2: "[CanceledReason2]",
			}),
		);
	});

	it("retrieves localized value for unexisting lookup", () => {
		return expect(
			namedLookupLocalizedValuesSelector,
			"when called with",
			["order", "CanceledStatusReasonssss"],
			"when called with",
			[state],
			"to satisfy",
			Immutable.fromJS({}),
		);
	});
});

describe("lookupsListCurrentInfo", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
				lookups: {
					order: {
						index: orderLookups,
						list: [],
					},
				},
			},
		});
	});

	it("retrieves first page when not defined", () => {
		return expect(lookupsListCurrentInfo, "when called with", ["order"], "when called with", [state], "to satisfy", {
			currentPage: 1,
			totalCount: 2,
		});
	});

	it("retrieves first page when defined", () => {
		state = state.setIn(["metadata", "lookups", "order", "currentPage"], 2);

		return expect(lookupsListCurrentInfo, "when called with", ["order"], "when called with", [state], "to satisfy", {
			currentPage: 2,
			totalCount: 2,
		});
	});

	describe("specific implementations", () => {
		it("order", () => {
			return expect(orderLookupsListCurrentInfo, "when called with", [state], "to satisfy", {
				currentPage: 1,
				totalCount: 2,
			});
		});
	});
});

describe("lookupsNextPageToLoad", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
				lookups: {
					order: {
						index: orderLookups,
						list: [],
					},
				},
			},
		});
	});

	it("retrieves next page to load when not defined", () => {
		return expect(
			lookupsNextPageToLoad,
			"when called with",
			["order"],
			"when called with",
			[state],
			"to satisfy",
			undefined,
		);
	});

	it("retrieves next page to load when defined", () => {
		state = state.setIn(["metadata", "lookups", "order", "nextPageToLoad"], 2);

		return expect(lookupsNextPageToLoad, "when called with", ["order"], "when called with", [state], "to satisfy", 2);
	});

	describe("specific implementations", () => {
		it("order", () => {
			return expect(orderLookupsNextPageToLoad, "when called with", [state], "to satisfy", undefined);
		});
	});
});

describe("mappedLookupListSelector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
				lookups: {
					order: {
						index: orderLookups,
						list: ["CanceledStatusReasons", "CartStatus"],
					},
				},
			},
		});
	});

	it("retrieves list with first page", () => {
		return expect(
			mappedLookupListSelector,
			"when called with",
			["order"],
			"when called with",
			[state],
			"to satisfy",
			Immutable.fromJS(
				Object.values(orderLookups).map(item => {
					item.id = item.lookupName;
					return item;
				}),
			),
		);
	});

	describe("specific implementations", () => {
		it("order with first page", () => {
			return expect(
				mappedOrderLookupsListSelector,
				"when called with",
				[state],
				"to satisfy",
				Immutable.fromJS(
					Object.values(orderLookups).map(item => {
						item.id = item.lookupName;
						return item;
					}),
				),
			);
		});
	});
});

describe("definitions", () => {
	let state;
	let customProfileAttribute1 = {
		dataType: "EntityReference",
		isRequired: false,
		name: "InnaCustom1",
		displayOrder: 0,
		isSearchable: false,
		displayName: {
			"en-CA": "attribute en-CA",
			"en-US": "attribute en-US",
			"fr-CA": "",
		},
		referenceTypeName: "CustomProfile1",
		multilingual: false,
		isBuiltIn: false,
		groupId: "Default",
		allowMultipleValues: true,
		description: "InnaCustomer",
	};
	let customProfileAttribute2 = {
		dataType: "EntityReference",
		isRequired: false,
		name: "InnaCustom2",
		displayOrder: 0,
		isSearchable: false,
		displayName: {
			"en-CA": "attribute en-CA",
			"en-US": "attribute en-UA",
			"fr-CA": "",
		},
		referenceTypeName: "CustomProfile2",
		multilingual: false,
		isBuiltIn: false,
		groupId: "CustomGroup",
		allowMultipleValues: true,
		description: "InnaCustom2",
	};

	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				defaultCulture: "en-US",
				cultures: {
					"en-US": {
						cultureIso: "en-US",
						cultureName: "English - United States",
						sortOrder: 0,
						isDefault: true,
					},
					"fr-CA": {
						cultureIso: "fr-CA",
						cultureName: "French - Canada",
						sortOrder: 0,
						isDefault: false,
					},
				},
			},
			metadata: {
				lookups: {
					product: {
						index: {
							ShirtType: {
								lookupName: "ShirtType",
								values: {
									"t-shirt": {
										id: "f193dfc56f38400b98da03660309e30f",
										value: "t-shirt",
										lookupId: "ShirtType",
										displayName: {
											"en-CA": "T-Shirt",
											"en-US": "T-Shirt",
											"fr-CA": "T-Shirt",
											"fr-FR": "T-Shirt",
										},
										sortOrder: 1,
										isActive: true,
										isSystem: false,
									},
									polo: {
										id: "44fe6739ebde4a58bdd2c778cb2fb8d7",
										value: "polo",
										lookupId: "ShirtType",
										displayName: {
											"en-CA": "Polo",
											"en-US": "Polo",
											"fr-CA": "Polo",
											"fr-FR": "Polo",
										},
										sortOrder: 2,
										isActive: true,
										isSystem: false,
									},
								},
								displayName: {
									"en-CA": "Type of shirt",
									"en-US": "Type of shirt",
									"fr-CA": "Type de shirt",
									"fr-FR": "Type de shirt",
								},
								description: "Type of shirt for men Shirts",
								isActive: false,
								isSystem: false,
							},
						},
					},
				},
				definitions: {
					customer: {
						CustomProfile1: {
							displayName: {
								"en-CA": "CustomProfile1",
								"en-US": "CustomProfile1",
								"fr-CA": "CustomProfile1",
							},
							entityTypeName: "CustomProfile1",
							isBuiltIn: false,
							isSharedEntity: true,
							attributes: [
								{
									dataType: "Text",
									isRequired: false,
									name: "Username",
									displayName: { "en-US": "User name" },
									isBuiltIn: false,
									groupId: "Default",
									allowMultipleValues: false,
								},
							],
						},
						CustomProfile2: {
							displayName: {
								"en-CA": "CustomProfile1",
								"en-US": "CustomProfile1",
								"fr-CA": "CustomProfile1",
							},
							entityTypeName: "CustomProfile2",
							isBuiltIn: false,
						},
						RecursedCustomProfile: {
							displayName: {
								"en-CA": "RecursedCustomProfile",
								"en-US": "RecursedCustomProfile",
								"fr-CA": "RecursedCustomProfile",
							},
							entityTypeName: "RecursedCustomProfile",
							isBuiltIn: false,
							attributes: [
								{
									dataType: "EntityReference",
									referenceTypeName: "RecursedCustomProfile",
									isRequired: false,
									name: "Username",
									displayName: { "en-US": "User name" },
									isBuiltIn: false,
									groupId: "Default",
									allowMultipleValues: false,
								},
							],
						},
						CUSTOMER: {
							displayName: {
								"en-CA": "Customer",
								"en-US": "Customer",
								"fr-CA": "Customer",
							},
							entityTypeName: "CUSTOMER",
							isBuiltIn: true,
							attributes: [
								{
									maximum: 256,
									dataType: "Text",
									isRequired: false,
									name: "Username",
									displayOrder: 0,
									isSearchable: true,
									displayName: {
										"ar-JO": "",
										"en-CA": "User name",
										"en-US": "User name",
										"es-ES": "",
										"fr-CA": "User name",
										"it-IT": "Nome utente",
									},
									minimum: 1,
									multilingual: false,
									isBuiltIn: true,
									groupId: "Default",
									allowMultipleValues: false,
								},
								{
									maximum: 256,
									dataType: "Text",
									isRequired: false,
									name: "Email",
									displayOrder: 0,
									isSearchable: true,
									displayName: {
										"ar-JO": "",
										"en-CA": "Email",
										"en-US": "Email",
										"es-ES": "",
										"fr-CA": "Email",
										"it-IT": "Email",
									},
									minimum: 0,
									multilingual: false,
									isBuiltIn: true,
									groupId: "Default",
									allowMultipleValues: false,
								},
								customProfileAttribute1,
								customProfileAttribute2,
								{
									maximum: 64,
									dataType: "Text",
									isRequired: false,
									name: "LastName",
									displayOrder: 0,
									isSearchable: true,
									displayName: {
										"en-CA": "Last name",
										"en-US": "Last name",
										"fr-CA": "Last name",
										"it-IT": "Cognome",
									},
									minimum: 0,
									multilingual: false,
									isBuiltIn: true,
									groupId: "Default",
									allowMultipleValues: false,
								},
								{
									maximum: 64,
									dataType: "Text",
									isRequired: false,
									name: "FirstName",
									displayOrder: 0,
									isSearchable: true,
									displayName: {
										"ar-JO": "",
										"en-CA": "First Name",
										"en-US": "First Name",
										"es-ES": "",
										"fr-CA": "First Name",
										"it-IT": "Nome",
									},
									minimum: 0,
									multilingual: false,
									isBuiltIn: true,
									groupId: "Default",
									allowMultipleValues: false,
								},
							],
							isSharedEntity: true,
						},
						PROFILEWITHRECUSREDATTRIBUTE: {
							displayName: {
								"en-CA": "PROFILEWITHRECUSREDATTRIBUTE",
								"en-US": "PROFILEWITHRECUSREDATTRIBUTE",
								"fr-CA": "PROFILEWITHRECUSREDATTRIBUTE",
							},
							entityTypeName: "PROFILEWITHRECUSREDATTRIBUTE",
							isBuiltIn: false,
							attributes: [
								{
									dataType: "EntityReference",
									isRequired: false,
									name: "Attribute",
									displayOrder: 0,
									isSearchable: false,
									displayName: {
										"en-CA": "attribute en-CA",
										"en-US": "attribute en-US",
										"fr-CA": "",
									},
									referenceTypeName: "RecursedCustomProfile",
									multilingual: false,
									isBuiltIn: false,
									groupId: "Default",
									allowMultipleValues: true,
									description: "InnaCustomer",
								},
							],
						},
					},
					product: {
						RetailWithVariant: {
							name: "RetailWithVariant",
							displayName: {
								"en-CA": "With variants",
								"en-US": "Retail with variants",
								"fr-CA": "Avec variants",
								"fr-FR": "Retail avec variant",
							},
							productType: "Product",
							sequenceNumber: 0,
							properties: [
								{
									propertyName: "Name",
									dataType: "Text",
									isRequired: true,
									groupName: "Default",
									displayName: {
										"en-CA": "New Name",
										"en-US": "New Name",
										"fr-CA": "Nom",
									},
								},
							],
							propertyGroups: [
								{
									displayOrder: 1,
									properties: [
										{
											propertyName: "LastModified",
											dataType: "DateTime",
											groupName: "Default",
											displayName: {
												"en-CA": "Modified Date",
												"en-US": "Modified Date",
												"fr-CA": "Date de Modification",
											},
										},
										{
											propertyName: "Description",
											dataType: "Text",
											groupName: "Default",
											displayName: {
												"en-CA": "Description",
												"en-US": "Description",
												"fr-CA": "Description",
											},
										},
									],
								},
							],
							variantProperties: [
								{
									propertyName: "DisplayName",
									dataType: "Text",
									groupName: "Default",
									displayName: {
										"en-CA": "Name",
										"en-US": "Name",
										"fr-CA": "Nom",
									},
									isKeyVariant: true,
								},
								{
									propertyName: "Active",
									dataType: "Boolean",
									groupName: "Default",
									displayName: {
										"en-CA": "Active",
										"en-US": "Active",
										"fr-CA": "Actif",
									},
									isKeyVariant: false,
								},
								{
									propertyName: "ShirtType",
									dataType: "Lookup",
									groupName: "GeneralTagsProperties",
									lookupDefinition: {
										allowMultipleSelection: false,
										lookupName: "ShirtType",
									},
									displayName: {
										"en-CA": "Type of shirt",
										"en-US": "Type of shirt",
										"fr-CA": "Type de shirt",
									},
									isKeyVariant: true,
								},
							],
							allowPriceLists: true,
						},
					},
				},
				profileAttributeGroups: {
					Default: {
						displayOrder: 1,
						name: "Default",
						displayName: {
							"en-US": "Default en-US",
							"en-CA": "Default en-CA",
							"fr-CA": "Default fr-CA",
						},
					},
					CustomGroup: {
						displayOrder: 2,
						name: "CustomGroup",
						displayName: {
							"en-US": "CustomGroup en-US",
							"en-CA": "CustomGroup en-CA",
							"fr-CA": "CustomGroup fr-CA",
						},
					},
				},
			},
		});
	});

	it("will get null if profileAttributeGroups are not found in metadata", () => {
		const newState = Immutable.fromJS({
			locale: {},
			metadata: {
				profileAttributeGroups: {},
			},
		});
		expect(profileAttributeGroupsSelector, "when called with", [newState], "to satisfy", null);
	});

	it("will return correct customer profile definition", () => {
		const expected = Immutable.fromJS({
			CustomProfile1: {
				entityTypeName: "CustomProfile1",
				isBuiltIn: false,
				isSharedEntity: true,
				displayName: "CustomProfile1",
				type: "Shared",
			},
			CustomProfile2: {
				entityTypeName: "CustomProfile2",
				isBuiltIn: false,
				displayName: "CustomProfile1",
				type: "Embedded",
			},
			RecursedCustomProfile: {
				entityTypeName: "RecursedCustomProfile",
				isBuiltIn: false,
				displayName: "RecursedCustomProfile",
				type: "Embedded",
			},
			CUSTOMER: {
				entityTypeName: "CUSTOMER",
				isBuiltIn: true,
				isSharedEntity: true,
				displayName: "Customer",
				type: "Shared",
			},
			PROFILEWITHRECUSREDATTRIBUTE: {
				entityTypeName: "PROFILEWITHRECUSREDATTRIBUTE",
				isBuiltIn: false,
				displayName: "PROFILEWITHRECUSREDATTRIBUTE",
				type: "Embedded",
			},
		});
		expect(
			mappedDefinitionsListSelector,
			"when called with",
			["customer"],
			"when called with",
			[state],
			"to satisfy",
			expected,
		);
	});

	it("will get an empty List if definitios do not exist", () =>
		expect(
			groupedCustomAttributesDefinitionSelector,
			"when called with",
			["customer", "SOMENOTEXISTENTENTITY"],
			"when called with",
			[state],
			"to satisfy",
			{},
		));

	it("will return correct custom profile attributes definition", () => {
		const expectedGroup1 = customProfileAttribute1.groupId;
		const expectedGroup2 = customProfileAttribute2.groupId;
		const expectedItem1 = {
			...customProfileAttribute1,
			...{ displayName: customProfileAttribute1.displayName["en-US"] },
		};
		const expectedItem2 = {
			...customProfileAttribute2,
			...{ displayName: customProfileAttribute2.displayName["en-US"] },
		};

		const expected = Immutable.fromJS({
			[expectedGroup1]: {
				id: expectedGroup1,
				name: "Default en-US",
				baseAttributes: [],
				profileAttributes: [expectedItem1],
			},
			[expectedGroup2]: {
				id: expectedGroup2,
				name: "CustomGroup en-US",
				baseAttributes: [],
				profileAttributes: [expectedItem2],
			},
		});

		expect(
			groupedCustomAttributesDefinitionSelector,
			"when called with",
			["customer", "CUSTOMER"],
			"when called with",
			[state],
			"to satisfy",
			expected,
		);
	});

	it("will return correct customer attributes", () => {
		const expected = Immutable.fromJS([
			{
				maximum: 256,
				dataType: "Text",
				isRequired: false,
				name: "Username",
				displayOrder: 0,
				isSearchable: true,
				displayName: "User name",
				minimum: 1,
				multilingual: false,
				isBuiltIn: true,
				groupId: "Default",
				allowMultipleValues: false,
			},
			{
				maximum: 256,
				dataType: "Text",
				isRequired: false,
				name: "Email",
				displayOrder: 0,
				isSearchable: true,
				displayName: "Email",
				minimum: 0,
				multilingual: false,
				isBuiltIn: true,
				groupId: "Default",
				allowMultipleValues: false,
			},
			{
				maximum: 64,
				dataType: "Text",
				isRequired: false,
				name: "LastName",
				displayOrder: 0,
				isSearchable: true,
				displayName: "Last name",
				minimum: 0,
				multilingual: false,
				isBuiltIn: true,
				groupId: "Default",
				allowMultipleValues: false,
			},
			{
				maximum: 64,
				dataType: "Text",
				isRequired: false,
				name: "FirstName",
				displayOrder: 0,
				isSearchable: true,
				displayName: "First Name",
				minimum: 0,
				multilingual: false,
				isBuiltIn: true,
				groupId: "Default",
				allowMultipleValues: false,
			},
		]);
		expect(
			baseAttributesSelector,
			"when called with",
			["customer", "CUSTOMER"],
			"when called with",
			[state],
			"to satisfy",
			expected,
		);
	});

	it("will return correct customer attributes definition", () => {
		const expected = Immutable.fromJS({
			displayName: "Customer",
			entityTypeName: "CUSTOMER",
			isBuiltIn: true,
			baseAttributes: [],
			profileAttributes: [
				{
					dataType: "EntityReference",
					isRequired: false,
					name: "InnaCustom1",
					displayOrder: 0,
					isSearchable: false,
					displayName: "attribute en-US",
					referenceTypeName: "CustomProfile1",
					multilingual: false,
					isBuiltIn: false,
					groupId: "Default",
					allowMultipleValues: true,
					description: "InnaCustomer",
				},
				{
					dataType: "EntityReference",
					isRequired: false,
					name: "InnaCustom2",
					displayOrder: 0,
					isSearchable: false,
					displayName: "attribute en-UA",
					referenceTypeName: "CustomProfile2",
					multilingual: false,
					isBuiltIn: false,
					groupId: "CustomGroup",
					allowMultipleValues: true,
					description: "InnaCustom2",
				},
			],
			isSharedEntity: true,
		});
		expect(
			customAttributesDefinitionSelector,
			"when called with",
			["customer", "CUSTOMER"],
			"when called with",
			[state],
			"to satisfy",
			expected,
		);
	});

	it("will return correct customer attributes definition when profileEntityName not found", () => {
		const expected = Immutable.fromJS({
			baseAttributes: [],
			profileAttributes: [],
		});
		expect(
			customAttributesDefinitionSelector,
			"when called with",
			["customer", "CUSTOMERUNKNOWN"],
			"when called with",
			[state],
			"to satisfy",
			expected,
		);
	});

	it("will return customer definitions with profile type", () => {
		const expected = Immutable.fromJS({
			CustomProfile1: {
				displayName: {
					"en-CA": "CustomProfile1",
					"en-US": "CustomProfile1",
					"fr-CA": "CustomProfile1",
				},
				entityTypeName: "CustomProfile1",
				isBuiltIn: false,
				isSharedEntity: true,
				attributes: [
					{
						dataType: "Text",
						isRequired: false,
						name: "Username",
						displayName: { "en-US": "User name" },
						isBuiltIn: false,
						groupId: "Default",
						allowMultipleValues: false,
					},
				],
			},
		});
		expect(customProfileTypesSelector, "when called with", [], "when called with", [state], "to satisfy", expected);
	});

	it("will return product property map", () => {
		const expected = {
			name: {
				propertyName: "Name",
				dataType: "Text",
				isRequired: true,
				groupName: "Default",
				displayName: {
					"en-CA": "New Name",
					"en-US": "New Name",
					"fr-CA": "Nom",
				},
			},
			lastModified: {
				propertyName: "LastModified",
				dataType: "DateTime",
				groupName: "Default",
				displayName: {
					"en-CA": "Modified Date",
					"en-US": "Modified Date",
					"fr-CA": "Date de Modification",
				},
			},
			description: {
				propertyName: "Description",
				dataType: "Text",
				groupName: "Default",
				displayName: {
					"en-CA": "Description",
					"en-US": "Description",
					"fr-CA": "Description",
				},
			},
			displayName: {
				propertyName: "DisplayName",
				dataType: "Text",
				groupName: "Default",
				displayName: {
					"en-CA": "Name",
					"en-US": "Name",
					"fr-CA": "Nom",
				},
				isKeyVariant: true,
			},
			active: {
				propertyName: "Active",
				dataType: "Boolean",
				groupName: "Default",
				displayName: {
					"en-CA": "Active",
					"en-US": "Active",
					"fr-CA": "Actif",
				},
				isKeyVariant: false,
			},
			shirtType: {
				propertyName: "ShirtType",
				dataType: "Lookup",
				groupName: "GeneralTagsProperties",
				lookupDefinition: {
					allowMultipleSelection: false,
					lookupName: "ShirtType",
				},
				displayName: {
					"en-CA": "Type of shirt",
					"en-US": "Type of shirt",
					"fr-CA": "Type de shirt",
				},
				isKeyVariant: true,
			},
		};
		expect(
			productPropertyMapSelector,
			"when called with",
			["RetailWithVariant"],
			"when called with",
			[state],
			"to satisfy",
			expected,
		);
	});

	it("will return variant kva property map", () => {
		const expected = {
			displayName: {
				propertyName: "DisplayName",
				dataType: "Text",
				groupName: "Default",
				displayName: {
					"en-CA": "Name",
					"en-US": "Name",
					"fr-CA": "Nom",
				},
				isKeyVariant: true,
			},
			shirtType: {
				propertyName: "ShirtType",
				dataType: "Lookup",
				groupName: "GeneralTagsProperties",
				lookupDefinition: {
					allowMultipleSelection: false,
					lookupName: "ShirtType",
				},
				displayName: {
					"en-CA": "Type of shirt",
					"en-US": "Type of shirt",
					"fr-CA": "Type de shirt",
				},
				isKeyVariant: true,
			},
		};
		expect(
			variantPropertyMapKvaSelector,
			"when called with",
			["RetailWithVariant"],
			"when called with",
			[state],
			"to satisfy",
			expected,
		);
	});

	it("will return product property value", () => {
		expect(
			productPropertyValueSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }, "Active", "ActiveNew"],
			"when called with",
			[state],
			"to satisfy",
			"ActiveNew",
		);
	});

	it("will return product property value with property of Lookup type if lookup existed ", () => {
		expect(
			productPropertyValueSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }, "ShirtType", "polo"],
			"when called with",
			[state],
			"to satisfy",
			"Polo",
		);
	});

	it("will return product property value if property name is not existing", () => {
		expect(
			productPropertyValueSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }, "ActiveUndefined", "ActiveNew"],
			"when called with",
			[state],
			"to satisfy",
			"ActiveNew",
		);
	});

	it("will return null in productPropertyValueSelector if property bag is not passed", () => {
		expect(
			productPropertyValuesSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }],
			"when called with",
			[state],
			"to satisfy",
			null,
		);
	});

	it("will return null in productPropertyValueSelector if property bag passed", () => {
		const propBag = {
			ShirtType: "polo",
		};
		const expectedPropBag = {
			ShirtType: "Polo",
		};
		expect(
			productPropertyValuesSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }, propBag],
			"when called with",
			[state],
			"to satisfy",
			expectedPropBag,
		);
	});

	it("will return null in variantPropertyKeyValuesSelector if property bag is not passed", () => {
		expect(
			variantPropertyKeyValuesSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }],
			"when called with",
			[state],
			"to satisfy",
			null,
		);
	});

	it("will return null in variantPropertyKeyValuesSelector if property bag is passed", () => {
		const propBag = {
			ShirtType: "polo",
		};
		const expectedPropBag = {
			ShirtType: "Polo",
		};
		expect(
			variantPropertyKeyValuesSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }, propBag],
			"when called with",
			[state],
			"to satisfy",
			expectedPropBag,
		);
	});

	it("will return modified property bag in variantPropertyKeyValuesSelector if property bag is passed", () => {
		const propBag = {
			ShirtType: "polo",
		};
		const expectedPropBag = {
			ShirtType: "Polo",
		};
		expect(
			variantPropertyKeyValuesSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }, propBag],
			"when called with",
			[state],
			"to satisfy",
			expectedPropBag,
		);
	});

	it("will return not modified property bag in variantPropertyKeyValuesSelector if property is not found ", () => {
		const propBag = {
			ShirtType2: "polo",
			testProp: "Test",
		};
		expect(
			variantPropertyKeyValuesSelector,
			"when called with",
			[{ definitionName: "RetailWithVariant" }, propBag],
			"when called with",
			[state],
			"to satisfy",
			{},
		);
	});
});

describe("saveOrderLookupRequestStateSelector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: { locale: "it-IT" },
			metadata: {
				lookups: {
					order: {
						index: orderLookups,
						list: [],
					},
					saveOrderLookupRequestState: requestStates.success,
					saveOrderLookupResponse: { something: 123 },
				},
			},
		});
	});

	it("retrieves the state of the save order lookup", () => {
		return expect(saveOrderLookupRequestStateSelector, "when called with", [state], "to satisfy", {
			requestState: requestStates.success,
			response: { something: 123 },
		});
	});

	it("retrieves the state of the save order lookup without any response", () => {
		state = state.removeIn(["metadata", "lookups", "saveOrderLookupResponse"]);

		return expect(saveOrderLookupRequestStateSelector, "when called with", [state], "to satisfy", {
			requestState: requestStates.success,
			response: null,
		});
	});
});
