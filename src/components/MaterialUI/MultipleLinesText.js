import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { TextProps } from "./textProps";

import lineClamp from "clamp-js";

const useStyles = makeStyles(theme => ({}));

const MultipleLinesText = ({ children, ...props }) => {
	const classes = useStyles();
	const textProps = props.textProps;
	if (textProps != null && textProps instanceof TextProps === false) {
		throw new TypeError("textProps property is not of type TextProps");
	}
	var customStyles = textProps?.get(TextProps.propNames.classes);

	let elem = useRef(null);
	useEffect(() => {
		lineClamp(elem.current, { clamp: props.lineCount });
	});

	return (
		<Typography
			ref={elem}
			classes={{
				root: classNames(customStyles?.get(TextProps.ruleNames.root)),
				body1: classNames(customStyles?.get(TextProps.ruleNames.body1)),
			}}
		>
			{children}
		</Typography>
	);
};

export default MultipleLinesText;
