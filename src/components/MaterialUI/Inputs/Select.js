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
	selectPaper: {
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
		fontSize: theme.typography.fontSize,
		color: theme.palette.grey.dark,
		fontFamily: theme.typography.fontFamily,
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
	const value = selectProps?.get(SelectProps.propNames.value) ?? "";
	const sortType = selectProps?.get(SelectProps.propNames.sortType) || sortTypeEnum.none;
	const showAllValue = selectProps?.get(SelectProps.propNames.showAllValue);
	const showAllLabel = selectProps?.get(SelectProps.propNames.showAllLabel);
	const positionOverride = selectProps?.get(SelectProps.propNames.positionOverride) || {};
	const isIconSelect = selectProps?.get(SelectProps.propNames.iconSelect) || false;
	const disabled = selectProps?.get(SelectProps.propNames.disabled) || false;
	const error = selectProps?.get(SelectProps.propNames.error);
	const hasError = !!error;

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
		options.unshift({
			value: showAllValue,
			label: showAllLabel,
		});
	}

	const handleChange = event => {
		update(event.target.value);
	};

	const defaultMenuProps = {
		classes: { paper: classNames(classes.selectPaper, selectProps?.getStyle(SelectProps.ruleNames.paper)) },
		...MenuProps,
		...positionOverride,
	};

	const iconSelectMenuProps = {
		classes: { paper: classNames(classes.selectPaper, selectProps?.getStyle(SelectProps.ruleNames.paper)) },
		...positionOverride,
		...getIconButtonMenuProps(ref.current),
	};

	const items = options?.map(option => {
		let clss = option?.level ? classes["level" + option.level] : "";
		return (
			<MenuItem key={option.value} value={option.value} className={clss}>
				<TooltippedTypography noWrap className={classes.label} children={option.label} titleValue={option.label} />
			</MenuItem>
		);
	});

	const defaultSelect = (
		<SelectMUI
			value={value}
			onChange={handleChange}
			disableUnderline={true}
			IconComponent={SelectIcon}
			MenuProps={defaultMenuProps}
			disabled={disabled}
			error={hasError}
			classes={{
				icon: classes.icon,
				root: selectProps?.getStyle(SelectProps.ruleNames.root),
				disabled: classes.disabled,
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
			disabled={disabled}
			error={hasError}
			classes={{
				icon: classes.icon,
				root: selectProps?.getStyle(SelectProps.ruleNames.root),
				select: classes.displayNone,
				disabled: classes.disabled,
			}}
			onClick={() => setOpen(!open)}
		>
			{items}
		</SelectMUI>
	);

	const select = isIconSelect ? iconSelect : defaultSelect;

	return (
		(error && (
			<div className={classes.container}>
				{select}
				<div className={classNames(classes.errorText)}>{error}</div>
			</div>
		)) ||
		select
	);
};

export default Select;
