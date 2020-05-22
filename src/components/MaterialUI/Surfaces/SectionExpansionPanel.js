import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "orc-shared/src/components/Icon";
import classNames from "classnames";
import {
	ExpansionPanelStyle,
	ExpansionPanelActionsStyle,
	ExpansionPanelDetailsStyle,
	ExpansionPanelSummaryStyle,
} from "./expansionPanelStyle";
import RulesNames from "orc-shared/src/components/MaterialUI/ruleNames";

const useStyles = makeStyles(theme => ({
	expansionPanelHeader: {
		height: "80px",
		backgroundColor: "#E0E6EB",
		paddingTop: "16px",
		paddingBottom: "16px",
		paddingLeft: "20px",
		paddingRight: "20px",
	},
}));

const SectionExpansionPanel = ({
	header,
	content,
	expansionPanelStyle,
	expansionPanelSummaryStyle,
	expansionPanelDetailsStyle,
	expansionPanelActionsStyle,
	actions = null,
	keyField = "id",
}) => {
	if (
		expansionPanelStyle != null &&
		expansionPanelStyle instanceof ExpansionPanelStyle == false
	) {
		throw "expansionPanelStyle property is not of type ExpansionPanelStyle";
	}

	if (
		expansionPanelSummaryStyle != null &&
		expansionPanelSummaryStyle instanceof ExpansionPanelSummaryStyle == false
	) {
		throw "expansionPanelSummaryStyle property is not of type ExpansionPanelSummaryStyle";
	}

	if (
		expansionPanelDetailsStyle != null &&
		expansionPanelDetailsStyle instanceof ExpansionPanelDetailsStyle == false
	) {
		throw "ExpansionPanelDetailsStyle property is not of type ExpansionPanelDetailsStyle";
	}

	if (
		expansionPanelActionsStyle != null &&
		expansionPanelActionsStyle instanceof ExpansionPanelActionsStyle == false
	) {
		throw "ExpansionPanelActionsStyle property is not of type ExpansionPanelActionsStyle";
	}

	const classes = useStyles();

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<ExpansionPanel
			expanded={expanded === "panel" + keyField}
			onChange={handleChange("panel" + keyField)}
			classes={{
				root: classNames(expansionPanelStyle?.get(RulesNames.root)),
				rounded: classNames(expansionPanelStyle?.get(RulesNames.rounded)),
				expanded: classNames(expansionPanelStyle?.get(RulesNames.expanded)),
				disabled: classNames(expansionPanelStyle?.get(RulesNames.disabled)),
			}}
		>
			<ExpansionPanelSummary
				classes={{
					root: classNames(
						classes.expansionPanelHeader,
						expansionPanelSummaryStyle?.get(RulesNames.root),
					),
					expanded: classNames(expansionPanelSummaryStyle?.get(RulesNames.expanded)),
					focused: classNames(expansionPanelSummaryStyle?.get(RulesNames.focused)),
					disabled: classNames(expansionPanelSummaryStyle?.get(RulesNames.disabled)),
					content: classNames(expansionPanelSummaryStyle?.get(RulesNames.content)),
					expandIcon: classNames(expansionPanelSummaryStyle?.get(RulesNames.expandIcon)),
				}}
				expandIcon={<Icon {...{ id: "chevron-down" }} />}
			>
				{header}
			</ExpansionPanelSummary>
			<ExpansionPanelDetails
				classes={{
					root: classNames(expansionPanelDetailsStyle?.get(RulesNames.root)),
				}}
			>
				{content}
			</ExpansionPanelDetails>
			<ExpansionPanelActions
				classes={{
					root: classNames(expansionPanelActionsStyle?.get(RulesNames.root)),
					spacing: classNames(expansionPanelActionsStyle?.get(RulesNames.spacing)),
				}}
			>
				{actions}
			</ExpansionPanelActions>
		</ExpansionPanel>
	);
};

export default SectionExpansionPanel;
