import React from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MultipleLinesText from "../TooltippedElements/MultipleLinesText";
import TextProps from "../../textProps";
import { isReactComponent } from "../../../../utils/propertyValidator";
import sharedMessages from "../../../../sharedMessages";
import { useIntl } from "react-intl";

const useStyles = makeStyles(theme => ({
	title: {
		fontSize: theme.typography.fieldLabelSize,
		color: props => (!props.error ? theme.palette.text.hint : theme.palette.error.main),
		fontFamily: theme.typography.fontFamily,
		marginBottom: theme.spacing(0.7),

		"&:after": {
			content: props => props.required && '" *"',
			color: theme.palette.error.main,
		},
	},
	value: {
		fontSize: theme.typography.fontSize,
		color: theme.palette.grey.dark,
		fontFamily: theme.typography.fontFamily,
	},
	container: {
		width: "100%",
		marginTop: props => theme.spacing(props.marginTop),
	},
}));

const InformationItem = ({ label, children, required, error, showNotAvailable = false, marginTop = 0 }) => {
	const classes = useStyles({ required, error, marginTop });
	const { formatMessage } = useIntl();

	const formattedLabel = typeof label === "object" ? <FormattedMessage {...label} /> : label;

	const value = children ?? (showNotAvailable ? formatMessage(sharedMessages.notAvailable) : "");

	const multipleLinesTextProps = new TextProps();
	multipleLinesTextProps.set(TextProps.propNames.lineCount, 2);
	multipleLinesTextProps.set(TextProps.propNames.classes, classes.value);

	return (
		<div className={classes.container}>
			{formattedLabel && <Typography className={classes.title} children={formattedLabel} />}
			{isReactComponent(children) ? (
				children
			) : (
				<MultipleLinesText textProps={multipleLinesTextProps} children={value} />
			)}
		</div>
	);
};

export default React.memo(InformationItem);
