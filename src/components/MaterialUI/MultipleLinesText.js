import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import TextClamp from "react-multi-clamp";

const useStyles = makeStyles(theme => ({
	clampedText: {
		wordBreak: "break-word",
	},
}));

const MultipleLinesText = ({ children, ...props }) => {
	const classes = useStyles();

	return (
		<TextClamp
			disableCssClamp={true}
			clamp={props.lineCount}
			className={classNames(classes.clampedText, props.className)}
		>
			{children}
		</TextClamp>
	);
};

export default MultipleLinesText;
