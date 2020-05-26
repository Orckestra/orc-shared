import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Icon from "orc-shared/src/components/Icon";
import classNames from "classnames";
import {
	ExpansionPanelProps,
	ExpansionPanelActionsProps,
	ExpansionPanelDetailsProps,
	ExpansionPanelSummaryProps,
} from "./expansionPanelProps";

const useStyles = makeStyles(theme => ({
	expansionPanelHeader: {},
}));

const SectionExpansionPanel = ({
	header,
	content,
	actions,
	expansionPanelProps,
	expansionPanelActionsProps,
	expansionPanelDetailsProps,
	expansionPanelSummaryProps,
}) => {
	if (
		expansionPanelProps != null &&
		expansionPanelProps instanceof ExpansionPanelProps === false
	) {
		throw new Error("expansionPanelProps property is not of type ExpansionPanelProps");
	}

	if (
		expansionPanelActionsProps != null &&
		expansionPanelActionsProps instanceof ExpansionPanelActionsProps === false
	) {
		throw new Error(
			"expansionPanelActionsProps property is not of type ExpansionPanelActionsProps",
		);
	}

	if (
		expansionPanelDetailsProps != null &&
		expansionPanelDetailsProps instanceof ExpansionPanelDetailsProps === false
	) {
		throw new Error(
			"expansionPanelDetailsProps property is not of type ExpansionPanelDetailsProps",
		);
	}

	if (
		expansionPanelSummaryProps != null &&
		expansionPanelSummaryProps instanceof ExpansionPanelSummaryProps === false
	) {
		throw new Error(
			"expansionPanelSummaryProps property is not of type ExpansionPanelSummaryProps",
		);
	}

	const classes = useStyles();

	// Expansion panel props
	var defaultExpanded = expansionPanelProps?.get(
		ExpansionPanelProps.propNames.defaultExpanded,
	);
	var disabled = expansionPanelProps?.get(ExpansionPanelProps.propNames.disabled);
	var expanded = expansionPanelProps?.get(ExpansionPanelProps.propNames.expanded);
	var onChange = expansionPanelProps?.get(ExpansionPanelProps.propNames.onChange);
	var square = expansionPanelProps?.get(ExpansionPanelProps.propNames.square);
	var transitionComponent = expansionPanelProps?.get(
		ExpansionPanelProps.propNames.transitionComponent,
	);
	var transitionProps = expansionPanelProps?.get(
		ExpansionPanelProps.propNames.transitionProps,
	);

	var customStyles = expansionPanelProps?.get(ExpansionPanelProps.propNames.classes);

	// Expansion panel summary props
	var expandIcon = expansionPanelSummaryProps?.get(
		ExpansionPanelSummaryProps.propNames.expandIcon,
	);
	var iconButtonProps = expansionPanelSummaryProps?.get(
		ExpansionPanelSummaryProps.propNames.iconButtonProps,
	);

	var summaryCustomStyles = expansionPanelSummaryProps?.get(
		ExpansionPanelSummaryProps.propNames.classes,
	);

	// Expansion panel details props
	var detailsCustomStyles = expansionPanelDetailsProps?.get(
		ExpansionPanelDetailsProps.propNames.classes,
	);

	// Expansion panel actions props
	var disableSpacing = expansionPanelActionsProps?.get(
		ExpansionPanelActionsProps.propNames.disableSpacing,
	);

	var actionsCustomStyles = expansionPanelActionsProps?.get(
		ExpansionPanelActionsProps.propNames.classes,
	);

	return (
		<ExpansionPanel
			defaultExpanded={defaultExpanded == null ? false : defaultExpanded}
			disabled={disabled == null ? false : disabled}
			expanded={expanded}
			onChange={onChange}
			square={square == null ? false : square}
			TransitionComponent={transitionComponent == null ? Collapse : transitionComponent}
			TransitionProps={transitionProps}
			classes={{
				root: classNames(customStyles?.get(ExpansionPanelProps.ruleNames.root)),
				rounded: classNames(customStyles?.get(ExpansionPanelProps.ruleNames.rounded)),
				expanded: classNames(customStyles?.get(ExpansionPanelProps.ruleNames.expanded)),
				disabled: classNames(customStyles?.get(ExpansionPanelProps.ruleNames.disabled)),
			}}
		>
			<ExpansionPanelSummary
				expandIcon={
					expandIcon == null ? <Icon {...{ id: "chevron-down" }} /> : expandIcon
				}
				IconButtonProps={iconButtonProps}
				classes={{
					root: classNames(
						classes.expansionPanelHeader,
						summaryCustomStyles?.get(ExpansionPanelSummaryProps.ruleNames.root),
					),
					expanded: classNames(
						summaryCustomStyles?.get(ExpansionPanelSummaryProps.ruleNames.expanded),
					),
					focused: classNames(
						summaryCustomStyles?.get(ExpansionPanelSummaryProps.ruleNames.focused),
					),
					disabled: classNames(
						summaryCustomStyles?.get(ExpansionPanelSummaryProps.ruleNames.disabled),
					),
					content: classNames(
						summaryCustomStyles?.get(ExpansionPanelSummaryProps.ruleNames.content),
					),
					expandIcon: classNames(
						summaryCustomStyles?.get(ExpansionPanelSummaryProps.ruleNames.expandIcon),
					),
				}}
			>
				{header}
			</ExpansionPanelSummary>
			<ExpansionPanelDetails
				classes={{
					root: classNames(
						detailsCustomStyles?.get(ExpansionPanelDetailsProps.ruleNames.root),
					),
				}}
			>
				{content}
			</ExpansionPanelDetails>
			{actions != null ? (
				<ExpansionPanelActions
					disableSpacing={disableSpacing == null ? false : disableSpacing}
					classes={{
						root: classNames(
							actionsCustomStyles?.get(ExpansionPanelActionsProps.ruleNames.root),
						),
						spacing: classNames(
							actionsCustomStyles?.get(ExpansionPanelActionsProps.ruleNames.spacing),
						),
					}}
				>
					{actions}
				</ExpansionPanelActions>
			) : null}
		</ExpansionPanel>
	);
};

export default SectionExpansionPanel;
