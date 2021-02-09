import { useSelector, useDispatch, useStore } from "react-redux";
import { useLocation } from "react-router-dom";
import { push } from "connected-react-router";
import { unwrapImmutable } from "../../utils";
import { removeTab } from "../../actions/navigation";
import {
	selectMappedCurrentModuleList,
	selectSegmentHrefMapper,
	selectPrependPathConfig,
	getCurrentScope,
} from "../../selectors/navigation";
import { scopeGetter } from "../../selectors/scope";
import { getModuleNameFromHref } from "../../utils/parseHelper";

const doesRestPathMatchParams = (params, paramPathSplit, restPath) => {
	var restPathMatchParams = true;

	for (var i = 1; i < paramPathSplit.length; i++) {
		if (restPath[i - 1] !== "/" + params[paramPathSplit[i]]) {
			restPathMatchParams = false;
			break;
		}
	}

	return restPathMatchParams;
};

const getPageWithSplitPath = ([pathStep, ...restPath], params, pages) => {
	let page = pages[pathStep];
	if (!page) {
		const paramPath =
			// Only one should exist
			Object.keys(pages).filter(path => /^\/:/.test(path))[0] || "";

		const paramPathSplit = paramPath.replace(/^\/:/, "").split("/:");
		const firstStepMatchParams = pathStep === "/" + params[paramPathSplit[0]];

		if (firstStepMatchParams) {
			if (paramPathSplit.length === 1) {
				page = pages[paramPath];
			} else if (
				paramPathSplit.length - 1 === restPath.length &&
				doesRestPathMatchParams(params, paramPathSplit, restPath)
			) {
				return pages[paramPath];
			}
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

const redirectScopeWhenRequired = (isPageTab, pageScopeSelector, rawPage, currentScope, scopeDefinitionGetter) => {
	const params = rawPage.params || {};
	const scopeChanged = params.scope && params.scope !== currentScope;
	const currentScopeDefinition = scopeDefinitionGetter(currentScope);
	const currentScopePath = currentScopeDefinition ? currentScopeDefinition.scopePath : [];

	let outsideScope = scopeChanged;

	if (isPageTab && pageScopeSelector) {
		if (scopeChanged) {
			rawPage = { ...rawPage, params: { ...params } };

			rawPage.href = rawPage.href.replace(`/${rawPage.params.scope}/`, `/${currentScope}/`);
			rawPage.params.scope = currentScope;
		}

		const scopeId = pageScopeSelector(params);

		const scopeFromPageState = scopeId ? scopeDefinitionGetter(scopeId) : null;

		if (scopeFromPageState) {
			outsideScope =
				scopeFromPageState.id !== currentScope &&
				currentScopePath.indexOf(scopeFromPageState.id) < 0 &&
				scopeFromPageState.scopePath.indexOf(currentScope) < 0;
		}
	}

	return [rawPage, outsideScope];
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
	const { pathname: currentHref } = useLocation();
	const store = useStore();
	const hrefMapper = useSelector(selectSegmentHrefMapper);
	const prependPath = useSelector(selectPrependPathConfig);
	const [moduleName, moduleHref] = getModuleNameFromHref(prependPath, currentHref);

	const moduleData = modules[moduleName] /* istanbul ignore next */ || {};
	const rawModule = {
		icon: moduleData.icon,
		label: moduleData.label,
		href: moduleHref,
	};
	const currentScope = useSelector(getCurrentScope);
	const scopeDefinitionGetter = useSelector(scopeGetter);

	const rawPages = unwrapImmutable(useSelector(selectMappedCurrentModuleList)).filter(page => {
		if (!page) return false;
		const [pageModuleName, pageModuleHref] = getModuleNameFromHref(prependPath, page.href);
		return page.href !== pageModuleHref || pageModuleName !== moduleName;
	});

	const [module, ...pages] = [rawModule, ...rawPages].map(rawPage => {
		const isPageTab = !rawPage.icon;
		const pageScopeSelector = moduleData.pageScopeSelector
			? params => moduleData.pageScopeSelector(store.getState(), params)
			: null;
		const [page, outsideScope] = redirectScopeWhenRequired(
			isPageTab,
			pageScopeSelector,
			rawPage,
			currentScope,
			scopeDefinitionGetter,
		);
		const params = page.params || {};
		const [, pageBaseHref] = getModuleNameFromHref(prependPath, page.href);

		const pageData = getPageData(page.href.replace(pageBaseHref, ""), params, moduleData) || { label: "[Not found]" };
		let label = pageData.label;
		if (label && label.id) {
			label = { ...label };
			if (pageData.labelValueSelector) {
				label.values = pageData.labelValueSelector(params);
				if (typeof label.values !== "function") {
					delete label.values;
				}
			} else if (Array.isArray(pageData.dataPath)) {
				console.warn("Using dataPath label value pointers is deprecated, use labelValueSelector instead");
				const dataPath = [...pageData.dataPath];
				/* istanbul ignore else */
				if (pageData.dataIdParam) {
					dataPath.push(params[pageData.dataIdParam]);
				}
				label.values = state => state.getIn(dataPath);
			}
		}
		const href = hrefMapper(page.href);

		// Modules do not have close functions
		const close = isPageTab
			? event => {
					dispatch(removeTab(moduleName, page.href));
					if (currentHref === href) {
						dispatch(push(moduleHref));
					}
					if (event) {
						event.stopPropagation();
						event.preventDefault();
					}
			  }
			: undefined;

		return {
			...page,
			outsideScope: isPageTab ? outsideScope : null,
			scopeNotSupported: isPageTab ? pageScopeSelector != null && outsideScope : null,
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
