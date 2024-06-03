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
		color: theme.palette.text.hint,
		fontFamily: theme.typography.fontFamily,
		marginBottom: theme.spacing(1),
	},
	titleError: {
		color: theme.palette.error.main,
	},
	titleRequired: {
		paddingLeft: theme.spacing(0.5),
		color: theme.palette.error.main,
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

const InformationItemHeader = ({ classes, label, headerIcon, headerIconClassName, required, error }) => {
	const formattedLabel = typeof label === "object" ? <FormattedMessage {...label} /> : label;
	const titleClasses = classNames(classes.title, { [classes.titleError]: error });
	const headerText =
		(formattedLabel && (
			<Typography
				className={titleClasses}
				children={
					<>
						{formattedLabel}
						{required && (
							<span data-qa="required" className={classes.titleRequired}>
								*
							</span>
						)}
					</>
				}
			/>
		)) ??
		null;

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
				required={required}
				error={error}
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
