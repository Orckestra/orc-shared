import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { push } from "connected-react-router";
import { unwrapImmutable, safeGet } from "../../utils";
import { removeTab } from "../../actions/navigation";
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

export const useNavigationState = modules => {
	const dispatch = useDispatch();
	const location = useLocation();
	const currentHref = location.pathname;
	const hrefMapper = useSelector(selectSegmentHrefMapper);
	const [moduleHref = "", moduleName = ""] = currentHref.match(/^\/[^/]+\/([^/]+)/) || [];
	const moduleData = modules[moduleName] /* istanbul ignore next */ || {};
	const rawModule = {
		icon: moduleData.icon,
		label: moduleData.label,
		href: moduleHref,
	};
	const currentScope = useSelector(getCurrentScope);
	const rawPages = unwrapImmutable(useSelector(selectMappedCurrentModuleList)).filter(
		page =>
			page &&
			page.href !== `/${safeGet(page, "params", "scope") || currentScope}/${moduleName}`,
	);
	const [module, ...pages] = [rawModule, ...rawPages].map(page => {
		const params = page.params || {};
		const pageBaseHref = params.scope ? `/${params.scope}/${moduleName}` : moduleHref;
		const outsideScope = params.scope && params.scope !== currentScope;
		const pageData = getPageData(
			page.href.replace(pageBaseHref, ""),
			params,
			moduleData,
		) || { label: "[Not found]" };
		let label = pageData.label;
		if (label && label.id) {
			label = { ...label };
			if (pageData.labelValueSelector) {
				label.values = pageData.labelValueSelector(params);
				if (typeof label.values !== "function") {
					delete label.values;
				}
			} else if (Array.isArray(pageData.dataPath)) {
				console.warn(
					"Using dataPath label value pointers is deprecated, use labelValueSelector instead",
				);
				const dataPath = [...pageData.dataPath];
				/* istanbul ignore else */
				if (pageData.dataIdParam) {
					dataPath.push(params[pageData.dataIdParam]);
				}
				label.values = state => state.getIn(dataPath);
			}
		}
		const href = hrefMapper(page.href);
		let close = event => {
			dispatch(removeTab(moduleName, page.href));
			if (location.pathname === href) {
				dispatch(push(moduleHref));
			}
			event.stopPropagation();
			event.preventDefault();
		};
		if (page.icon) {
			// Modules do not have close functions
			close = undefined;
		}
		return {
			...page,
			outsideScope,
			label,
			mustTruncate: pageData.mustTruncate,
			href,
			mappedFrom: page.href,
			active: href === currentHref,
			close,
		};
	});
	return {
		module,
		pages,
		moduleName,
		moduleHref: hrefMapper(moduleHref),
	};
};

export default useNavigationState;
