import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import TextProps, { isTextProps } from "../../textProps";
import TextClamp from "react-multi-clamp";
import withDeferredTooltip from "../../hocs/withDeferredTooltip";

const useStyles = makeStyles(theme => ({
	clampedText: {
		wordBreak: "break-word",
	},
}));

const MultipleLinesText = ({ children, titleValue, textProps }) => {
	const classes = useStyles();

	const [isClamped, setIsClamped] = useState(false);

	if (isTextProps(textProps) === false) {
		throw new TypeError("textProps property is not of type TextProps");
	}
	const customStyles = textProps?.get(TextProps.propNames.classes);
	const lineCount = textProps?.get(TextProps.propNames.lineCount) || "auto";

	const title = titleValue == null ? children : titleValue;

	const TooltippedTextClamp = withDeferredTooltip(
		React.forwardRef((props, ref) => {
			return <TextClamp ref={ref} {...props} />;
		}),
	);

	const clampHandler = useCallback(
		event => {
			if (isClamped === false && event.needClamp) {
				setIsClamped(true);
			}
		},
		[isClamped, setIsClamped],
	);

	return (
		<TooltippedTextClamp
			disableCssClamp={true}
			clamp={lineCount}
			className={classNames(classes.clampedText, customStyles)}
			children={children.toString()}
			titleValue={title}
			alwaysDisplay={isClamped}
			onClampStart={event => clampHandler(event)}
		/>
	);
};

export default MultipleLinesText;
