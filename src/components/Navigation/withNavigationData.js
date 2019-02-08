import { push } from "connected-react-router";
import { unwrapImmutable } from "../../utils";
import { removeTab } from "../../actions/navigation";
import routingConnector from "../../hocs/routingConnector";
import {
	selectRouteHref,
	selectRouteParams,
	selectCurrentModuleName,
	selectMappedCurrentModuleList,
	selectSegmentHrefMapper,
	getCurrentScope,
} from "../../selectors/navigation";

const getPageWithSplitPath = ([pathStep, ...restPath], params, pages) => {
	let page = pages[pathStep];
	if (!page) {
		const paramPath =
			Object.keys(pages).filter(path => /^\/:/.test(path))[0] || ""; // Only one should exist
		if (pathStep === "/" + params[paramPath.replace("/:", "")]) {
			page = pages[paramPath];
		}
	}
	if (restPath.length === 0) {
		return page;
	} else {
		getPageWithSplitPath(restPath, params, {
			...page.pages,
			...page.segments,
			...page.subpages,
		});
	}
};

const getPageData = (path, params, module) => {
	if (!path) return module;
	const pathSteps = path.split(/(?=\/)/);
	return getPageWithSplitPath(pathSteps, params, {
		...module.pages,
		...module.segments,
		...module.subpages,
	});
};

const withNavigationData = routingConnector(
	(state, { modules }) => {
		const params = unwrapImmutable(selectRouteParams(state));
		const hrefMapper = selectSegmentHrefMapper(state);
		const currentHref = selectRouteHref(state);
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
			pages: [module, ...pages].map(page => {
				const pageData =
					getPageData(page.href.replace(moduleHref, ""), params, moduleData) ||
					{};
				let label = pageData.label;
				if (label && label.id) {
					const dataObject =
						pageData.dataPath &&
						unwrapImmutable(state.getIn(pageData.dataPath));
					label.values = { ...dataObject, ...label.values };
				}
				const href = hrefMapper(page.href);
				return {
					...page,
					label,
					href,
					active: href === currentHref,
				};
			}),
			moduleName,
			moduleHref: hrefMapper(moduleHref),
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
