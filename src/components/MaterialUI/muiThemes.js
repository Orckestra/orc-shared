import { createMuiTheme } from "@material-ui/core/styles";
import { fade, darken } from "@material-ui/core/styles/colorManipulator";

const drawerWidth = 240;

const commonTheme = {
	spacing: factor => `${0.625 * factor}rem`,
	direction: "ltr",
	shape: {
		borderRadius: 4,
	},
	typography: {
		h1Size: 24,
		h2Size: 18,
		h3Size: 16,
		h4Size: 14,
		h5Size: 13,
		h6Size: 13,
		fieldLabelSize: 12,
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
			fontSize: 13,
			lineHeight: 1.0,
			letterSpacing: "0.0em",
			textTransform: "uppercase",
		},
	},
};

const commonPalette = {
	primary: {
		lighter: "#f5f5f5",
		light: "#CCC",
		main: "#232323",
		dark: "#000",
		contrastText: "#fff",
	},
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
	focus: "#4fa1f0",
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
	MuiListItemText: {
		disableTypography: true,
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
				backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
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
			"&:focus, &:active": {
				borderRadius: theme.shape.borderRadius,
				borderColor: theme.palette.focus,
				boxShadow: `0 0 4px ${theme.palette.focus}`,
				outline: "none",
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
				backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
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
				backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					backgroundColor: "transparent",
				},
			},
		},
		/* Styles applied to the root element if `variant="outlined"`. */
		outlined: {
			padding: theme.spacing(0.5, 1),
			border: `1px solid ${theme.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
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
				backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
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
				backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
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
	MuiSvgIcon: {
		...theme.MuiSvgIcon,
		root: {
			...theme.root,
			color: theme.palette.grey.icon,
			"& path:not([fill='none'])": {
				fill: "currentColor",
			},
		},
	},
	MuiIconButton: {
		...theme.MuiIconButton,
		root: {
			...theme.root,
			padding: theme.spacing(0.4, 1, 0.3, 1),
			color: theme.palette.grey.icon,
			borderRadius: theme.shape.borderRadius,
			border: `1px solid ${theme.palette.grey.borders}`,
			minWidth: "auto",
			"& g:not([id*='Close']) path:not([fill='none'])": {
				fill: "currentColor",
			},
			"& + .MuiButton-root, & + .MuiIconButton-root, & + .MuiInputBase-root": {
				marginLeft: theme.spacing(1),
			},
		},
		label: {
			...theme.label,
		},
	},
	MuiDrawer: {
		...theme.MuiDrawer,
		root: {
			...theme.root,
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
			"& .MuiListItemText-root": {
				opacity: 0,
				transition: theme.transitions.create("opacity", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
			/* To update with actual classnames if we change the side nav to use the MuiDrawer */
			"&[class*='drawerOpen'] .MuiListItemText-root": {
				opacity: 1,
				transition: theme.transitions.create("opacity", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
		paperAnchorDockedLeft: {
			...theme.paperAnchorDockedLeft,
			borderRight: "none",
		},
	},
	MuiListItem: {
		...theme.MuiListItem,
		button: {
			...theme.button,
			color: theme.palette.grey.icon,
			"&:hover, &:hover .MuiListItemIcon-root, &hover .MuiListItemText-root": {
				color: theme.palette.primary.light,
			},
		},
	},
	MuiMenuItem: {
		...theme.MuiMenuItem,
		root: {
			...theme.root,
			...theme.typography.button,
			color: theme.palette.grey.icon,
			"&:hover, &:hover .MuiListItemIcon-root, &hover .MuiListItemText-root": {
				color: theme.palette.primary.light,
			},
		},
	},
	MuiListItemIcon: {
		...theme.MuiListItemIcon,
		root: {
			...theme.root,
			color: theme.palette.grey.icon,
			minWidth: 0,
			padding: theme.spacing(0.5),
			marginRight: theme.spacing(0.5),
			"& path:not([fill='none'])": {
				fill: "currentColor",
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
			flexGrow: 0,
			[theme.breakpoints.up("sm")]: {
				minWidth: 0,
			},
			"& .MuiIconButton-root": {
				padding: theme.spacing(0),
				flexGrow: 0,
				minWidth: 0,
				border: "none",
				"&:hover": {
					backgroundColor: "transparent",
				},
			},
			"&.Mui-selected": {
				color: theme.palette.primary.main,
				borderColor: theme.palette.primary.main,
				zIndex: 10000,
				borderBottom: `1px solid ${theme.palette.common.white}`,
				marginBottom: -1,
			},
			"&.MuiTab-labelIcon svg": {
				marginBottom: theme.spacing(0),
				marginRight: theme.spacing(1),
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
	MuiTable: {
		...theme.MuiTable,
	},
	MuiTableHead: {
		...theme.MuiTableHead,
	},
	MuiTableRow: {
		...theme.MuiTableRow,
	},
	MuiTablePagination: {},
	MuiTableSortLabel: {},
	MuiTableFooter: {
		...theme.MuiTableFooter,
		root: {
			...theme.root,
			backgroundColor: theme.palette.grey.lighter,
		},
	},
	MuiInput: {
		...theme.MuiInput,
		underline: {
			border: "none",
			"&:before": {
				content: "none",
			},
		},
	},
	MuiInputBase: {
		...theme.MuiInputBase,
		root: {
			...theme.root,
			"& + .MuiButton-root, & + .MuiIconButton-root, & + .MuiInputBase-root": {
				marginLeft: theme.spacing(1),
			},
		},
		input: {
			...theme.input,
			borderRadius: theme.shape.borderRadius,
			position: "relative",
			backgroundColor: theme.palette.background.paper,
			border: `1px solid ${theme.palette.grey.borders}`,
			fontSize: theme.typography.fontSize,
			maxWidth: theme.spacing(20),
			minWidth: theme.spacing(14),
			padding: theme.spacing(0.6, 0.6, 0.6, 0.6),
			transition: theme.transitions.create(["border-color", "box-shadow"]),
			"&:focus, &:active": {
				borderRadius: theme.shape.borderRadius,
				borderColor: theme.palette.focus,
				boxShadow: `0 0 4px ${theme.palette.focus}`,
				outline: "none",
			},
			"&[readonly]": {
				border: "none",
				backgroundColor: "transparent",
			},
		},
		adornedStart: {
			"& > .MuiOutlinedInput-root:first-child, & > .MuiButtonBase-root:first-child": {
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
			},
		},
		adornedEnd: {},
		inputAdornedStart: {
			...theme.inputAdornedStart,
			borderRight: "none",
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
		},
		inputAdornedEnd: {
			...theme.inputAdornedEnd,
			borderLeft: "none",
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
			"& + .MuiOutlinedInput-root, & + .MuiButtonBase-root": {
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 0,
			},
		},
	},
	MuiSelect: {
		...theme.MuiSelect,
		select: {
			...theme.select,
			minWidth: theme.spacing(13),
			borderRadius: theme.shape.borderRadius,
		},
		outlined: {
			padding: theme.spacing(0.4, 0.6, 0.4, 0.6),
		},
	},
	MuiTypography: {
		...theme.MuiTypography,
		body1: {
			...theme.body1,
			fontSize: commonTheme.typography.fontSize,
			lineHeight: 1.3,
		},
		h1: {
			...theme.h1,
			fontSize: theme.typography.h1Size,
			fontWeight: theme.typography.fontWeightRegular,
			lineHeight: 1.3,
			color: theme.palette.grey.icon,
		},
		h2: {
			...theme.h2,
			fontSize: theme.typography.h2Size,
			fontWeight: theme.typography.fontWeightRegular,
			lineHeight: 1.3,
		},
		h3: {
			...theme.h3,
			fontSize: theme.typography.h3Size,
			fontWeight: theme.typography.fontWeightRegular,
			lineHeight: 1.3,
		},
		h4: {
			...theme.h4,
			fontSize: theme.typography.h4Size,
			fontWeight: theme.typography.fontWeightRegular,
			lineHeight: 1.3,
		},
		h5: {
			...theme.h5,
			fontSize: theme.typography.h5Size,
			fontWeight: theme.typography.fontWeightBold,
			lineHeight: 1.3,
		},
		h6: {
			...theme.h6,
			fontSize: theme.typography.h6Size,
			fontWeight: theme.typography.fontWeightSemiBold,
			lineHeight: 1.3,
		},
	},
	MuiCheckbox: {
		...theme.MuiCheckbox,
		root: {
			...theme.root,
			padding: theme.spacing(0.5, 0.5, 0.5, 0),
			minWidth: theme.spacing(3),
			backgroundColor: "inherit",
			border: "none",
			"&.Mui-checked": {
				"& .MuiSvgIcon-root": {
					color: "inherit",
				},
				"&:hover": {
					backgroundColor: "transparent !important",
				},
			},
			"&:hover": {
				backgroundColor: "transparent !important",
			},
			"&:focus, &:active": {
				boxShadow: "none",
			},
		},
	},
	MuiAccordionSummary: {
		...theme.MuiAccordionSummary,
		expandIcon: {
			...theme.expandIcon,
			border: "none",
		},
	},
	MuiTooltip: {
		...theme.MuiTooltip,
		tooltip: {
			...theme.tooltip,
			color: theme.palette.grey.dark,
			fontFamily: theme.typography.fontFamily,
			fontSize: theme.typography.fontSize,
			backgroundColor: theme.palette.background.paper,
			border: "1px solid",
			borderRadius: "3px",
			borderColor: theme.palette.grey.icon,
			boxShadow: "0 0 4px rgba(0,0,0,0.22)",
		},
		arrow: {
			...theme.arrow,
			color: theme.palette.background.paper,
			"&:before": {
				border: "1px solid",
				borderColor: theme.palette.grey.icon,
			},
		},
	},
	MuiRadio: {
		...theme.MuiRadio,
		root: {
			...theme.root,
			border: "none",
			"&.Mui-checked": {
				"& .MuiSvgIcon-root": {
					color: "inherit",
				},
				"&:hover": {
					backgroundColor: "transparent !important",
				},
			},
			"&:hover": {
				backgroundColor: "transparent !important",
			},
			"&:focus, &:active": {
				boxShadow: "none",
			},
		},
		colorPrimary: {
			...theme.colorPrimary,
			"&:hover": {
				backgroundColor: "transparent !important",
			},
			"&.Mui-checked": {
				"&:hover": {
					backgroundColor: "transparent !important",
				},
			},
		},
		colorSecondary: {
			...theme.colorSecondary,
			"&:hover": {
				backgroundColor: "transparent !important",
			},
			"&.Mui-checked": {
				"&:hover": {
					backgroundColor: "transparent !important",
				},
			},
		},
	},
	MuiFormLabel: {
		...theme.MuiFormLabel,
		root: {
			...theme.root,
			fontSize: theme.typography.fieldLabelSize,
			color: theme.palette.grey.icon,
			"&.Mui-focused": {
				color: theme.palette.grey.icon,
			},
		},
	},
	MuiPaper: {
		...theme.MuiPaper,
		rounded: {
			...theme.rounded,
			borderRadius: "3px",
		},
		outlined: {
			...theme.outlined,
			border: `1px solid ${theme.palette.grey.borders}`,
		},
	},
	MuiChip: {
		...theme.MuiChip,
		root: {
			...theme.root,
			height: theme.spacing(1.7),
			fontSize: theme.spacing(1.1),
			justifyContent: "left",
			texTransform: "capitalize",
			"&.Mui-disabled": {
				opacity: 1
			}
		},
		label: {
			...theme.label,
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
		}
	}
});

const createThemes = (applicationTheme, themeDefinition) => {
	const applicationMuiTheme = createMuiTheme(applicationTheme);

	const muiTheme = createMuiTheme({
		...commonTheme,
		...themeDefinition,
		palette: {
			...commonPalette,
			...themeDefinition.palette,
			hoverprimary: {
				lighter: darken(themeDefinition.palette.primary.lighter, 0.05),
				light: darken(themeDefinition.palette.primary.light, 0.05),
				main: darken(themeDefinition.palette.primary.main, 0.05),
				dark: darken(themeDefinition.palette.primary.dark, 0.05),
			},
			hovererror: {
				light: darken(commonPalette.error.light, 0.05),
				main: darken(commonPalette.error.main, 0.05),
				dark: darken(commonPalette.error.dark, 0.05),
			},
			hoverwarning: {
				light: darken(commonPalette.warning.light, 0.05),
				main: darken(commonPalette.warning.main, 0.05),
				dark: darken(commonPalette.warning.dark, 0.05),
			},
			hoversuccess: {
				light: darken(commonPalette.success.light, 0.05),
				main: darken(commonPalette.success.main, 0.05),
				dark: darken(commonPalette.success.dark, 0.05),
			},
			hoverinfo: {
				light: darken(commonPalette.info.light, 0.05),
				main: darken(commonPalette.info.main, 0.05),
				dark: darken(commonPalette.info.dark, 0.05),
			},
			hovergrey: {
				darker: darken(commonPalette.grey.darker, 0.05),
				dark: darken(commonPalette.grey.dark, 0.05),
				icon: darken(commonPalette.grey.icon, 0.05),
				borders: darken(commonPalette.grey.borders, 0.05),
				light: darken(commonPalette.grey.light, 0.05),
				lighter: darken(commonPalette.grey.lighter, 0.05),
			},
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
