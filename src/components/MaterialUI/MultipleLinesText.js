import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { TextProps } from "./textProps";
import TextClamp from "react-multi-clamp";

const useStyles = makeStyles(theme => ({
	clampedText: {
		wordBreak: "break-word",
	},
}));

const MultipleLinesText = ({ children, textProps }) => {
	const classes = useStyles();

	if (textProps != null && textProps instanceof TextProps === false) {
		throw new TypeError("textProps property is not of type TextProps");
	}
	const customStyles = textProps?.get(TextProps.propNames.classes);
	const lineCount = textProps?.get(TextProps.propNames.lineCount) || "auto";

	return (
		<TextClamp
			disableCssClamp={true}
			clamp={lineCount}
			className={classNames(classes.clampedText, customStyles)}
		>
			{children}
		</TextClamp>
	);
};

export default MultipleLinesText;
