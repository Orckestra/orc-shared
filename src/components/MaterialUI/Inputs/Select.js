import React, { useState, useRef } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMUI from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import SelectProps, { sortTypeEnum, isSelectProps } from "./SelectProps";
import classNames from "classnames";
import TooltippedTypography from "./../DataDisplay/TooltippedElements/TooltippedTypography";
import Icon from "./../DataDisplay/Icon";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
	selectPaper: {
		border: `1px solid ${theme.palette.grey.borders}`,
		"& ul": {
			minWidth: theme.spacing(17.5),
			maxWidth: theme.spacing(24),
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
				backgroundColor: theme.palette.primary.light,
			},
			"&:focus, &:active": {
				borderRadius: 0,
				"&:hover": {
					backgroundColor: theme.palette.primary.light,
				},
			},
		},
	},
	label: {
		fontFamily: theme.typography.button.fontFamily,
		fontWeight: theme.typography.button.fontWeight,
		fontSize: theme.typography.button.fontSize,
	},
	icon: {
		right: theme.spacing(1),
		width: theme.spacing(1.2),
		padding: `${theme.spacing(0.5)} 0`,
		color: theme.palette.primary.main,
		zIndex: 999,
	},
	displayNone: {
		display: "none"
	}
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

const getIconButtonMenuProps = (anchorRef) => (
	{
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

const SelectIconButton = (props) => {
	const classes = useStyles();

	return (
		<IconButton className={classes.iconButton} onClick={props.clickHandler}>
			<Icon id="arrow-more" />
		</IconButton>
	);
};

const Select = ({ options, selectProps }) => {
	if (isSelectProps(selectProps) === false) {
		throw new TypeError("selectProps property is not of type SelectProps");
	}

	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	const classes = useStyles();

	const update = selectProps?.get(SelectProps.propNames.update);
	const value = selectProps?.get(SelectProps.propNames.value);
	const sortType = selectProps?.get(SelectProps.propNames.sortType) || sortTypeEnum.none;
	const showAllValue = selectProps?.get(SelectProps.propNames.showAllValue);
	const showAllLabel = selectProps?.get(SelectProps.propNames.showAllLabel);
	const positionOverride = selectProps?.get(SelectProps.propNames.positionOverride) || {};
	const isIconSelect = selectProps?.get(SelectProps.propNames.iconSelect) || false;

	if (sortType === sortTypeEnum.numeric) {
		options.sort((a, b) =>
			a.sortOrder.localeCompare(b.sortOrder, undefined, {
				numeric: true,
				sensitivity: "base",
			}),
		);
	} else if (sortType === sortTypeEnum.default) {
		options.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1));
	}

	if (showAllValue && showAllLabel) {
		if (options.find(o => o.value === showAllValue) == null) {
			options.unshift({
				value: showAllValue,
				label: showAllLabel,
			});
		}
	}

	const handleChange = event => {
		update(event.target.value);
	};

	const defaultMenuProps = {
		classes: { paper: classNames(classes.selectPaper, selectProps?.getStyle(SelectProps.ruleNames.paper)) },
		...MenuProps,
		...positionOverride
	};

	const iconSelectMenuProps = {
		classes: { paper: classNames(classes.selectPaper, selectProps?.getStyle(SelectProps.ruleNames.paper)) },
		...positionOverride,
		...getIconButtonMenuProps(ref.current)
	};

	const items = options.map(option => (
		<MenuItem key={option.value} value={option.value}>
			<TooltippedTypography noWrap children={option.label} titleValue={option.label} />
		</MenuItem>
	));

	const defaultSelect = (
		<SelectMUI
			value={value}
			onChange={handleChange}
			disableUnderline={true}
			IconComponent={SelectIcon}
			MenuProps={defaultMenuProps}
			classes={{
				icon: classes.icon,
				root: selectProps?.getStyle(SelectProps.ruleNames.root),
			}}
		>
			{items}
		</SelectMUI>
	);

	const iconSelect = (
		<SelectMUI
			open={open}
			value={value}
			ref={ref}
			onChange={handleChange}
			disableUnderline={true}
			IconComponent={SelectIconButton}
			MenuProps={iconSelectMenuProps}
			classes={{
				icon: classes.icon,
				root: selectProps?.getStyle(SelectProps.ruleNames.root),
				select: classes.displayNone
			}}
			onClick={() => setOpen(!open)}
		>
			{items}
		</SelectMUI>
	);

	return isIconSelect ? iconSelect : defaultSelect;
};

export default Select;
