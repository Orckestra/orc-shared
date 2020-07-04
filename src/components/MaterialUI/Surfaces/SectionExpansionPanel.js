import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from "@material-ui/core/AccordionActions";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Icon from "../../Icon";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";
import useViewState from "../../../hooks/useViewState";

const useStyles = makeStyles(theme => ({
	summaryRoot: {
		height: theme.spacing(8),
		backgroundColor: theme.palette.primary.lighter,
		flexDirection: "row-reverse",
	},
	resetPadding: {
		padding: "0",
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
}));

const SectionExpansionPanel = ({
	header,
	content,
	actions,
	expansionPanelId,
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
	const disableSpacing = expansionPanelActionsProps?.get(
		ExpansionPanelActionsProps.propNames.disableSpacing,
	);

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
				expandIcon={<Icon {...{ id: "chevron-down" }} />}
				IconButtonProps={defaultSummaryStyles}
				classes={{
					root: classNames(classes.summaryRoot),
					expanded: classNames(classes.panelExpanded),
					content: classNames(classes.summaryContent),
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
				<AccordionActions
					disableSpacing={disableSpacing == null ? false : disableSpacing}
				>
					{actions}
				</AccordionActions>
			) : null}
		</Accordion>
	);
};

export default SectionExpansionPanel;
