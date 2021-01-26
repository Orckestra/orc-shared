import Immutable from "immutable";
import { GET_AUTHENTICATION_PROFILE_SUCCESS, SIGN_OUT_SUCCESS } from "../actions/authentication";

const initialState = Immutable.fromJS({
	upn: null,
	name: null,
	rolesClaimsValues: {},
});

const authenticationReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_AUTHENTICATION_PROFILE_SUCCESS:
			return state.withMutations(s => {
				s.set("upn", action.payload.upn);
				s.set("name", action.payload.name);
				const claims = action.payload.rolesClaimsValues;
				claims.forEach(claim => {
					const [app, scope, role] = claim.split("/");
					s.setIn(["rolesClaimsValues", app, scope, role], true);
				});
			});
		case SIGN_OUT_SUCCESS:
			window.location.assign(action.payload);
			return state;
		default:
			return state;
	}
};

export default authenticationReducer;
