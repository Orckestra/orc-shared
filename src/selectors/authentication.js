import { createSelector } from "reselect";
import { platformRoles } from "./../constants";
import { getCurrentScope } from "./navigation";
import { getScopesSelector } from "./scope";

const authData = state => state.get("authentication");

export const selectCurrentUsername = createSelector(authData, data => data.get("name"));

export const selectRolesClaims = createSelector(authData, data => data.get("rolesClaimsValues"));

export const selectGroupRolesClaims = roleGroup =>
	createSelector(selectRolesClaims, rolesClaims => rolesClaims.get(roleGroup) || null);

const hasRolePermissions = (appRolesClaims, scopeId, role, scopes) => {
	if (appRolesClaims != null && scopeId != null) {
		const allowed = !!appRolesClaims.getIn(["*", role]) || !!appRolesClaims.getIn([scopeId, role]);

		if (!allowed) {
			const parentScopeId = scopes.get(scopeId)?.toJS()?.parentScopeId ?? null;

			return hasRolePermissions(appRolesClaims, parentScopeId, role, scopes);
		}

		return allowed;
	}

	return false;
};

export const hasEditorPermissions = roleGroup =>
	createSelector(
		selectGroupRolesClaims(roleGroup),
		getCurrentScope,
		getScopesSelector,
		(appRolesClaims, currentScope, scopes) =>
			hasRolePermissions(appRolesClaims, currentScope, platformRoles.Editor, scopes),
	);

export const hasEditorPermissionsForScope = (scope, roleGroup) =>
	createSelector(selectGroupRolesClaims(roleGroup), getScopesSelector, (appRolesClaims, scopes) =>
		hasRolePermissions(appRolesClaims, scope, platformRoles.Editor, scopes),
	);

export const hasRecipientPermissions = roleGroup =>
	createSelector(
		selectGroupRolesClaims(roleGroup),
		getCurrentScope,
		getScopesSelector,
		(appRolesClaims, currentScope, scopes) =>
			hasRolePermissions(appRolesClaims, currentScope, platformRoles.Recipient, scopes),
	);

export const hasRecipientPermissionsForScope = (scope, roleGroup) =>
	createSelector(selectGroupRolesClaims(roleGroup), getScopesSelector, (appRolesClaims, scopes) =>
		hasRolePermissions(appRolesClaims, scope, platformRoles.Recipient, scopes),
	);

export const hasAdministratorPermissions = roleGroup =>
	createSelector(
		selectGroupRolesClaims(roleGroup),
		getCurrentScope,
		getScopesSelector,
		(appRolesClaims, currentScope, scopes) =>
			hasRolePermissions(appRolesClaims, currentScope, platformRoles.Administrator, scopes),
	);

export const hasAdministratorPermissionsForScope = (scope, roleGroup) =>
	createSelector(selectGroupRolesClaims(roleGroup), getScopesSelector, (appRolesClaims, scopes) =>
		hasRolePermissions(appRolesClaims, scope, platformRoles.Administrator, scopes),
	);

export const hasReaderPermissions = roleGroup =>
	createSelector(
		selectGroupRolesClaims(roleGroup),
		getCurrentScope,
		getScopesSelector,
		(appRolesClaims, currentScope, scopes) =>
			hasRolePermissions(appRolesClaims, currentScope, platformRoles.Reader, scopes),
	);

export const hasReaderPermissionsForScope = (scope, roleGroup) =>
	createSelector(selectGroupRolesClaims(roleGroup), getScopesSelector, (appRolesClaims, scopes) =>
		hasRolePermissions(appRolesClaims, scope, platformRoles.Reader, scopes),
	);
