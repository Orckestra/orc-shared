import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Icon from "./../DataDisplay/Icon";
import {
	ExpansionPanelProps,
	ExpansionPanelActionsProps,
	isExpansionPanelProps,
	isExpansionPanelActionsProps,
} from "./expansionPanelProps";
import useViewState from "../../../hooks/useViewState";

const useStyles = makeStyles(theme => ({
	summaryRoot: {
		height: theme.spacing(8),
		backgroundColor: theme.palette.primary.lighter,
		flexDirection: "row-reverse",
		borderRadius: 0,
		"&:hover": {
			backgroundColor: theme.palette.hoverprimary.lighter,
		},
		"&:focus": {
			borderRadius: 0,
		},
	},
	resetPadding: {
		padding: "0 !important",
	},
	panelExpanded: {},
	summaryContent: {
		marginLeft: theme.spacing(1),
		"&$panelExpanded": {
			marginLeft: theme.spacing(1),
		},
	},
	panelRoot: {
		"&$panelExpanded": {
			margin: "0",
			position: "unset",
			"&:before": {
				opacity: "1",
			},
		},
		"&:before": {
			backgroundColor: theme.palette.secondary.light,
		},
	},
	summaryExpandIconRoot: {
		color: theme.palette.grey.darker,
		minWidth: "auto",
	},
	constrainedSummaryRoot: {
		overflowX: "auto",
		overflowY: "hidden",
	},
	constrainedSummaryContent: {
		minWidth: theme.spacing(83),
	},
}));

const SectionExpansionPanel = ({
	header,
	content,
	actions,
	expansionPanelId,
	expansionPanelProps,
	expansionPanelActionsProps,
}) => {
	if (isExpansionPanelProps(expansionPanelProps) === false) {
		throw new TypeError("expansionPanelProps property is not of type ExpansionPanelProps");
	}

	if (isExpansionPanelActionsProps(expansionPanelActionsProps) === false) {
		throw new TypeError("expansionPanelActionsProps property is not of type ExpansionPanelActionsProps");
	}

	const classes = useStyles();

	// Expansion panel props
	const disabled = expansionPanelProps?.get(ExpansionPanelProps.propNames.disabled);

	const [panelState, updateViewState] = useViewState(expansionPanelId);
	const defaultExpanded = panelState["isExpanded"] ?? true;
	const [expanded, setExpanded] = React.useState(defaultExpanded);

	const internalOnChange = (evt, isExpanded) => {
		setExpanded(isExpanded);
		updateViewState("isExpanded", isExpanded);
	};

	// Expansion panel summary props
	const defaultSummaryStyles = {
		edge: false,
		size: "small",
		classes: {
			root: classes.summaryExpandIconRoot,
			sizeSmall: classes.resetPadding,
		},
	};

	// Expansion panel actions props
	const disableSpacing = expansionPanelActionsProps?.get(ExpansionPanelActionsProps.propNames.disableSpacing);

	const constrained = expansionPanelProps?.get(ExpansionPanelProps.propNames.constrained) || false;

	return (
		<Accordion
			defaultExpanded={defaultExpanded}
			disabled={disabled == null ? false : disabled}
			expanded={expanded}
			onChange={internalOnChange}
			classes={{
				root: classNames(classes.panelRoot),
				expanded: classNames(classes.panelExpanded),
			}}
		>
			<AccordionSummary
				expandIcon={<Icon id="dropdown-chevron-down" />}
				IconButtonProps={defaultSummaryStyles}
				classes={{
					root: classNames(classes.summaryRoot, constrained ? classes.constrainedSummaryRoot : ""),
					expanded: classNames(classes.panelExpanded),
					content: classNames(classes.summaryContent, constrained ? classes.constrainedSummaryContent : ""),
					expandIcon: classNames(classes.summaryExpandIconRoot),
				}}
			>
				{header}
			</AccordionSummary>
			<AccordionDetails
				classes={{
					root: classNames(classes.resetPadding),
				}}
			>
				{content}
			</AccordionDetails>
			{actions != null ? (
				<AccordionActions disableSpacing={disableSpacing == null ? false : disableSpacing}>{actions}</AccordionActions>
			) : null}
		</Accordion>
	);
};

export default SectionExpansionPanel;
