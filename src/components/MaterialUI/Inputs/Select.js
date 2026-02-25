import React, { useState, useRef } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMUI from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import SelectProps, { sortTypeEnum, isSelectProps } from "./SelectProps";
import classNames from "classnames";
import TooltippedTypography from "./../DataDisplay/TooltippedElements/TooltippedTypography";
import Icon from "./../DataDisplay/Icon";
import IconButton from "@material-ui/core/IconButton";
import { ListSubheader } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import useWindowSize from "../../../hooks/useWindowSize";

const useStyles = makeStyles(theme => ({
	baseItem: props => ({
		...(props.autoWidth ? { maxWidth: theme.spacing(35) } : { maxWidth: theme.spacing(props.multipleWidthSpacing) }),
	}),
	level0: {},
	level1: {
		paddingLeft: theme.spacing(theme.indent),
	},
	level2: {
		paddingLeft: theme.spacing(theme.indent * 2),
	},
	level3: {
		paddingLeft: theme.spacing(theme.indent * 3),
	},
	level4: {
		paddingLeft: theme.spacing(theme.indent * 4),
	},
	level5: {
		paddingLeft: theme.spacing(theme.indent * 5),
	},
	level6: {
		paddingLeft: theme.spacing(theme.indent * 6),
	},
	level7: {
		paddingLeft: theme.spacing(theme.indent * 7),
	},
	level8: {
		paddingLeft: theme.spacing(theme.indent * 8),
	},
	container: {
		display: "flex",
		flexDirection: "column",
	},
	selectPaper: props => ({
		border: `1px solid ${theme.palette.grey.borders}`,
		"& ul": {
			minWidth: theme.spacing(17.5),
			maxHeight: theme.spacing(30),
			paddingTop: 0,
			paddingBottom: 0,
		},
		"& li": {
			fontSize: theme.typography.fontSize,
			fontFamily: theme.typography.fontFamily,
			textTransform: "none",
			color: theme.palette.grey.dark,
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			borderRadius: 0,
			whiteSpace: "normal",
			"&:hover": {
				backgroundColor: theme.palette.primary.main,
			},
			"&:focus, &:active": {
				borderRadius: 0,
				boxShadow: props.multiple ? "none" : `0 0 ${theme.spacing(0.4)} #4fa1f0`,
				"&:hover": {
					backgroundColor: theme.palette.primary.main,
				},
			},
		},
		...(props.autoWidth
			? {
					minWidth: `auto !important`,
					width: `auto !important`,
				}
			: {}),
	}),
	label: {
		fontSize: theme.typography.fontSize,
		color: theme.palette.grey.dark,
		fontFamily: theme.typography.fontFamily,
		".Mui-disabled &": {
			color: theme.palette.grey.borders,
		},
	},
	emptyLabel: {
		fontStyle: "italic",
	},
	icon: {
		right: theme.spacing(1),
		width: theme.spacing(1.2),
		padding: `${theme.spacing(0.5)} 0`,
		color: theme.palette.primary.main,
		zIndex: 999,
	},
	errorText: {
		marginTop: theme.spacing(0.5),
		color: theme.palette.error.main,
		fontSize: theme.typography.fieldLabelSize,
		float: "left",
	},
	displayNone: {
		display: "none",
	},
	disabled: {
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.grey.light,
		border: 0,
	},
	formControl: props => ({
		maxWidth: theme.spacing(props.multipleWidthSpacing),
		minWidth: theme.spacing(props.multipleWidthSpacing),
	}),
}));

const MenuProps = {
	getContentAnchorEl: null,
	anchorOrigin: {
		vertical: "bottom",
		horizontal: "right",
	},
	transformOrigin: {
		vertical: "top",
		horizontal: "right",
	},
};

const getIconButtonMenuProps = anchorRef => ({
	getContentAnchorEl: null,
	anchorEl: anchorRef,
	anchorOrigin: {
		vertical: "bottom",
		horizontal: "right",
	},
	transformOrigin: {
		vertical: "top",
		horizontal: "right",
	},
});

const SelectIcon = props => {
	return <Icon id="dropdown-chevron-down" {...props} />;
};

export const SelectIconButton = props => {
	const classes = useStyles();

	return (
		<IconButton className={classes.iconButton} variant="outlined" onClick={props.clickHandler}>
			<Icon id="arrow-more" />
		</IconButton>
	);
};

export const renderMultipleValues = (value, options) => {
	return options
		.filter(x => value.indexOf(x.value) !== -1)
		.map(x => x.label)
		.join(", ");
};

const selectEmptyValue = "~~#~~";

const Select = ({ options = [], selectProps, children }) => {
	if (isSelectProps(selectProps) === false) {
		throw new TypeError("selectProps property is not of type SelectProps");
	}

	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	const update = selectProps?.get(SelectProps.propNames.update);
	const value = selectProps?.get(SelectProps.propNames.value) ?? "";
	const sortType = selectProps?.get(SelectProps.propNames.sortType) || sortTypeEnum.none;
	const showAllValue = selectProps?.get(SelectProps.propNames.showAllValue);
	const showAllLabel = selectProps?.get(SelectProps.propNames.showAllLabel);
	const positionOverride = selectProps?.get(SelectProps.propNames.positionOverride) || {};
	const isIconSelect = selectProps?.get(SelectProps.propNames.iconSelect) || false;
	const disabled = selectProps?.get(SelectProps.propNames.disabled) || false;
	const error = selectProps?.get(SelectProps.propNames.error);
	const native = selectProps?.get(SelectProps.propNames.native);
	const onClose = selectProps?.get(SelectProps.propNames.onClose);
	const inputProps = selectProps?.get(SelectProps.propNames.inputProps);
	const multiple = selectProps?.get(SelectProps.propNames.multiple) || false;
	const renderValue = selectProps?.get(SelectProps.propNames.renderValue);
	const autoWidth = selectProps?.get(SelectProps.propNames.autoWidth);
	const autoFocus = selectProps?.get(SelectProps.propNames.autoFocus);
	const multipleSelectWidth = selectProps?.get(SelectProps.propNames.multipleSelectWidth);
	const hasError = !!error;

	const windowSize = useWindowSize();

	const multipleSelectWidthFactor = windowSize.innerWidth > 1400 ? 1 : 0.75;
	const classes = useStyles({
		multiple,
		autoWidth,
		multipleWidthSpacing: (multipleSelectWidth / 10) * multipleSelectWidthFactor,
	});

	const buildOptionsItems = () => {
		const allOptions = showAllValue && showAllLabel ? [...options] : options;

		if (sortType === sortTypeEnum.numeric) {
			allOptions.sort((a, b) =>
				a.sortOrder.localeCompare(b.sortOrder, undefined, {
					numeric: true,
					sensitivity: "base",
				}),
			);
		} else if (sortType === sortTypeEnum.default) {
			allOptions.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1));
		} else if (sortType === sortTypeEnum.alphabetical) {
			allOptions.sort((a, b) => {
				if (a.value === selectEmptyValue) {
					return -1;
				}
				if (b.value === selectEmptyValue) {
					return 1;
				}
				return a.label.localeCompare(b.label);
			});
		}

		if (showAllValue && showAllLabel) {
			allOptions.unshift({
				value: showAllValue,
				label: showAllLabel,
			});
		}

		return allOptions?.map(option => {
			let clss = option?.level ? classes["level" + option.level] : "";
			const appliedClasses = classNames(classes.baseItem, clss);
			const labelClss = classNames({
				[classes.label]: true,
				[classes.emptyLabel]: option.value === "" || option.value === selectEmptyValue,
			});

			const disabled = !!option.disabled;
			const groupHeader = !!option.isGroupHeader;
			if (groupHeader) {
				return (
					<ListSubheader key={option.value} className={appliedClasses}>
						{option.label}
					</ListSubheader>
				);
			} else {
				return (
					<MenuItem key={option.value} value={option.value} className={appliedClasses} disabled={disabled}>
						<TooltippedTypography noWrap className={labelClss} children={option.label} titleValue={option.label} />
					</MenuItem>
				);
			}
		});
	};

	const handleChange = event => {
		update(event.target.value);
	};

	const defaultMenuProps = {
		classes: { paper: classNames(classes.selectPaper, selectProps?.getStyle(SelectProps.ruleNames.paper)) },
		autoFocus,
		...MenuProps,
		...positionOverride,
	};

	const iconSelectMenuProps = {
		classes: { paper: classNames(classes.selectPaper, selectProps?.getStyle(SelectProps.ruleNames.paper)) },
		autoFocus,
		...positionOverride,
		...getIconButtonMenuProps(ref.current),
	};

	const items = native ? null : buildOptionsItems();

	const iconSelect = isIconSelect && (
		<SelectMUI
			open={open}
			value={value}
			ref={ref}
			onChange={handleChange}
			disableUnderline={true}
			IconComponent={SelectIconButton}
			MenuProps={iconSelectMenuProps}
			disabled={disabled}
			error={hasError}
			native={native}
			inputProps={inputProps}
			multiple={multiple}
			classes={{
				icon: classes.icon,
				root: selectProps?.getStyle(SelectProps.ruleNames.root),
				select: classes.displayNone,
				disabled: classes.disabled,
			}}
			onClick={() => setOpen(!open)}
		>
			{items ?? children}
		</SelectMUI>
	);

	// Render the normal select is the icon one is NULL
	const selectToRender = iconSelect || (
		<SelectMUI
			value={value}
			onChange={handleChange}
			onClose={onClose}
			disableUnderline={true}
			IconComponent={SelectIcon}
			autoWidth={autoWidth}
			MenuProps={defaultMenuProps}
			disabled={disabled}
			error={hasError}
			native={native}
			inputProps={inputProps}
			multiple={multiple}
			renderValue={renderValue ?? (multiple ? value => renderMultipleValues(value, options) : undefined)}
			classes={{
				icon: classes.icon,
				root: selectProps?.getStyle(SelectProps.ruleNames.root),
				disabled: classes.disabled,
			}}
		>
			{items ?? children}
		</SelectMUI>
	);

	const selectToRenderWithError = hasError && (
		<div className={classes.container}>
			{selectToRender}
			<div className={classNames(classes.errorText)}>{error}</div>
		</div>
	);

	const selectControl = selectToRenderWithError || selectToRender;

	return multiple === false ? (
		selectControl
	) : (
		<FormControl className={classes.formControl}>{selectControl}</FormControl>
	);
};

export default Select;
