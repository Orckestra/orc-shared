import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import {
	AccordionProps,
	AccordionActionsProps,
	isExpansionPanelProps,
	isExpansionPanelActionsProps,
} from "./expansionPanelProps";
import Icon from "./../DataDisplay/Icon";

const useStyles = makeStyles(theme => ({
	expansionPanelHeader: {
		minHeight: 0,
		backgroundColor: theme.palette.grey.light,
		height: theme.spacing(4),
		"&$headerPanelExpanded": {
			minHeight: 0,
			margin: 0,
		},
		borderColor: theme.palette.grey.borders,
	},
	expandIcon: {
		hight: theme.spacing(1),
		width: theme.spacing(1),
	},
	headerPanelExpanded: {},
	constrainedSummaryRoot: {
		overflowX: "auto",
		overflowY: "hidden",
	},
	constrainedSummaryContent: {
		minWidth: theme.spacing(83),
	},
}));

const ExpansionPanel = ({ header, content, actions, expansionPanelProps, expansionPanelActionsProps }) => {
	if (isExpansionPanelProps(expansionPanelProps) === false) {
		throw new TypeError("expansionPanelProps property is not of type AccordionProps");
	}

	if (isExpansionPanelActionsProps(expansionPanelActionsProps) === false) {
		throw new TypeError("expansionPanelActionsProps property is not of type AccordionActionsProps");
	}

	const classes = useStyles();

	// Expansion panel props
	const disabled = expansionPanelProps?.get(AccordionProps.propNames.disabled);
	const defaultExpanded = expansionPanelProps?.get(AccordionProps.propNames.defaultExpanded) ?? true;
	const constrained = expansionPanelProps?.get(AccordionProps.propNames.constrained) || false;

	const [expanded, setExpanded] = React.useState(defaultExpanded);

	const internalOnChange = (evt, isExpanded) => {
		setExpanded(isExpanded);
	};

	const expansionPanelRootStyle = expansionPanelProps?.getStyle(AccordionProps.ruleNames.root);
	const panelSummaryRootStyle = expansionPanelProps?.getStyle(AccordionProps.ruleNames.summaryRoot);
	const panelSummaryExpandedStyle = expansionPanelProps?.getStyle(AccordionProps.ruleNames.summaryExpanded);
	const panelDetailsStyle = expansionPanelProps?.getStyle(AccordionProps.ruleNames.details);
	const panelActionsStyle = expansionPanelProps?.getStyle(AccordionProps.ruleNames.actions);

	// Expansion panel summary props

	// Expansion panel actions props
	const disableSpacing = expansionPanelActionsProps?.get(AccordionActionsProps.propNames.disableSpacing);

	return (
		<Accordion
			defaultExpanded={defaultExpanded}
			disabled={disabled == null ? false : disabled}
			expanded={expanded}
			onChange={internalOnChange}
			classes={{
				root: expansionPanelRootStyle,
			}}
		>
			<AccordionSummary
				expandIcon={<Icon id="chevron-down" className={classes.expandIcon} />}
				classes={{
					root: classNames(
						classes.expansionPanelHeader,
						panelSummaryRootStyle,
						constrained ? classes.constrainedSummaryRoot : "",
					),
					content: classNames(constrained ? classes.constrainedSummaryContent : ""),
					expanded: classNames(classes.headerPanelExpanded, panelSummaryExpandedStyle),
				}}
			>
				{header}
			</AccordionSummary>
			<AccordionDetails classes={{ root: panelDetailsStyle }}>{content}</AccordionDetails>
			{actions != null ? (
				<AccordionActions
					classes={{ root: panelActionsStyle }}
					disableSpacing={disableSpacing == null ? false : disableSpacing}
				>
					{actions}
				</AccordionActions>
			) : null}
		</Accordion>
	);
};

export default ExpansionPanel;
