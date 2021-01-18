import React from "react";
import Icon from "./Icon";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
	headerContainer: {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
	},
	sortIcon: {
		stroke: "none",
		width: theme.spacing(0.8),
		marginLeft: theme.spacing(1),
	},
}));

const TableHeaderCell = ({ columnDefinition }) => {
	const classes = useStyles();

	const label =
		typeof columnDefinition.label === "object" ? (
			<FormattedMessage {...columnDefinition.label} />
		) : (
			columnDefinition.label
		);

	if (columnDefinition.sortOptions == null) {
		return label;
	}

	const direction = columnDefinition.sortOptions.direction;
	const propertyName = columnDefinition.sortOptions.propertyName;
	const sortCallback = columnDefinition.sortCallback;
	const sortField = columnDefinition.sortOptions.sortField;

	if (direction !== "Descending" && direction !== "Ascending") {
		throw new Error("Direction could only have one of next 2 values: Ascending/Descending");
	}

	if (propertyName == null) {
		throw new Error("Property name is required for sorting correct work");
	}

	if (sortCallback == null) {
		throw new Error("Sort callback is required for sorting correct work");
	}

	const iconId = direction === "Descending" ? "caret-up" : "caret-down";

	const iconColor = sortField ? "primary" : "disabled";

	const icon = <Icon id={iconId} className={classes.sortIcon} color={iconColor} />;

	const clickHandler = () => {
		columnDefinition.sortCallback(columnDefinition.sortOptions.propertyName);
	};

	const sortableColumnHeader = (
		<div className={classes.headerContainer} onClick={() => clickHandler()}>
			{label}
			{icon}
		</div>
	);

	return sortableColumnHeader;
};

export default TableHeaderCell;
