import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMUI from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import SelectProps from "./SelectProps";
import TooltippedTypography from "./../DataDisplay/TooltippedElements/TooltippedTypography";
import Icon from "./../DataDisplay/Icon";

const useStyles = makeStyles(theme => ({
	select: {
		"& ul": {
			minWidth: theme.spacing(17.5),
			maxHeight: theme.spacing(30),
		},
		"& li": {
			fontSize: theme.typography.fieldLabelSize,
			"&:hover": {
				backgroundColor: theme.palette.primary.main,
			},
		},
	},
	input: {
		borderRadius: "4px",
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: `1px solid ${theme.palette.grey.borders}`,
		fontSize: theme.typography.fieldLabelSize,
		minWidth: theme.spacing(15),
		maxWidth: theme.spacing(20),
		padding: theme.spacing(0.6),
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:focus": {
			borderRadius: "4px",
			borderColor: theme.palette.primary.light,
			boxShadow: `0 0 0 0.2rem rgba(${theme.palette.primary.main},.25)`,
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
	},
}));

const MenuProps = {
	getContentAnchorEl: null,
	anchorOrigin: {
		vertical: "bottom",
		horizontal: "left",
	},
};

const ChevronDown = props => {
	return <Icon id="dropdown-chevron-down" {...props} />;
};

const Select = ({ options, selectProps }) => {
	if (selectProps != null && selectProps instanceof SelectProps === false) {
		throw new TypeError("selectProps property is not of type SelectProps");
	}

	const classes = useStyles();

	const update = selectProps?.get(SelectProps.propNames.update);
	const value = selectProps?.get(SelectProps.propNames.value);

	const handleChange = event => {
		update(event.target.value);
	};

	return (
		<SelectMUI
			value={value}
			onChange={handleChange}
			disableUnderline={true}
			IconComponent={ChevronDown}
			MenuProps={{ classes: { paper: classes.select }, ...MenuProps }}
			classes={{ icon: classes.icon }}
		>
			{options.map(option => (
				<MenuItem key={option.value} value={option.value}>
					<TooltippedTypography
						children={option.label}
						noWrap
						titleValue={option.label}
						classes={{ body1: classes.label }}
					/>
				</MenuItem>
			))}
		</SelectMUI>
	);
};

export default Select;
