import React from "react";
import ExpansionPanelMui from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "orc-shared/src/components/Icon";
import classNames from "classnames";
import ExpansionPanelStyle from "./expansionPanelStyle";
import RulesNames from "orc-shared/src/components/MaterialUI/ruleNames";

const useStyles = makeStyles(theme => ({
	expansionPanelHeader: {},
}));

const ExpansionPanel = ({ header, content, expansionPanelStyle, keyField = "id" }) => {
	if (expansionPanelStyle instanceof ExpansionPanelStyle == false) {
		throw "expansionPanelStyle property is not of type ExpansionPanelStyle";
	}

	const classes = useStyles();

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<ExpansionPanelMui
			expanded={expanded === "panel" + keyField}
			onChange={handleChange("panel" + keyField)}
		>
			<ExpansionPanelSummary
				classes={{
					root: classNames(
						classes.expansionPanelHeader,
						expansionPanelStyle.get(RulesNames.root),
					),
				}}
			>
				{expanded ? (
					<Icon {...{ id: "chevron-up" }} />
				) : (
					<Icon {...{ id: "chevron-down" }} />
				)}
				{header}
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>{content}</ExpansionPanelDetails>
		</ExpansionPanelMui>
	);
};

export default ExpansionPanel;
