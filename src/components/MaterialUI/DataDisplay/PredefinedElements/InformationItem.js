import React from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MultipleLinesText from "../TooltippedElements/MultipleLinesText";
import TextProps from "../../textProps";
import { isReactComponent } from "../../../../utils/propertyValidator";
import sharedMessages from "../../../../sharedMessages";
import { useIntl } from "react-intl";
import classNames from "classnames";

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
		alignItems: "center",
		marginBottom: theme.spacing(1),
	},
	headerTextContainer: {
		flexGrow: 0,
		"& > $title": {
			marginBottom: 0,
		},
	},
	headerIconContainer: {
		paddingLeft: theme.spacing(0.5),
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
	},
}));

const InformationItemChildren = ({
	classes,
	children,
	showNotAvailable,
	isMaxLineCountEnabled = true,
	tooltipClasses,
	valueClasses,
}) => {
	const { formatMessage } = useIntl();

	if (isReactComponent(children)) {
		return children;
	}

	const multipleLinesTextProps = new TextProps();
	if (isMaxLineCountEnabled) multipleLinesTextProps.set(TextProps.propNames.lineCount, 2);
	multipleLinesTextProps.set(TextProps.propNames.classes, classNames(classes.value, valueClasses));

	const value = children ?? (showNotAvailable ? formatMessage(sharedMessages.notAvailable) : "");

	return <MultipleLinesText textProps={multipleLinesTextProps} children={value} tooltipClasses={tooltipClasses} />;
};

const InformationItemHeader = ({ classes, label, headerIcon, headerIconClassName }) => {
	const formattedLabel = typeof label === "object" ? <FormattedMessage {...label} /> : label;
	const headerText = (formattedLabel && <Typography className={classes.title} children={formattedLabel} />) ?? null;

	if (headerIcon) {
		return (
			<div className={classes.headerRoot}>
				<div className={classes.headerTextContainer}>{headerText}</div>
				<div className={classNames(classes.headerIconContainer, headerIconClassName)}>{headerIcon}</div>
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
	headerIconClassName = undefined,
	showNotAvailable = false,
	marginTop = 0,
	isMaxLineCountEnabled,
	tooltipClasses,
	valueClasses,
}) => {
	const classes = useStyles({ required, error, marginTop });

	return (
		<div className={classes.container}>
			<InformationItemHeader
				classes={classes}
				label={label}
				headerIcon={headerIcon}
				headerIconClassName={headerIconClassName}
			/>
			<InformationItemChildren
				classes={classes}
				children={children}
				showNotAvailable={showNotAvailable}
				isMaxLineCountEnabled={isMaxLineCountEnabled}
				tooltipClasses={tooltipClasses}
				valueClasses={valueClasses}
			/>
		</div>
	);
};

export default React.memo(InformationItem);
