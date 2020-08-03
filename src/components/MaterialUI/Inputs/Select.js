import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMUI from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import SelectProps, { sortTypeEnum } from "./SelectProps";
import TooltippedTypography from "./../DataDisplay/TooltippedElements/TooltippedTypography";
import Icon from "./../DataDisplay/Icon";

const useStyles = makeStyles(theme => ({
	select: {
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
				backgroundColor: theme.palette.grey.light,
				color: theme.palette.grey.dark,
			},
			"&:focus, &:active": {
				borderRadius: 0,
				"&:hover": {
					color: theme.palette.grey.dark,
					backgroundColor: theme.palette.hovergrey.light,
				},
			},
		},
	},
	input: {
		borderRadius: 0,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: `1px solid ${theme.palette.grey.borders}`,
		fontSize: theme.typography.fontSize,
		minWidth: theme.spacing(15),
		maxWidth: theme.spacing(50),
		padding: theme.spacing(0.6, 0.6, 0.6, 0.6),
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:focus": {
			borderRadius: 0,
			borderColor: theme.palette.focus,
			boxShadow: `0 0 4px ${theme.palette.focus}`,
			outline: "none",
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

const ChevronDown = props => {
	return <Icon id="chevron-down" {...props} />;
};

const Select = ({ options, selectProps }) => {
	if (selectProps != null && selectProps instanceof SelectProps === false) {
		throw new TypeError("selectProps property is not of type SelectProps");
	}

	const classes = useStyles();

	const update = selectProps?.get(SelectProps.propNames.update);
	const value = selectProps?.get(SelectProps.propNames.value);
	const sortType = selectProps?.get(SelectProps.propNames.sortType) || sortTypeEnum.none;
	const showAllValue = selectProps?.get(SelectProps.propNames.showAllValue);
	const showAllLabel = selectProps?.get(SelectProps.propNames.showAllLabel);
	const classesProps = selectProps?.get(SelectProps.propNames.classes);

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

	return (
		<SelectMUI
			value={value}
			autoWidth={true}
			onChange={handleChange}
			disableUnderline={true}
			IconComponent={ChevronDown}
			MenuProps={{ classes: { paper: classes.select }, ...MenuProps }}
			classes={{ icon: classes.icon, root: classesProps?.root }}
		>
			{options.map(option => (
				<MenuItem key={option.value} value={option.value}>
					<TooltippedTypography noWrap children={option.label} titleValue={option.label} />
				</MenuItem>
			))}
		</SelectMUI>
	);
};

export default Select;
