import { createMuiTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

const drawerWidth = 240;

const commonTheme = {
	spacing: factor => `${0.625 * factor}rem`,
	direction: "ltr",
	shape: {
		borderRadius: 4,
	},
	typography: {
		htmlFontSize: 14,
		fontFamily: '"Open Sans", sans-serif',
		fontSize: 13,
		fontWeightThin: 100,
		fontWeightExtraLight: 200,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightSemiBold: 600,
		fontWeightBold: 700,
		fontWeightExtraBold: 800,
		fontWeightBlack: 900,
		button: {
			fontFamily: '"Roboto Condensed", sans-serif',
			fontWeight: 500,
			fontSize: 12,
			lineHeight: 1.43,
			letterSpacing: "0.0em",
			textTransform: "uppercase",
		},
	},
};

const commonPalette = {
	error: {
		light: "#FFBBAE",
		main: "#ED2E0B",
		dark: "#A13B38",
		contrastText: "#fff",
	},
	warning: {
		light: "#FEE8A0",
		main: "#F6C110",
		dark: "#AD9133",
		contrastText: "#fff",
	},
	success: {
		light: "#B9F0CB",
		main: "#10B246",
		dark: "#278045",
		contrastText: "#fff",
	},
	info: {
		light: "#93DDF9",
		main: "#0984B2",
		dark: "#1E708F",
		contrastText: "#fff",
	},
	grey: {
		darker: "#2D2D2D",
		dark: "#333",
		icon: "#999",
		borders: "#CCC",
		light: "#EFEFEF",
		lighter: "#F7F7F7",
	},
	text: {
		primary: "#333",
		secondary: "#575757",
		disabled: "#CCC",
		hint: "#999",
	},
	divider: "#CCCCCC",
	background: {
		paper: "#FFF",
		default: "#FFF",
		tabs: "#EFEFEF",
		app: "#333",
	},
};

const setThemeProps = theme => ({
	...theme.props,
	MuiButtonBase: {
		disableRipple: true,
	},
	MuiTab: {
		disableRipple: true,
	},
});

const setThemeOverrides = theme => ({
	...theme.overrides,
	MuiButtonBase: {
		...theme.MuiButtonBase,
		root: {
			...theme.root,
			flexGrow: 1,
			backgroundColor: "transparent",
			borderColor: theme.palette.grey.borders,
			borderWidth: 1,
			boxSizing: "border-box",
			minWidth: 64,
			padding: theme.spacing(1, 2),
			borderRadius: theme.shape.borderRadius,
			color: theme.palette.text.primary,
			transition: theme.transitions.create(["background-color", "box-shadow", "border"], {
				duration: theme.transitions.duration.short,
			}),
			"&:hover": {
				textDecoration: "none",
				backgroundColor: fade(
					theme.palette.text.primary,
					theme.palette.action.hoverOpacity,
				),
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					backgroundColor: "transparent",
				},
				"&$disabled": {
					backgroundColor: "transparent",
				},
			},
			"&$disabled": {
				color: theme.palette.action.disabled,
			},
		},
	},
	MuiButton: {
		...theme.MuiButton,
		/* Styles applied to the span element that wraps the children. */
		label: {
			...theme.label,
			width: "100%", // Ensure the correct width for iOS Safari
			display: "inherit",
			alignItems: "inherit",
			justifyContent: "inherit",
		},
		/* Styles applied to the root element if `variant="text"`. */
		text: {
			...theme.text,
			padding: theme.spacing(1),
		},
		/* Styles applied to the root element if `variant="text"` and `color="primary"`. */
		textPrimary: {
			color: theme.palette.primary.main,
			"&:hover": {
				backgroundColor: fade(
					theme.palette.primary.main,
					theme.palette.action.hoverOpacity,
				),
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					backgroundColor: "transparent",
				},
			},
		},
		/* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
		textSecondary: {
			color: theme.palette.secondary.main,
			"&:hover": {
				backgroundColor: fade(
					theme.palette.secondary.main,
					theme.palette.action.hoverOpacity,
				),
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					backgroundColor: "transparent",
				},
			},
		},
		/* Styles applied to the root element if `variant="outlined"`. */
		outlined: {
			padding: theme.spacing(0.5, 1),
			border: `1px solid ${
				theme.palette.type === "light"
					? "rgba(0, 0, 0, 0.23)"
					: "rgba(255, 255, 255, 0.23)"
			}`,
			"&$disabled": {
				border: `1px solid ${theme.palette.action.disabledBackground}`,
			},
			"& path:not([fill='none'])": {
				fill: "currentColor",
			},
		},
		/* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
		outlinedPrimary: {
			color: theme.palette.primary.main,
			border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
			"&:hover": {
				border: `1px solid ${theme.palette.primary.main}`,
				backgroundColor: fade(
					theme.palette.primary.main,
					theme.palette.action.hoverOpacity,
				),
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					backgroundColor: "transparent",
				},
			},
		},
		/* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
		outlinedSecondary: {
			color: theme.palette.secondary.main,
			border: `1px solid ${fade(theme.palette.secondary.main, 0.5)}`,
			"&:hover": {
				border: `1px solid ${theme.palette.secondary.main}`,
				backgroundColor: fade(
					theme.palette.secondary.main,
					theme.palette.action.hoverOpacity,
				),
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					backgroundColor: "transparent",
				},
			},
			"&$disabled": {
				border: `1px solid ${theme.palette.action.disabled}`,
			},
		},
		/* Styles applied to the root element if `variant="contained"`. */
		contained: {
			color: theme.palette.getContrastText(theme.palette.grey[300]),
			backgroundColor: theme.palette.grey[300],
			boxShadow: theme.shadows[2],
			"&:hover": {
				backgroundColor: theme.palette.grey.A100,
				boxShadow: theme.shadows[4],
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					boxShadow: theme.shadows[2],
					backgroundColor: theme.palette.grey[300],
				},
				"&$disabled": {
					backgroundColor: theme.palette.action.disabledBackground,
				},
			},
			"&$focusVisible": {},
			"&:active": {},
			"&$disabled": {
				color: theme.palette.action.disabled,
				boxShadow: theme.shadows[0],
				backgroundColor: theme.palette.action.disabledBackground,
			},
		},
		/* Styles applied to the root element if `variant="contained"` and `color="primary"`. */
		containedPrimary: {
			color: theme.palette.primary.contrastText,
			backgroundColor: theme.palette.primary.main,
			"&:hover": {
				backgroundColor: theme.palette.primary.dark,
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					backgroundColor: theme.palette.primary.main,
				},
			},
		},
		/* Styles applied to the root element if `variant="contained"` and `color="secondary"`. */
		containedSecondary: {
			color: theme.palette.secondary.contrastText,
			backgroundColor: theme.palette.secondary.main,
			"&:hover": {
				backgroundColor: theme.palette.secondary.dark,
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					backgroundColor: theme.palette.secondary.main,
				},
			},
		},
		/* Styles applied to the root element if `disableElevation={true}`. */
		disableElevation: {
			boxShadow: "none",
			"&:hover": {
				boxShadow: "none",
			},
			"&$focusVisible": {
				boxShadow: "none",
			},
			"&:active": {
				boxShadow: "none",
			},
			"&$disabled": {
				boxShadow: "none",
			},
		},
		/* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
		focusVisible: {},
		/* Pseudo-class applied to the root element if `disabled={true}`. */
		disabled: {},
		/* Styles applied to the root element if `color="inherit"`. */
		colorInherit: {
			color: "inherit",
			borderColor: "currentColor",
		},
		/* Styles applied to the root element if `size="small"` and `variant="text"`. */
		textSizeSmall: {
			padding: theme.spacing(0.4, 0.5),
			fontSize: theme.typography.pxToRem(13),
		},
		/* Styles applied to the root element if `size="large"` and `variant="text"`. */
		textSizeLarge: {
			padding: theme.spacing(0.8, 1.1),
			fontSize: theme.typography.pxToRem(15),
		},
		/* Styles applied to the root element if `size="small"` and `variant="outlined"`. */
		outlinedSizeSmall: {
			padding: theme.spacing(0.3, 0.9),
			fontSize: theme.typography.pxToRem(13),
		},
		/* Styles applied to the root element if `size="large"` and `variant="outlined"`. */
		outlinedSizeLarge: {
			padding: theme.spacing(0.7, 2.1),
			fontSize: theme.typography.pxToRem(15),
		},
		/* Styles applied to the root element if `size="small"` and `variant="contained"`. */
		containedSizeSmall: {
			padding: theme.spacing(0.4, 1),
			fontSize: theme.typography.pxToRem(13),
		},
		/* Styles applied to the root element if `size="large"` and `variant="contained"`. */
		containedSizeLarge: {
			padding: theme.spacing(0.8, 2.2),
			fontSize: theme.typography.pxToRem(15),
		},
		/* Styles applied to the root element if `size="small"`. */
		sizeSmall: {},
		/* Styles applied to the root element if `size="large"`. */
		sizeLarge: {},
		/* Styles applied to the root element if `fullWidth={true}`. */
		fullWidth: {
			width: "100%",
		},
		fullSize: {
			width: "100%",
			height: "100%",
		},
		/* Styles applied to the startIcon element if supplied. */
		startIcon: {
			display: "inherit",
			marginRight: 8,
			marginLeft: -4,
			"&$iconSizeSmall": {
				marginLeft: -2,
			},
		},
		/* Styles applied to the endIcon element if supplied. */
		endIcon: {
			display: "inherit",
			marginRight: -4,
			marginLeft: 8,
			"&$iconSizeSmall": {
				marginRight: -2,
			},
		},
		/* Styles applied to the icon element if supplied and `size="small"`. */
		iconSizeSmall: {
			"& > *:first-child": {
				fontSize: 18,
			},
		},
		/* Styles applied to the icon element if supplied and `size="medium"`. */
		iconSizeMedium: {
			"& > *:first-child": {
				fontSize: 20,
			},
		},
		/* Styles applied to the icon element if supplied and `size="large"`. */
		iconSizeLarge: {
			"& > *:first-child": {
				fontSize: 22,
			},
		},
	},
	MuiIconButton: {},
	MuiDrawer: {
		...theme.MuiDrawer,
		root: {
			...theme.root,
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
			"& *": {
				color: theme.palette.grey.icon,
			},
		},
	},
	MuiTabs: {
		...theme.MuiTabs,
		root: {
			...theme.root,
			backgroundColor: theme.palette.grey.light,
			paddingTop: theme.spacing(2),
			position: "relative",
			borderRadius: theme.spacing(1, 0, 0, 0),
			"&:before": {
				content: '""',
				display: "flex",
				position: "absolute",
				borderBottom: `1px solid ${theme.palette.primary.main}`,
				width: "100%",
				bottom: 0,
				zIndex: 10,
			},
			"& > .MuiTabs-scroller": {
				marginLeft: theme.spacing(2),
			},
		},
	},
	MuiTab: {
		...theme.MuiTab,
		root: {
			...theme.root,
			backgroundColor: theme.palette.common.white,
			color: theme.palette.grey.light,
			border: `1px solid ${theme.palette.grey.borders}`,
			borderRadius: theme.spacing(0.5, 0.5, 0, 0),
			zIndex: 10,
			textTransform: "uppercase",
			height: theme.spacing(4.8),
			minHeight: theme.spacing(2.4),
			"& .MuiIconButton-root": {
				padding: 0,
			},
			"&.Mui-selected": {
				color: theme.palette.primary.main,
				borderColor: theme.palette.primary.main,
				zIndex: 10000,
				borderBottom: `1px solid ${theme.palette.common.white}`,
				marginBottom: -1,
			},
			"&.MuiTab-labelIcon svg": {
				marginBottom: 0,
				marginRight: 10,
			},
			"& .MuiTab-wrapper": {
				flexDirection: "row",
			},
		},
		labelIcon: {
			...theme.labelIcon,
			height: theme.spacing(4.8),
			minHeight: theme.spacing(2.4),
			"& path:not([fill='none'])": {
				fill: "currentColor",
			},
		},
	},
	MuiTable: {},
	MuiTableHead: {
		...theme.MuiTableHead,
		root: {
			...theme.root,
			backgroundColor: theme.palette.grey.lighter,
		},
	},
	MuiTableBody: {},
	MuiTableCell: {
		...theme.MuiTableCell,
		root: {
			...theme.root,
			fontFamily: theme.typography.fontFamily,
			fontSize: theme.typography.fontSize,
			borderBottomColor: theme.palette.secondary.light,
			"&$head": {
				fontWeight: theme.typography.fontWeightSemiBold,
			},
		},
	},
	MuiTableRow: {},
	MuiTableContainer: {},
	MuiTablePagination: {},
	MuiTableSortLabel: {},
	MuiTableFooter: {},
	MuiInputBase: {
		...theme.MuiInputBase,
		input: {
			...theme.input,
			borderRadius: 4,
			position: "relative",
			backgroundColor: theme.palette.background.paper,
			border: `1px solid ${theme.palette.grey.borders}`,
			fontSize: theme.typography.fontSize,
			maxWidth: theme.spacing(20),
			padding: theme.spacing(0.6, 0.6, 0.6, 0.6),
			transition: theme.transitions.create(["border-color", "box-shadow"]),
		},
	},
	MuiSelect: {
		...theme.MuiSelect,
		select: {
			...theme.select,
			minWidth: theme.spacing(15),
			borderRadius: 4,
			"&:focus": {
				borderRadius: 4,
				borderColor: "#4fa1f0",
				boxShadow: "0 0 4px #4fa1f0",
				outline: "none",
			},
		},
	},
	MuiTypography: {
		...theme.MuiTypography,
		body1: {
			...theme.body1,
			fontSize: commonTheme.typography.fontSize,
		},
	},
	MuiCheckbox: {
		...theme.MuiCheckbox,
		root: {
			...theme.root,
			padding: "5px 5px 5px 0",
			minWidth: "30px",
			backgroundColor: "inherit",
		},
	},
});

const createThemes = (applicationTheme, themeDefinition) => {
	const applicationMuiTheme = createMuiTheme(applicationTheme);

	const muiTheme = createMuiTheme({
		...themeDefinition,
		...commonTheme,
		palette: {
			...themeDefinition.palette,
			...commonPalette,
		},
	});

	muiTheme.props = setThemeProps(muiTheme);
	muiTheme.overrides = setThemeOverrides(muiTheme);

	return {
		applicationMuiTheme: applicationMuiTheme,
		muiTheme: muiTheme,
	};
};

export default createThemes;
