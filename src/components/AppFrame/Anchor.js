import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "../MaterialUI/DataDisplay/Icon";

const useStyles = makeStyles(theme => ({
	header: props => ({
		display: "flex",
		cursor: "pointer",
		boxSizing: "border-box",
		fontFamily: theme.typography.button.fontFamily,
		fontSize: theme.spacing(1.2),
		textTransform: "uppercase",
		height: theme.spacing(4),
		minWidth: theme.spacing(18),
		paddingTop: theme.spacing(1.4),
		paddingRight: theme.spacing(1.4),
		color: props.open ? theme.palette.primary.light : theme.palette.text.disabled,

		"&:hover": {
			color: theme.palette.primary.light,
		},
	}),
	indicator: props => ({
		fontSize: theme.spacing(1.2),
		padding: theme.spacing(0, 1.1),
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
