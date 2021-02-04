import { createSelector } from "reselect";
import { platformRoles } from "./../constants";

const authData = state => state.get("authentication");

export const selectCurrentUsername = createSelector(authData, data => data.get("name"));

export const selectRolesClaims = createSelector(authData, data => data.get("rolesClaimsValues"));

export const selectGroupRolesClaims = roleGroup =>
	createSelector(selectRolesClaims, rolesClaims => rolesClaims.get(roleGroup) || null);

export const hasEditorPermissions = roleGroup =>
	createSelector(selectGroupRolesClaims(roleGroup), appRolesClaims => {
		if (appRolesClaims != null) {
			return appRolesClaims.getIn(["*", platformRoles.Editor]);
		}
		return false;
	});

export const hasAdministratorPermissions = roleGroup =>
	createSelector(selectGroupRolesClaims(roleGroup), appRolesClaims => {
		if (appRolesClaims != null) {
			return appRolesClaims.getIn(["*", platformRoles.Administrator]);
		}
		return false;
	});
