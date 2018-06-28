import { connect } from "react-redux";
import { push } from "redux-little-router";
import { unwrapImmutable } from "../../utils";
import { getCurrentScope } from "../../selectors/route";
import { removeTab } from "../../actions/navigation";
import {
	selectCurrentModuleName,
	selectMappedCurrentModuleList,
} from "../../selectors/navigation";

const withNavigationData = connect(
	(state, { modules }) => {
		const currentHref = window.location.pathname;
		const moduleName = selectCurrentModuleName(state);
		const moduleData = modules[moduleName] /* istanbul ignore next */ || {};
		const moduleHref = "/" + getCurrentScope(state) + "/" + moduleName;
		const module = {
			icon: moduleData.icon,
			label: moduleData.label,
			href: moduleHref,
		};
		const pages = unwrapImmutable(selectMappedCurrentModuleList(state));
		return {
			pages: [module, ...pages].map(page => ({
				...page,
				active: page.href === currentHref,
			})),
			moduleName,
			moduleHref,
		};
	},
	dispatch => ({
		close: (module, moduleHref) => path => event => {
			dispatch(removeTab(module, path));
			if (window.location.pathname === path) {
				dispatch(push(moduleHref));
			}
			event.stopPropagation();
			event.preventDefault();
		},
	}),
);

export default withNavigationData;
