import React from "react";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MultipleLinesText from "../TooltippedElements/MultipleLinesText";
import TextProps from "../../textProps";
import { isReactComponent } from "../../../../utils/propertyValidator";

const useStyles = makeStyles(theme => ({
	title: {
		fontSize: theme.typography.fieldLabelSize,
		color: props => (!props.error ? theme.palette.text.hint : theme.palette.error.main),
		fontFamily: theme.typography.fontFamily,
		marginBottom: theme.spacing(0.7),

		"&:after": {
			content: props => props.required && '" *"',
		},
	},
	value: {
		fontSize: theme.typography.fontSize,
		color: theme.palette.grey.dark,
		fontFamily: theme.typography.fontFamily,
	},
}));

const InformationItem = ({ label, children, required, error }) => {
	const classes = useStyles({ required, error });

	const formattedLabel = typeof label === "object" ? <FormattedMessage {...label} /> : label;

	const multipleLinesTextProps = new TextProps();
	multipleLinesTextProps.set(TextProps.propNames.lineCount, 2);
	multipleLinesTextProps.set(TextProps.propNames.classes, classes.value);

	return (
		<Grid item className={classes.container}>
			{formattedLabel && <Typography className={classes.title} children={formattedLabel} />}
			{isReactComponent(children) ? (
				children
			) : (
				<MultipleLinesText textProps={multipleLinesTextProps} children={children} />
			)}
		</Grid>
	);
};

export default React.memo(InformationItem);
