import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";
import Icon from "../../Icon";

const useStyles = makeStyles(theme => ({
	expansionPanelHeader: {},
}));

const ExpansionPanel = ({
	header,
	content,
	actions,
	expansionPanelProps,
	expansionPanelActionsProps,
}) => {
	if (
		expansionPanelProps != null &&
		expansionPanelProps instanceof ExpansionPanelProps === false
	) {
		throw new TypeError(
			"expansionPanelProps property is not of type ExpansionPanelProps",
		);
	}

	if (
		expansionPanelActionsProps != null &&
		expansionPanelActionsProps instanceof ExpansionPanelActionsProps === false
	) {
		throw new TypeError(
			"expansionPanelActionsProps property is not of type ExpansionPanelActionsProps",
		);
	}

	const classes = useStyles();

	// Expansion panel props
	const disabled = expansionPanelProps?.get(ExpansionPanelProps.propNames.disabled);
	const expanded = expansionPanelProps?.get(ExpansionPanelProps.propNames.expanded);
	const onChange = expansionPanelProps?.get(ExpansionPanelProps.propNames.onChange);

	// Expansion panel summary props

	// Expansion panel actions props
	const disableSpacing = expansionPanelActionsProps?.get(
		ExpansionPanelActionsProps.propNames.disableSpacing,
	);

	return (
		<ExpansionPanel
			defaultExpanded
			disabled={disabled == null ? false : disabled}
			expanded={expanded}
			onChange={onChange}
		>
			<ExpansionPanelSummary
				expandIcon={<Icon {...{ id: "chevron-down" }} />}
				classes={{
					root: classNames(classes.expansionPanelHeader),
				}}
			>
				{header}
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>{content}</ExpansionPanelDetails>
			{actions != null ? (
				<ExpansionPanelActions
					disableSpacing={disableSpacing == null ? false : disableSpacing}
				>
					{actions}
				</ExpansionPanelActions>
			) : null}
		</ExpansionPanel>
	);
};

export default ExpansionPanel;
