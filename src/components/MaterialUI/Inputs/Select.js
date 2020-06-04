import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMUI from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	select: {
		"& ul": {
			//top: '20px',
			minWidth: "175px",
			maxHeight: "300px",
		},
		"& li": {
			fontSize: 12,
			"&:hover": {
				backgroundColor: theme.palette.primary.main,
			},
		},
	},
	input: {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #ced4da",
		fontSize: 12,
		minWidth: "150px",
		maxWidth: "200px",
		padding: "6px 6px 6px 6px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
		},
	},
}));

const MenuProps = {
	getContentAnchorEl: null,
	anchorOrigin: {
		vertical: "bottom",
		horizontal: "left",
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

const Select = ({ options, update, value }) => {
	const classes = useStyles();

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
