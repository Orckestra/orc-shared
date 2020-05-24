import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { TextProps } from "./textProps";

const useStyles = makeStyles(theme => ({
	text: {},
}));

const Text = ({ value, textProps }) => {
	if (textProps != null && textProps instanceof TextProps === false) {
		throw new Error("textProps property is not of type TextProps");
	}

	const classes = useStyles();

	var align = textProps?.get(TextProps.propNames.align);
	var color = textProps?.get(TextProps.propNames.color);
	var component = textProps?.get(TextProps.propNames.component);
	var display = textProps?.get(TextProps.propNames.display);
	var gutterBottom = textProps?.get(TextProps.propNames.gutterBottom);
	var noWrap = textProps?.get(TextProps.propNames.noWrap);
	var paragraph = textProps?.get(TextProps.propNames.paragraph);
	var variant = textProps?.get(TextProps.propNames.variant);

	var customStyles = textProps?.get(TextProps.propNames.classes);

	return (
		<Typography
			align={align == null ? "inherit" : align}
			color={color == null ? "initial" : color}
			component={component}
			display={display == null ? "initial" : display}
			gutterBottom={gutterBottom == null ? false : gutterBottom}
			noWrap={noWrap == null ? false : noWrap}
			paragraph={paragraph == null ? false : paragraph}
			variant={align == null ? "body1" : variant}
			classes={{
				root: classNames(classes.text, customStyles?.get(TextProps.ruleNames.root)),
				body2: classNames(customStyles?.get(TextProps.ruleNames.body2)),
				body1: classNames(customStyles?.get(TextProps.ruleNames.body1)),
				caption: classNames(customStyles?.get(TextProps.ruleNames.disabled)),
				button: classNames(customStyles?.get(TextProps.ruleNames.content)),
				h1: classNames(customStyles?.get(TextProps.ruleNames.h1)),
				h2: classNames(customStyles?.get(TextProps.ruleNames.h2)),
				h3: classNames(customStyles?.get(TextProps.ruleNames.h3)),
				h4: classNames(customStyles?.get(TextProps.ruleNames.h4)),
				h5: classNames(customStyles?.get(TextProps.ruleNames.h5)),
				h6: classNames(customStyles?.get(TextProps.ruleNames.h6)),
				subtitle1: classNames(customStyles?.get(TextProps.ruleNames.subtitle1)),
				subtitle2: classNames(customStyles?.get(TextProps.ruleNames.subtitle2)),
				overline: classNames(customStyles?.get(TextProps.ruleNames.overline)),
				srOnly: classNames(customStyles?.get(TextProps.ruleNames.srOnly)),
				alignLeft: classNames(customStyles?.get(TextProps.ruleNames.alignLeft)),
				alignCenter: classNames(customStyles?.get(TextProps.ruleNames.alignCenter)),
				alignRight: classNames(customStyles?.get(TextProps.ruleNames.alignRight)),
				alignJustify: classNames(customStyles?.get(TextProps.ruleNames.alignJustify)),
				noWrap: classNames(customStyles?.get(TextProps.ruleNames.noWrap)),
				gutterBottom: classNames(customStyles?.get(TextProps.ruleNames.gutterBottom)),
				paragraph: classNames(customStyles?.get(TextProps.ruleNames.paragraph)),
				colorInherit: classNames(customStyles?.get(TextProps.ruleNames.colorInherit)),
				colorPrimary: classNames(customStyles?.get(TextProps.ruleNames.colorPrimary)),
				colorSecondary: classNames(customStyles?.get(TextProps.ruleNames.colorSecondary)),
				colorTextPrimary: classNames(
					customStyles?.get(TextProps.ruleNames.colorTextPrimary),
				),
				colorTextSecondary: classNames(
					customStyles?.get(TextProps.ruleNames.colorTextSecondary),
				),
				colorError: classNames(customStyles?.get(TextProps.ruleNames.colorError)),
				displayInline: classNames(customStyles?.get(TextProps.ruleNames.displayInline)),
				displayBlock: classNames(customStyles?.get(TextProps.ruleNames.displayBlock)),
			}}
		>
			{value}
		</Typography>
	);
};

export default Text;
