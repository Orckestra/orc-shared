import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "../MaterialUI/DataDisplay/Icon";

const useStyles = makeStyles(theme => ({
	header: props => ({
		display: "flex",
		cursor: "pointer",
		boxSizing: "border-box",
		fontFamily: theme.typography.button.fontFamily,
		fontSize: "12px",
		textTransform: "uppercase",
		height: "40px",
		minWidth: "180px",
		paddingTop: "14px",
		paddingRight: "14px",
		color: props.open ? theme.palette.primary.light : theme.palette.text.disabled,

		"&:hover": {
			color: theme.palette.primary.light,
		},
	}),
	indicator: props => ({
		fontSize: "12px",
		padding: "0 11px",
		color: props.open ? theme.palette.text.disabled : theme.palette.primary.light,
	}),
}));

const Anchor = ({ menuLabel, open }) => {
	const classes = useStyles({ open });

	return (
		<div className={classes.header}>
			{menuLabel}
			<Icon id={open ? "chevron-up" : "dropdown-chevron-down"} className={classes.indicator} />
		</div>
	);
};

export default Anchor;
