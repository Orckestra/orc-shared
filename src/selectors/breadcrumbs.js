import React from "react";
import { FormattedMessage } from "react-intl";
import { createSelector } from "reselect";
import UrlPattern from "url-pattern";
import Immutable from "immutable";

const routerData = state => state.get("router");

const unwrapImmutable = x => (Immutable.isImmutable(x) ? x.toJS() : x);

const getStateByNestedPath = (state, path) =>
	state.getIn(
		path.map(
			step => (Array.isArray(step) ? getStateByNestedPath(state, step) : step),
		),
	) || "[not found]";

const paramMatcher = /\{(\w+)\}/g;
const pathMatchAsCrumb = (result, params, state) => {
	const crumb = {};
	const title = unwrapImmutable(result.get("title"));
	if (!title) return null;
	if (typeof title === "object") {
		if (paramMatcher.test(title.defaultMessage)) {
			title.values = {};
			let match;
			paramMatcher.lastIndex = 0; // Reset the matcher
			while ((match = paramMatcher.exec(title.defaultMessage)) !== null) {
				const param = match[1];
				if (result.get(param) && Immutable.List.isList(result.get(param))) {
					title.values[param] = getStateByNestedPath(
						state,
						result.get(param).toJS(),
					);
				} else {
					title.values[param] = params[param];
				}
			}
		}
		crumb.label = <FormattedMessage {...title} />;
	} else {
		crumb.label = title;
	}
	if (result.get("route")) {
		const pattern = new UrlPattern(result.get("route"));
		crumb.href = pattern.stringify(params);
	}
	return crumb;
};

const routeSelector = createSelector(routerData, router => router.get("route"));

const resultSelector = createSelector(
	routerData,
	router => router.get("result") || Immutable.Map(),
);

const paramSelector = createSelector(
	routerData,
	router => router.get("params") || Immutable.Map(),
);

export const breadcrumbs = createSelector(
	resultSelector,
	routeSelector,
	paramSelector,
	x => x,
	(result, topRoute, params, state) => {
		let match = result.set("route", topRoute);
		const trail = [];
		do {
			trail.push(pathMatchAsCrumb(match, params.toJS(), state));
		} while ((match = match.get("parent")));
		return trail.filter(x => x).reverse();
	},
);
