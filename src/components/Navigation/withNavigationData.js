import { push } from "connected-react-router";
import { unwrapImmutable, safeGet } from "../../utils";
import { removeTab } from "../../actions/navigation";
import routingConnector from "../../hocs/routingConnector";
import {
	selectMappedCurrentModuleList,
	selectSegmentHrefMapper,
	getCurrentScope,
} from "../../selectors/navigation";

const getPageWithSplitPath = ([pathStep, ...restPath], params, pages) => {
	let page = pages[pathStep];
	if (!page) {
		const paramPath =
			// Only one should exist
			Object.keys(pages).filter(path => /^\/:/.test(path))[0] || "";
		if (pathStep === "/" + params[paramPath.replace(/^\/:/, "")]) {
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
	(state, { modules, match, location }) => {
		const currentHref = location.pathname;
		const hrefMapper = selectSegmentHrefMapper(state);
		const [moduleHref = "", moduleName = ""] =
			currentHref.match(/^\/[^/]+\/([^/]+)/) || [];
		const moduleData = modules[moduleName] /* istanbul ignore next */ || {};
		const module = {
			icon: moduleData.icon,
			label: moduleData.label,
			href: moduleHref,
		};
		const pages = unwrapImmutable(selectMappedCurrentModuleList(state)).filter(
			page =>
				page &&
				page.href !==
					`/${safeGet(page, "params", "scope") ||
						getCurrentScope(state)}/${moduleName}`,
		);
		return {
			pages: [module, ...pages].map(page => {
				const params = page.params || {};
				const pageBaseHref = params.scope
					? `/${params.scope}/${moduleName}`
					: moduleHref;
				const outsideScope =
					params.scope && params.scope !== getCurrentScope(state);
				const pageData = getPageData(
					page.href.replace(pageBaseHref, ""),
					params,
					moduleData,
				) || { label: "[Not found]" };
				let label = pageData.label;
				if (label && label.id) {
					label = { ...label };
					let labelValues;
					if (pageData.labelValueSelector) {
						labelValues = unwrapImmutable(pageData.labelValueSelector(state));
					} else if (Array.isArray(pageData.dataPath)) {
						console.warn(
							"Using dataPath label value pointers is deprecated, use labelValueSelector instead",
						);
						const dataPath = [...pageData.dataPath];
						/* istanbul ignore else */
						if (pageData.dataIdParam) {
							dataPath.push(params[pageData.dataIdParam]);
						}
						labelValues = dataPath && unwrapImmutable(state.getIn(dataPath));
					}
					if (labelValues) {
						label.values = { ...labelValues, ...label.values };
					}
				}
				const href = hrefMapper(page.href);
				return {
					...page,
					outsideScope,
					label,
					href,
					mappedFrom: page.href,
					active: href === currentHref,
				};
			}),
			moduleName,
			moduleHref: hrefMapper(moduleHref),
		};
	},
	(dispatch, { location }) => ({
		close: (module, moduleHref) => (path, mapped) => event => {
			dispatch(removeTab(module, mapped));
			if (location.pathname === path) {
				dispatch(push(moduleHref));
			}
			event.stopPropagation();
			event.preventDefault();
		},
	}),
);

export default withNavigationData;
