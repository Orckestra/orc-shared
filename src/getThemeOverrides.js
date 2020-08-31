/* istanbul ignore file */
// Override values to use Orckestra icon sheet and colors
// See also orc-shared/src/getTheme.js#setApplicationColors()
const colors = {
	orckestraBlue: "#00b2e2",
	pim: { base: "#0a98cf", highlight: "#8ad5f2" },
	oms: {
		base: "#1f5b7f",
		primary: "#b4cfe3",
		highlight: "#34719d",
		select: "#b4cfe3",
	},
	marketing: { base: "#fd6b35" },
	analytics: { base: "#ffa205", dark: "#cf8409", highlight: "#f1eae0" },
};

const getThemeOverrides = appName => {
	const application = colors[appName] || {
		base: "#ff00ff", // Deliberately godawful default value
	};
	return {
		colors: { ...colors, application },
	};
};

export default getThemeOverrides;
