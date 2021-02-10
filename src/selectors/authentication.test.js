import Immutable from "immutable";
import {
	selectCurrentUsername,
	selectRolesClaims,
	selectGroupRolesClaims,
	hasEditorPermissions,
	hasAdministratorPermissions,
} from "./authentication";

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
				}),
			],
			"to equal",
			false,
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
				}),
			],
			"to equal",
			false,
		);
	});
});

describe("hasAdministratorPermissions", () => {
	it("Retrieves true if user has administrator permissions in specified group", () => {
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
				}),
			],
			"to equal",
			false,
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
				}),
			],
			"to equal",
			false,
		);
	});
});
