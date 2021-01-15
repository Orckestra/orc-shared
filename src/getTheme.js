import "typeface-open-sans";
import "typeface-roboto-condensed";
import { merge } from "lodash";
import { shade, tint } from "polished";

const baseTheme = {
	treeSettings: {
		// in px
		// How far from parent left edge to vertical branch under it
		branchIndent: 14,
		// How far from vertical branch to children's left edge
		branchLength: 15,
		// How far up from bottom edge of node should horizontal branch sit
		branchHeight: 20,
	},
	colors: {
		application: {
			base: "#cccccc",
		},
		icon: "#999999",
		border: "#999999",
		borderLight: "#cccccc",
		borderDark: "#3333333",
		text: "#333333",
		textMedium: "#999999",
		textLight: "#cccccc",
		textWhite: "#efefef",
		bgLight: "#efefef",
		bgMedium: "#999999", // Not used
		bgDark: "#333333",
		error: "#ce4844",
		scopeTypes: {
			Global: "#fd6b35",
			Virtual: "#3b6482",
			Sale: "#7db84c",
			Dependant: "#999999",
		},
		toasts: {
			error: "#ce4844",
			warn: "#f5a623",
			confirm: "#22b980",
		},
	},
	icons: {
		indicators: {
			up: "chevron-up",
			down: "dropdown-chevron-down",
			right: "dropdown-chevron-right",
			more: "arrow-more",
		},
		scopeTypes: {
			Global: "global-scope",
			Virtual: "virtual-scope",
			Sale: "sales-scope",
			Dependant: "dependent-scope",
		},
		// toast: {
		// 	confirm: "checkmark-circle",
		// 	warn: "warning",
		// 	error: "cross-circle",
		// },
		prev: "arrow-small-left",
		next: "arrow-small-right",
		menu: "app-list",
		sidebarOpen: "collapse",
		sidebarClosed: "expand",
		close: "close",
		date: "calendar-generic",
		time: "clock",
		backArrow: "arrow-large-left",
		loading: "sync",
		error: "warning",
		reportProblem: "report-problem-triangle",
	},
	fonts: {
		base: "Open Sans, sans-serif",
		header: "Roboto Condensed, sans-serif",
	},
};

const setApplicationColors = theme => {
	if (!theme.colors.application.primary) {
		theme.colors.application.primary = theme.colors.application.base;
	}
	if (!theme.colors.application.highlight) {
		theme.colors.application.highlight = tint(0.25, theme.colors.application.base);
	}
	if (!theme.colors.application.select) {
		theme.colors.application.select = tint(0.7, theme.colors.application.base);
	}
	if (!theme.colors.application.dark) {
		theme.colors.application.dark = shade(0.2, theme.colors.application.base);
	}
	return theme;
};

const appHighlightColor_IS_DEPRECATED = { appHighlightColor: "#ff00ff" };

const getTheme = (overrides = {}) => {
	return setApplicationColors(merge({}, baseTheme, overrides, appHighlightColor_IS_DEPRECATED));
};

export default getTheme;
