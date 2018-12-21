import { connect } from "react-redux";
import { push } from "redux-little-router";
import { unwrapImmutable } from "../../utils";
import { getCurrentScope } from "../../selectors/route";
import { removeTab } from "../../actions/navigation";
import {
	selectCurrentModuleName,
	selectMappedCurrentModuleList,
	selectSegmentHrefMapper,
} from "../../selectors/navigation";

const withNavigationData = connect(
	(state, { modules }) => {
		const hrefMapper = selectSegmentHrefMapper(state);
		const currentHref = window.location.pathname;
		const moduleName = selectCurrentModuleName(state);
		const moduleData = modules[moduleName] /* istanbul ignore next */ || {};
		const moduleHref = "/" + getCurrentScope(state) + "/" + moduleName;
		const mappedHref = hrefMapper(moduleHref);
		const module = {
			icon: moduleData.icon,
			label: moduleData.label,
			href: mappedHref,
		};
		const pages = unwrapImmutable(selectMappedCurrentModuleList(state));
		return {
			pages: [module, ...pages].map(page => {
				const href = hrefMapper(page.href);
				let label = page.label;
				if (label && label.id) {
					const dataObject =
						page.dataPath && unwrapImmutable(state.getIn(page.dataPath));
					label.values = { ...dataObject, ...label.values };
				}
				return {
					...page,
					label,
					href,
					active: href === currentHref,
				};
			}),
			moduleName,
			moduleHref: mappedHref,
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
