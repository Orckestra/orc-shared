import React from "react";
import TableSortLabelMui from "@material-ui/core/TableSortLabel";
import Icon from "orc-shared/src/components/Icon";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { TableSortLabelProps } from "./tableProps";

const useStyles = makeStyles(theme => ({}));

const TableSortLabel = ({ label, tableSortLabelProps }) => {
	if (
		tableSortLabelProps != null &&
		tableSortLabelProps instanceof TableSortLabelProps === false
	) {
		throw new Error("tableSortLabelProps property is not of type TableSortLabelProps");
	}

	const classes = useStyles();

	var active = tableSortLabelProps?.get(TableSortLabelProps.propNames.active);
	var direction = tableSortLabelProps?.get(TableSortLabelProps.propNames.direction);
	var hideSortIcon = tableSortLabelProps?.get(TableSortLabelProps.propNames.hideSortIcon);
	var iconComponent = tableSortLabelProps?.get(
		TableSortLabelProps.propNames.iconComponent,
	);

	var customStyles = tableSortLabelProps?.get(TableSortLabelProps.propNames.classes);

	return (
		<TableSortLabelMui
			active={active == null ? false : active}
			direction={direction == null ? "asc" : direction}
			hideSortIcon={hideSortIcon == null ? false : hideSortIcon}
			IconComponent={
				iconComponent == null ? <Icon {...{ id: "chevron-down" }} /> : iconComponent
			}
			classes={{
				root: classNames(customStyles?.get(TableSortLabelProps.ruleNames.root)),
				active: classNames(customStyles?.get(TableSortLabelProps.ruleNames.active)),
				icon: classNames(customStyles?.get(TableSortLabelProps.ruleNames.icon)),
				iconDirectionDesc: classNames(
					customStyles?.get(TableSortLabelProps.ruleNames.iconDirectionDesc),
				),
				iconDirectionAsc: classNames(
					customStyles?.get(TableSortLabelProps.ruleNames.iconDirectionAsc),
				),
			}}
		>
			{label}
		</TableSortLabelMui>
	);
};

export default TableSortLabel;
