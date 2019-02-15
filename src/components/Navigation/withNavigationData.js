import { push } from "connected-react-router";
import { unwrapImmutable } from "../../utils";
import { removeTab } from "../../actions/navigation";
import routingConnector from "../../hocs/routingConnector";
import {
	selectMappedCurrentModuleList,
	selectSegmentHrefMapper,
} from "../../selectors/navigation";

const getPageWithSplitPath = ([pathStep, ...restPath], params, pages) => {
	let page = pages[pathStep];
	if (!page) {
		const paramPath =
			// Only one should exist
			Object.keys(pages).filter(path => /^\/:/.test(path))[0] || "";
		if (pathStep === "/" + params[paramPath.replace("/:", "")]) {
			page = pages[paramPath];
		}
	}
	if (restPath.length === 0 || !page) {
		return page;
	} else {
		return getPageWithSplitPath(restPath, params, {
			...page.pages,
			...page.segments,
			...page.subpages,
		});
	}
};

export const getPageData = (path, params, module) => {
	if (!path) return module;
	const pathSteps = path.split(/(?=\/)/);
	return getPageWithSplitPath(pathSteps, params, {
		...module.pages,
		...module.segments,
		...module.subpages,
	});
};

const withNavigationData = routingConnector(
	(state, { modules, match }) => {
		const params = match.params;
		const currentHref = window.location.pathname;
		const hrefMapper = selectSegmentHrefMapper(state);
		const [moduleHref, moduleName] = currentHref.match(/^\/[^/]+\/([^/]+)/);
		const moduleData = modules[moduleName] /* istanbul ignore next */ || {};
		const module = {
			icon: moduleData.icon,
			label: moduleData.label,
			href: moduleHref,
		};
		const pages = unwrapImmutable(selectMappedCurrentModuleList(state));
		return {
			pages: [module, ...pages].map(page => {
				const pageData = getPageData(
					page.href.replace(moduleHref, ""),
					params,
					moduleData,
				) || { label: "[Not found]" };
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
