import "typeface-open-sans";
import "typeface-roboto-condensed";
import { merge } from "lodash";

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
	scopeTypeColors: {
		Global: "#fd6b35",
		Virtual: "#3b6482",
		Sale: "#7db84c",
		Dependant: "#999999",
	},
	toastColors: {
		error: "#ce4844",
		warn: "#f5a623",
		confirm: "#22b980",
	},
	errorColor: "#ce4844",
	icons: {
		indicators: {
			up: "chevron-up",
			down: "chevron-down",
			right: "chevron-right",
			left: "chevron-left",
		},
		scopeTypes: {
			Global: "earth",
			Virtual: "folder-open-2",
			Sale: "cart",
			Dependant: "paste",
		},
		toast: {
			confirm: "checkmark-circle",
			warn: "warning",
			error: "cross-circle",
		},
		prev: "previous",
		next: "next",
		menu: "placeholder",
		sidebarOpen: "versioning-compare",
		sidebarClosed: "menu",
		close: "close",
		date: "calendar-full",
		time: "clock",
		backArrow: "arrow-left",
		loading: "sync",
		error: "error",
	},
	fonts: {
		base: "Open Sans, sans-serif",
		header: "Roboto Condensed, sans-serif",
	},
};

const getTheme = (highlight = "#cccccc", overrides = {}) => {
	return merge({ appHighlightColor: highlight }, baseTheme, overrides);
};

export default getTheme;
