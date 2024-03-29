import Immutable from "immutable";
import {
	selectCurrentUsername,
	selectRolesClaims,
	selectGroupRolesClaims,
	hasEditorPermissions,
	hasPermissionsForRole,
	hasAdministratorPermissions,
	hasReaderPermissions,
	hasEditorPermissionsForScope,
	hasPermissionsForRoleAndScope,
	hasAdministratorPermissionsForScope,
	hasReaderPermissionsForScope,
} from "./authentication";

const state = {
	navigation: {
		route: { location: {}, match: { params: { scope: "Global" } } },
	},
	settings: { defaultScope: "Global" },
	locale: {
		locale: "fr",
		supportedLocales: ["en", "fr"],
	},
	scopes: {
		Global: {
			name: { en: "Global", fr: "Global" },
			id: "Global",
			children: ["MyScope"],
			currency: {
				displayName: {
					en: "Euro",
					fr: "Euro",
				},
			},
			defaultCulture: "en-US",
		},
		MyScope: {
			name: { en: "First child", fr: "Premier fils" },
			id: "FirstChild",
			children: ["ChildScope"],
			parentScopeId: "Global",
		},
		ChildScope: {
			name: { en: "First grandchild", fr: "Premier petit-fils" },
			id: "FirstGrandchild",
			parentScopeId: "MyScope",
		},
	},
};

describe("selectCurrentUsername", () => {
	it("Gets the logged in username", () =>
		expect(
			selectCurrentUsername,
			"called with",
			[
				Immutable.fromJS({
					authentication: { name: "alfred@example.com" },
				}),
			],
			"to equal",
			"alfred@example.com",
		));
});

describe("selectRolesClaims", () => {
	it("Retrieves rolesClaimsValues correctly", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Administrator: false,
					Editor: false,
				},
			},
		});

		expect(
			selectRolesClaims,
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
				}),
			],
			"to equal",
			claims,
		);
	});
});

describe("selectGroupRolesClaims", () => {
	it("Retrieves group claims if correctly", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Editor: false,
				},
			},
		});

		const expected = Immutable.fromJS({
			"*": {
				Editor: false,
			},
		});

		expect(
			selectGroupRolesClaims,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
				}),
			],
			"to equal",
			expected,
		);
	});

	it("Retrieves null if no roles claims in store", () => {
		expect(
			selectGroupRolesClaims,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
				}),
			],
			"to equal",
			null,
		);
	});
});

describe("hasEditorPermissions", () => {
	it("Retrieves true if user has editor permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Editor: true,
				},
			},
		});

		expect(
			hasEditorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if user has not editor permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Editor: false,
				},
			},
		});

		expect(
			hasEditorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
				}),
			],
			"to equal",
			false,
		);
	});

	it("Retrieves true if user hasn't global editor permissions but, has in current scope in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Editor: false,
				},
				MyScope: {
					Editor: true,
				},
			},
		});

		expect(
			hasEditorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has editor permissions just in specified scope", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Editor: true,
				},
			},
		});

		expect(
			hasEditorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has editor permissions just in specified scope with permission on parents", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Editor: true,
				},
			},
		});

		expect(
			hasEditorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
					navigation: {
						route: { location: {}, match: { params: { scope: "ChildScope" } } },
					},
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if app roles claims are null", () => {
		expect(
			hasEditorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			false,
		);
	});
});

describe("hasEditorPermissionsForScope", () => {
	it("Retrieves true if user has editor permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Editor: true,
				},
			},
		});

		expect(
			hasEditorPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if user has not editor permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Editor: false,
				},
			},
		});

		expect(
			hasEditorPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
				}),
			],
			"to equal",
			false,
		);
	});

	it("Retrieves true if user hasn't global editor permissions but, has in current scope in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Editor: false,
				},
				MyScope: {
					Editor: true,
				},
			},
		});

		expect(
			hasEditorPermissionsForScope,
			"when called with",
			["MyScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has editor permissions just in specified scope", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Editor: true,
				},
			},
		});

		expect(
			hasEditorPermissionsForScope,
			"when called with",
			["MyScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has editor permissions just in specified scope with permission on parents", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Editor: true,
				},
			},
		});

		expect(
			hasEditorPermissionsForScope,
			"when called with",
			["ChildScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
					navigation: {
						route: { location: {}, match: { params: { scope: "ChildScope" } } },
					},
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if app roles claims are null", () => {
		expect(
			hasEditorPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			false,
		);
	});
});

describe("hasPermissionsForRole", () => {
	it("Retrieves true if user has permissions in specified group and role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Tester: true,
				},
			},
		});

		expect(
			hasPermissionsForRole,
			"when called with",
			["Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if user does not have permissions in specified group and role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Tester: false,
				},
			},
		});

		expect(
			hasPermissionsForRole,
			"when called with",
			["Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
				}),
			],
			"to equal",
			false,
		);
	});

	it("Retrieves true if user hasn't global permissions but, has in current scope in specified group for role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Tester: false,
				},
				MyScope: {
					Tester: true,
				},
			},
		});

		expect(
			hasPermissionsForRole,
			"when called with",
			["Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has permissions just in specified scope for role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Tester: true,
				},
			},
		});

		expect(
			hasPermissionsForRole,
			"when called with",
			["Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has permissions just in specified scope with permission on parents for role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Tester: true,
				},
			},
		});

		expect(
			hasPermissionsForRole,
			"when called with",
			["Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
					navigation: {
						route: { location: {}, match: { params: { scope: "ChildScope" } } },
					},
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if app roles claims are null", () => {
		expect(
			hasPermissionsForRole,
			"when called with",
			["Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			false,
		);
	});
});

describe("hasPermissionsForRoleAndScope", () => {
	it("Retrieves true if user has permissions in specified group for role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Tester: true,
				},
			},
		});

		expect(
			hasPermissionsForRoleAndScope,
			"when called with",
			["Global", "Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if user does not have permissions in specified group for role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Tester: false,
				},
			},
		});

		expect(
			hasPermissionsForRoleAndScope,
			"when called with",
			["Global", "Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
				}),
			],
			"to equal",
			false,
		);
	});

	it("Retrieves true if user hasn't global permissions but, has in current scope in specified group for role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Tester: false,
				},
				MyScope: {
					Tester: true,
				},
			},
		});

		expect(
			hasPermissionsForRoleAndScope,
			"when called with",
			["MyScope", "Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has permissions just in specified scope and role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Tester: true,
				},
			},
		});

		expect(
			hasPermissionsForRoleAndScope,
			"when called with",
			["MyScope", "Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has permissions just in specified scope with permission on parents for role", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Tester: true,
				},
			},
		});

		expect(
			hasPermissionsForRoleAndScope,
			"when called with",
			["ChildScope", "Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
					navigation: {
						route: { location: {}, match: { params: { scope: "ChildScope" } } },
					},
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if app roles claims are null", () => {
		expect(
			hasPermissionsForRoleAndScope,
			"when called with",
			["Global", "Orders", "Tester"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			false,
		);
	});
});

describe("hasAdministratorPermissions", () => {
	it("Retrieves true if user has global administrator permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Administrator: true,
				},
			},
		});

		expect(
			hasAdministratorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if user has not global administrator permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Administrator: false,
				},
			},
		});

		expect(
			hasAdministratorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
				}),
			],
			"to equal",
			false,
		);
	});

	it("Retrieves true if user hasn't global administrator permissions but, has in current scope in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Administrator: false,
				},
				MyScope: {
					Administrator: true,
				},
			},
		});

		expect(
			hasAdministratorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has administrator permissions just in specified scope", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Administrator: true,
				},
			},
		});

		expect(
			hasAdministratorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has administrator permissions just in specified scope with permission on parents", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Administrator: true,
				},
			},
		});

		expect(
			hasAdministratorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
					navigation: {
						route: { location: {}, match: { params: { scope: "ChildScope" } } },
					},
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if app roles claims are null", () => {
		expect(
			hasAdministratorPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			false,
		);
	});
});

describe("hasAdministratorPermissionsForScope", () => {
	it("Retrieves true if user has administrator permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Administrator: true,
				},
			},
		});

		expect(
			hasAdministratorPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if user has not administrator permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Administrator: false,
				},
			},
		});

		expect(
			hasAdministratorPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
				}),
			],
			"to equal",
			false,
		);
	});

	it("Retrieves true if user hasn't global administrator permissions but, has in current scope in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Administrator: false,
				},
				MyScope: {
					Administrator: true,
				},
			},
		});

		expect(
			hasAdministratorPermissionsForScope,
			"when called with",
			["MyScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has administrator permissions just in specified scope", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Administrator: true,
				},
			},
		});

		expect(
			hasAdministratorPermissionsForScope,
			"when called with",
			["MyScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has administrator permissions just in specified scope with permission on parents", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Administrator: true,
				},
			},
		});

		expect(
			hasAdministratorPermissionsForScope,
			"when called with",
			["ChildScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
					navigation: {
						route: { location: {}, match: { params: { scope: "ChildScope" } } },
					},
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if app roles claims are null", () => {
		expect(
			hasAdministratorPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			false,
		);
	});
});

describe("hasReaderPermissions", () => {
	it("Retrieves true if user has reader permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Reader: true,
				},
			},
		});

		expect(
			hasReaderPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if user has not reader permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Reader: false,
				},
			},
		});

		expect(
			hasReaderPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
				}),
			],
			"to equal",
			false,
		);
	});

	it("Retrieves true if user hasn't global editor permissions but, has in current scope in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Reader: false,
				},
				MyScope: {
					Reader: true,
				},
			},
		});

		expect(
			hasReaderPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has reader permissions just in specified scope", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Reader: true,
				},
			},
		});

		expect(
			hasReaderPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has reader permissions just in specified scope with permission on parents", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Reader: true,
				},
			},
		});

		expect(
			hasReaderPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
					navigation: {
						route: { location: {}, match: { params: { scope: "ChildScope" } } },
					},
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if app roles claims are null", () => {
		expect(
			hasReaderPermissions,
			"when called with",
			["Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			false,
		);
	});
});

describe("hasReaderPermissionsForScope", () => {
	it("Retrieves true if user has administrator permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Reader: true,
				},
			},
		});

		expect(
			hasReaderPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if user has not administrator permissions in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Reader: false,
				},
			},
		});

		expect(
			hasReaderPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
				}),
			],
			"to equal",
			false,
		);
	});

	it("Retrieves true if user hasn't global administrator permissions but, has in current scope in specified group", () => {
		const claims = Immutable.fromJS({
			Orders: {
				"*": {
					Reader: false,
				},
				MyScope: {
					Reader: true,
				},
			},
		});

		expect(
			hasReaderPermissionsForScope,
			"when called with",
			["MyScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has administrator permissions just in specified scope", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Reader: true,
				},
			},
		});

		expect(
			hasReaderPermissionsForScope,
			"when called with",
			["MyScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					navigation: {
						route: { location: {}, match: { params: { scope: "MyScope" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves true if user has administrator permissions just in specified scope with permission on parents", () => {
		const claims = Immutable.fromJS({
			Orders: {
				MyScope: {
					Reader: true,
				},
			},
		});

		expect(
			hasReaderPermissionsForScope,
			"when called with",
			["ChildScope", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: claims },
					...state,
					navigation: {
						route: { location: {}, match: { params: { scope: "ChildScope" } } },
					},
				}),
			],
			"to equal",
			true,
		);
	});

	it("Retrieves false if app roles claims are null", () => {
		expect(
			hasReaderPermissionsForScope,
			"when called with",
			["Global", "Orders"],
			"called with",
			[
				Immutable.fromJS({
					authentication: { rolesClaimsValues: {} },
					navigation: {
						route: { location: {}, match: { params: { scope: "Global" } } },
					},
					settings: { defaultScope: "Global" },
				}),
			],
			"to equal",
			false,
		);
	});
});
