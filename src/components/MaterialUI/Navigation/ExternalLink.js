import React from "react";
import Link from "@mui/material/Link";
import Icon from "../DataDisplay/Icon";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	link: {
		display: "flex",
	},
	iconContainer: {
		paddingTop: theme.spacing(0.5),
		paddingLeft: theme.spacing(1),
		width: theme.spacing(1.2),
		height: theme.spacing(1.2),
		color: theme.palette.primary.main,
	},
	icon: {
		color: "inherit",
	},
}));

const ExternalLink = ({ id, url, children }) => {
	const classes = useStyles();

	return (
		<Link id={id} href={url} rel="noreferrer" target="_blank" underline="always" className={classes.link}>
			{children}
			<div className={classes.iconContainer}>
				<Icon id="open-in-new-tab" className={classes.icon} />
			</div>
		</Link>
	);
};

export default ExternalLink;
