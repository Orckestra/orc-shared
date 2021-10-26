import { createSelector } from "reselect";
import { platformRoles } from "./../constants";
import { getCurrentScope } from "./navigation";

const authData = state => state.get("authentication");

export const selectCurrentUsername = createSelector(authData, data => data.get("name"));

export const selectRolesClaims = createSelector(authData, data => data.get("rolesClaimsValues"));

export const selectGroupRolesClaims = roleGroup =>
	createSelector(selectRolesClaims, rolesClaims => rolesClaims.get(roleGroup) || null);

export const hasEditorPermissions = roleGroup =>
	createSelector(selectGroupRolesClaims(roleGroup), getCurrentScope, (appRolesClaims, currentScope) => {
		if (appRolesClaims != null) {
			return (
				!!appRolesClaims.getIn(["*", platformRoles.Editor]) ||
				!!appRolesClaims.getIn([currentScope, platformRoles.Editor])
			);
		}
		return false;
	});

export const hasAdministratorPermissions = roleGroup =>
	createSelector(selectGroupRolesClaims(roleGroup), getCurrentScope, (appRolesClaims, currentScope) => {
		if (appRolesClaims != null) {
			return (
				!!appRolesClaims.getIn(["*", platformRoles.Administrator]) ||
				!!appRolesClaims.getIn([currentScope, platformRoles.Administrator])
			);
		}
		return false;
	});

export const hasReaderPermissions = roleGroup =>
	createSelector(selectGroupRolesClaims(roleGroup), getCurrentScope, (appRolesClaims, currentScope) => {
		if (appRolesClaims != null) {
			return (
				!!appRolesClaims.getIn(["*", platformRoles.Reader]) ||
				!!appRolesClaims.getIn([currentScope, platformRoles.Reader])
			);
		}
		return false;
	});
