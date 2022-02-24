import React from "react";
import Link from "@material-ui/core/Link";
import Icon from "../DataDisplay/Icon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	icon: {
		paddingLeft: theme.spacing(1),
		width: theme.spacing(1.2),
		color: theme.palette.primary.main,
	},
}));

const ExternalLink = ({ id, url, children }) => {
	const classes = useStyles();

	return (
		<Link id={id} href={url} rel="noreferrer" target="_blank" underline="always">
			{children}
			<Icon id="open-in-new-tab" className={classes.icon} />
		</Link>
	);
};

export default ExternalLink;
