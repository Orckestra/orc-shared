import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { TextProps } from "./textProps";

const useStyles = props =>
	makeStyles(theme => ({
		lineClamp: {
			display: "block",
			position: "relative",
			overflow: "hidden",
			textOverflow: "ellipsis",
			padding: "0 !important",
			height: "calc(1em * 1.2 * " + props.lineCount + ")",
			"&::after": {
				content: "'...'",
				textAlign: "right",
				bottom: "0",
				right: "0",
				width: "25%",
				display: "block",
				position: "absolute",
				height: "calc(1em * 1.2)",
				background:
					"linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 75 %)",
			},
		},
		"@supports (-webkit-line-clamp: 1)": {
			lineClamp: {
				height: "inherit",
				"&::after": {
					display: "none !important",
				},
			},
		},
		lineClampWebkit: {
			WebkitLineClamp: props.lineCount,
			display: "-webkit-box",
			WebkitBoxOrient: "vertical",
		},
	}));

const NLinesText = ({ children, ...props }) => {
	const classes = useStyles(props)();
	const textProps = props.textProps;

	if (textProps != null && textProps instanceof TextProps === false) {
		throw new Error("textProps property is not of type TextProps");
	}
	var customStyles = textProps?.get(TextProps.propNames.classes);
	return (
		<Typography
			classes={{
				root: classNames(
					classes.lineClamp,
					classes.lineClampWebkit,
					customStyles?.get(TextProps.ruleNames.root),
				),
				body2: classNames(customStyles?.get(TextProps.ruleNames.body2)),
				body1: classNames(customStyles?.get(TextProps.ruleNames.body1)),
			}}
		>
			{children}
		</Typography>
	);
};

export default NLinesText;
