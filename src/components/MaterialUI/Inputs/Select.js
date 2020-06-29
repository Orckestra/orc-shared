import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMUI from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import SelectProps from "./SelectProps";

const useStyles = makeStyles(theme => ({
	select: {
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
			"&:hover": {
				backgroundColor: theme.palette.grey.light,
				color: theme.palette.grey.dark,
			},
			"&:focus, &:active": {
				borderRadius: 0,
				"&:hover": {
					color: theme.palette.grey.dark,
					backgroundColor: darken(theme.palette.grey.light,0.05),
				},
			},
		},
	},
	input: {
		borderRadius: theme.shape.borderRadius,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: `1px solid ${theme.palette.grey.borders}`,
		fontSize: theme.typography.fontSize,
		minWidth: theme.spacing(15),
		maxWidth: theme.spacing(20),
		padding: theme.spacing(0.6 ,0.6, 0.6, 0.6),
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:focus": {
			borderRadius: theme.shape.borderRadius,
			borderColor: theme.palette.focus,
			boxShadow: `0 0 4px ${theme.palette.focus}`,
			outline: "none",
		},
	},
}));

const MenuProps = {
	getContentAnchorEl: null,
	anchorOrigin: {
		vertical: "bottom",
		horizontal: "right"
	},
	transformOrigin: {
		vertical: "top",
		horizontal: "right"
	},
};

const ChevronDown = props => (
	<div
		{...props}
		style={{
			fontSize: "32px",
			fontFamily: "courier,monospace",
			//fontWeight: 'bold',
			color: "black",
			height: "10px",
			width: "20px",
			marginRight: "5px",
			padding: "12px 0 0",
		}}
	>
		ˇ
	</div>
);

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
		>
			{options.map(option => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</SelectMUI>
	);
};

export default Select;
