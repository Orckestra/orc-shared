import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from "@material-ui/core/AccordionActions";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";
import Icon from "./../DataDisplay/Icon";

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
		<Accordion
			defaultExpanded
			disabled={disabled == null ? false : disabled}
			expanded={expanded}
			onChange={onChange}
		>
			<AccordionSummary
				expandIcon={<Icon id="chevron-down" />}
				classes={{
					root: classNames(classes.expansionPanelHeader),
				}}
			>
				{header}
			</AccordionSummary>
			<AccordionDetails>{content}</AccordionDetails>
			{actions != null ? (
				<AccordionActions
					disableSpacing={disableSpacing == null ? false : disableSpacing}
				>
					{actions}
				</AccordionActions>
			) : null}
		</Accordion>
	);
};

export default ExpansionPanel;
