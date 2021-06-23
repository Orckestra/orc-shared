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
		marginBottom: theme.spacing(1),

		"&:after": {
			content: props => props.required && '" *"',
			color: theme.palette.error.main,
		},
	},
	value: {
		fontSize: theme.typography.fontSize,
		color: theme.palette.grey.dark,
		fontFamily: theme.typography.fontFamily,
		minHeight: theme.spacing(1.8),
	},
	container: {
		width: "100%",
		marginTop: props => theme.spacing(props.marginTop),
		"& + &": {
			marginTop: theme.spacing(2),
		},
	},
	headerRoot: {
		display: "flex",
		flexDirection: "row",
	},
	headerTextContainer: {
		flexGrow: 0,
	},
	headerIconContainer: {
		paddingLeft: theme.spacing(0.5),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
}));

const InformationItemChildren = ({ classes, children, showNotAvailable }) => {
	const { formatMessage } = useIntl();

	if (isReactComponent(children)) {
		return children;
	}

	const multipleLinesTextProps = new TextProps();
	multipleLinesTextProps.set(TextProps.propNames.lineCount, 2);
	multipleLinesTextProps.set(TextProps.propNames.classes, classes.value);

	const value = children ?? (showNotAvailable ? formatMessage(sharedMessages.notAvailable) : "");

	return <MultipleLinesText textProps={multipleLinesTextProps} children={value} />;
};

const InformationItemHeader = ({ classes, label, headerIcon }) => {
	const formattedLabel = typeof label === "object" ? <FormattedMessage {...label} /> : label;
	const headerText = (formattedLabel && <Typography className={classes.title} children={formattedLabel} />) ?? null;

	if (headerIcon) {
		return (
			<div className={classes.headerRoot}>
				<div className={classes.headerTextContainer}>{headerText}</div>
				<div className={classes.headerIconContainer}>{headerIcon}</div>
			</div>
		);
	}

	return headerText;
};

const InformationItem = ({
	label,
	children,
	required,
	error,
	headerIcon = undefined,
	showNotAvailable = false,
	marginTop = 0,
}) => {
	const classes = useStyles({ required, error, marginTop });

	return (
		<div className={classes.container}>
			<InformationItemHeader classes={classes} label={label} headerIcon={headerIcon} />
			<InformationItemChildren classes={classes} children={children} showNotAvailable={showNotAvailable} />
		</div>
	);
};

export default React.memo(InformationItem);
