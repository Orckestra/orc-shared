import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { ExpansionPanelProps, ExpansionPanelActionsProps } from "./expansionPanelProps";
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
		borderColor: theme.palette.grey.borders
	},
	expandIcon: {
		hight: theme.spacing(1),
		width: theme.spacing(1)
	},
	headerPanelExpanded: {}
}));

const ExpansionPanel = ({ header, content, actions, expansionPanelProps, expansionPanelActionsProps }) => {
	if (expansionPanelProps != null && expansionPanelProps instanceof ExpansionPanelProps === false) {
		throw new TypeError("expansionPanelProps property is not of type ExpansionPanelProps");
	}

	if (
		expansionPanelActionsProps != null &&
		expansionPanelActionsProps instanceof ExpansionPanelActionsProps === false
	) {
		throw new TypeError("expansionPanelActionsProps property is not of type ExpansionPanelActionsProps");
	}

	const classes = useStyles();

	// Expansion panel props
	const disabled = expansionPanelProps?.get(ExpansionPanelProps.propNames.disabled);
	const defaultExpanded = expansionPanelProps?.get(ExpansionPanelProps.propNames.defaultExpanded) ?? true;

	const [expanded, setExpanded] = React.useState(defaultExpanded);

	const internalOnChange = (evt, isExpanded) => {
		setExpanded(isExpanded);
	};

	const expansionPanelRootStyle = expansionPanelProps?.getStyle(ExpansionPanelProps.ruleNames.root);

	// Expansion panel summary props

	// Expansion panel actions props
	const disableSpacing = expansionPanelActionsProps?.get(ExpansionPanelActionsProps.propNames.disableSpacing);

	return (
		<Accordion
			defaultExpanded={defaultExpanded}
			disabled={disabled == null ? false : disabled}
			expanded={expanded}
			onChange={internalOnChange}
			classes={{
				root: expansionPanelRootStyle
			}}
		>
			<AccordionSummary
				expandIcon={<Icon id="chevron-down" className={classes.expandIcon} />}
				classes={{
					root: classNames(classes.expansionPanelHeader),
					expanded: classes.headerPanelExpanded
				}}
			>
				{header}
			</AccordionSummary>
			<AccordionDetails>{content}</AccordionDetails>
			{actions != null ? (
				<AccordionActions disableSpacing={disableSpacing == null ? false : disableSpacing}>{actions}</AccordionActions>
			) : null}
		</Accordion>
	);
};

export default ExpansionPanel;
