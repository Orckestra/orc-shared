import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { branchLengthSpacing } from "./settings";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	root: {
		position: "relative",
		display: "flex",
		alignItems: "center",
	},
	leaf: props => ({
		"&:last-child::after": {
			/* blocker - hides lowest part of vertical branch */
			content: '""',
			backgroundColor: props.dark ? theme.palette.grey.dark : "#fff",
			position: "absolute",
			top: "calc(50%)",
			left: `-${theme.spacing(branchLengthSpacing + 0.1)}`,
			bottom: 0,
			width: theme.spacing(0.1),
			height: "50%",
		},
	}),
}));

export const Root = ({ dark, leafClassName, children }) => {
	const classes = useStyles({ dark });

	return (
		<li className={classNames(classes.root, classes.leaf, leafClassName)} data-qa="leaf">
			{children}
		</li>
	);
};

export const Leaf = ({ dark, leafClassName, children }) => {
	return (
		<Root leafClassName={leafClassName} dark={dark}>
			{children}
		</Root>
	);
};
