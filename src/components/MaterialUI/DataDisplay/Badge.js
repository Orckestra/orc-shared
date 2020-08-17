import React from "react";
import BadgeMui from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	badge: {
		color: theme.palette.background.default,
		height: theme.spacing(2.8),
		borderRadius: theme.spacing(2.8),
		padding: theme.spacing(1),
	},
}));

const Badge = ({ children, badge }) => {
	const classes = useStyles();

	return (
		<BadgeMui overlap="circle" color="primary" max={999} badgeContent={badge} classes={{ badge: classes.badge }}>
			{children}
		</BadgeMui>
	);
};

export default Badge;
