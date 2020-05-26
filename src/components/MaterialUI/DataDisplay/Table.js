import React from "react";
import TableMui from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
	TableProps,
	TableBodyProps,
	TableCellProps,
	TableContainerProps,
	TableFooterProps,
	TableHeadProps,
	TablePaginationProps,
	TableRowProps,
} from "./tableProps";

const useStyles = makeStyles(theme => ({
	container: {
		width: "100%",
	},
	cellRoot: {
		maxWidth: "150px",
		whiteSpace: "nowrap",
		overflowX: "hidden",
		textOverflow: "ellipsis",
	},
}));

const Table = ({
	headers,
	rows,
	checkbox,
	tableProps,
	tableBodyProps,
	tableCellProps,
	tableContainerProps,
	tableFooterProps,
	tableHeadProps,
	tablePaginationProps,
	tableRowProps,
}) => {
	if (tableProps != null && tableProps instanceof TableProps === false) {
		throw new Error("tableProps property is not of type TableProps");
	}

	if (tableBodyProps != null && tableBodyProps instanceof TableBodyProps === false) {
		throw new Error("tableBodyProps property is not of type TableBodyProps");
	}

	if (tableCellProps != null && tableCellProps instanceof TableCellProps === false) {
		throw new Error("tableCellProps property is not of type TableCellProps");
	}

	if (
		tableContainerProps != null &&
		tableContainerProps instanceof TableContainerProps === false
	) {
		throw new Error("tableContainerProps property is not of type TableContainerProps");
	}

	if (
		tableFooterProps != null &&
		tableFooterProps instanceof TableFooterProps === false
	) {
		throw new Error("tableFooterProps property is not of type TableFooterProps");
	}

	if (tableHeadProps != null && tableHeadProps instanceof TableHeadProps === false) {
		throw new Error("tableHeadProps property is not of type TableHeadProps");
	}

	if (
		tablePaginationProps != null &&
		tablePaginationProps instanceof TablePaginationProps === false
	) {
		throw new Error("tablePaginationProps property is not of type TablePaginationProps");
	}

	if (tableRowProps != null && tableRowProps instanceof TableRowProps === false) {
		throw new Error("tableRowProps property is not of type TableRowProps");
	}

	const classes = useStyles();

	// Table props
	var padding = tableProps?.get(TableProps.propNames.padding);
	var size = tableProps?.get(TableProps.propNames.size);
	var stickyHeader = tableProps?.get(TableProps.propNames.stickyHeader);

	var tableStyles = tableProps?.get(TableProps.propNames.classes);

	// Table body props
	var tableBodyStyles = tableBodyProps?.get(TableBodyProps.propNames.classes);

	// Table cell props
	var align = tableCellProps?.get(TableCellProps.propNames.align);
	var cellPadding = tableCellProps?.get(TableCellProps.propNames.padding);
	var scope = tableCellProps?.get(TableCellProps.propNames.scope);
	var cellSize = tableCellProps?.get(TableCellProps.propNames.size);
	var sortDirection = tableCellProps?.get(TableCellProps.propNames.sortDirection);

	var tableCellStyles = tableCellProps?.get(TableCellProps.propNames.classes);

	// Table container props
	var tableContainerStyles = tableContainerProps?.get(
		TableContainerProps.propNames.classes,
	);

	// Table footer props
	var tableFooterStyles = tableFooterProps?.get(TableFooterProps.propNames.classes);

	// Table head props
	var tableHeadStyles = tableHeadProps?.get(TableHeadProps.propNames.classes);

	var backIconButtonProps = tablePaginationProps?.get(
		TablePaginationProps.propNames.backIconButtonProps,
	);
	var backIconButtonText = tablePaginationProps?.get(
		TablePaginationProps.propNames.backIconButtonText,
	);
	var count = tablePaginationProps?.get(TablePaginationProps.propNames.count);
	var labelDisplayedRows = tablePaginationProps?.get(
		TablePaginationProps.propNames.labelDisplayedRows,
	);
	var labelRowsPerPage = tablePaginationProps?.get(
		TablePaginationProps.propNames.labelRowsPerPage,
	);
	var nextIconButtonProps = tablePaginationProps?.get(
		TablePaginationProps.propNames.nextIconButtonProps,
	);
	var nextIconButtonText = tablePaginationProps?.get(
		TablePaginationProps.propNames.nextIconButtonText,
	);
	var onChangePage = tablePaginationProps?.get(
		TablePaginationProps.propNames.onChangePage,
	);
	var onChangeRowsPerPage = tablePaginationProps?.get(
		TablePaginationProps.propNames.onChangeRowsPerPage,
	);
	var page = tablePaginationProps?.get(TablePaginationProps.propNames.page);
	var rowsPerPage = tablePaginationProps?.get(TablePaginationProps.propNames.rowsPerPage);
	var rowsPerPageOptions = tablePaginationProps?.get(
		TablePaginationProps.propNames.rowsPerPageOptions,
	);
	var selectProps = tablePaginationProps?.get(TablePaginationProps.propNames.selectProps);

	var tablePaginationStyles = tablePaginationProps?.get(
		TablePaginationProps.propNames.classes,
	);

	// Table row props
	var hover = tableRowProps?.get(TableRowProps.propNames.hover);
	var selected = tableRowProps?.get(TableRowProps.propNames.selected);

	var tableRowStyles = tableRowProps?.get(TableRowProps.propNames.classes);

	return (
		<Box className={classes.container}>
			<TableContainer
				classes={{
					root: classNames(tableContainerStyles?.get(TableContainerProps.ruleNames.root)),
				}}
			>
				<TableMui
					padding={padding == null ? "default" : padding}
					size={size == null ? "medium" : size}
					stickyHeader={stickyHeader == null ? false : stickyHeader}
					classes={{
						root: classNames(
							classes.tableRoot,
							tableStyles?.get(TableProps.ruleNames.root),
						),
						stickyHeader: classNames(tableStyles?.get(TableProps.ruleNames.stickyHeader)),
					}}
				>
					<TableHead
						classes={{
							root: classNames(tableHeadStyles?.get(TableHeadProps.ruleNames.root)),
						}}
					>
						<TableRow
							hover={hover == null ? false : hover}
							selected={selected == null ? false : selected}
							classes={{
								root: classNames(tableRowStyles?.get(TableRowProps.ruleNames.root)),
								selected: classNames(
									tableRowStyles?.get(TableRowProps.ruleNames.selected),
								),
								hover: classNames(tableRowStyles?.get(TableRowProps.ruleNames.hover)),
								head: classNames(tableRowStyles?.get(TableRowProps.ruleNames.head)),
							}}
						>
							{checkbox != null ? (
								<TableCell
									align={align == null ? "inherit" : align}
									scope={scope}
									size={size == null ? "medium" : size}
									padding="checkbox"
									classes={{
										root: classNames(tableCellStyles?.get(TableCellProps.ruleNames.root)),
										head: classNames(tableCellStyles?.get(TableCellProps.ruleNames.head)),
									}}
								>
									{checkbox}
								</TableCell>
							) : null}
							{headers.map((header, index) => (
								<TableCell
									key={index}
									align={align == null ? "inherit" : align}
									padding={padding == null ? "default" : padding}
									scope={scope}
									size={size}
									sortDirection={sortDirection}
									classes={{
										root: classNames(
											classes.cellRoot,
											tableCellStyles?.get(TableCellProps.ruleNames.root),
										),
										head: classNames(tableCellStyles?.get(TableCellProps.ruleNames.head)),
									}}
								>
									{header}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody
						classes={{
							root: classNames(tableBodyStyles?.get(TableBodyProps.ruleNames.root)),
						}}
					>
						{rows.map((row, index) => (
							<TableRow
								key={index}
								hover={hover == null ? false : hover}
								selected={selected == null ? false : selected}
								classes={{
									root: classNames(tableRowStyles?.get(TableRowProps.ruleNames.root)),
									selected: classNames(
										tableRowStyles?.get(TableRowProps.ruleNames.selected),
									),
									hover: classNames(tableRowStyles?.get(TableRowProps.ruleNames.hover)),
								}}
							>
								{row.map((cell, cellIndex) => (
									<TableCell
										key={cellIndex}
										align={align == null ? "inherit" : align}
										padding={padding == null ? "default" : padding}
										scope={scope}
										size={size}
										classes={{
											root: classNames(
												classes.cellRoot,
												tableCellStyles?.get(TableCellProps.ruleNames.root),
											),
											body: classNames(
												tableCellStyles?.get(TableCellProps.ruleNames.body),
											),
										}}
									>
										{cell}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</TableMui>
			</TableContainer>
			{tablePaginationProps != null ? (
				<TableFooter
					classes={{
						root: classNames(tableFooterStyles?.get(TableFooterProps.ruleNames.root)),
					}}
				>
					<TableRow
						hover={hover == null ? false : hover}
						selected={selected == null ? false : selected}
						classes={{
							root: classNames(tableRowStyles?.get(TableRowProps.ruleNames.root)),
							selected: classNames(tableRowStyles?.get(TableRowProps.ruleNames.selected)),
							hover: classNames(tableRowStyles?.get(TableRowProps.ruleNames.hover)),
							footer: classNames(tableRowStyles?.get(TableRowProps.ruleNames.footer)),
						}}
					>
						<TablePagination
							backIconButtonProps={backIconButtonProps}
							backIconButtonText={
								backIconButtonText == null ? "Previous page" : backIconButtonText
							}
							count={count}
							labelRowsPerPage={
								labelRowsPerPage == null ? "Rows per page:" : labelRowsPerPage
							}
							nextIconButtonProps={nextIconButtonProps}
							nextIconButtonText={
								nextIconButtonText == null ? "Next page" : nextIconButtonText
							}
							onChangePage={onChangePage}
							onChangeRowsPerPage={onChangeRowsPerPage}
							page={page}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={
								rowsPerPageOptions == null ? [10, 25, 50, 100] : rowsPerPageOptions
							}
							SelectProps={selectProps}
							classes={{
								root: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.root),
								),
								toolbar: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.toolbar),
								),
								spacer: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.spacer),
								),
								caption: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.caption),
								),
								selectRoot: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.selectRoot),
								),
								select: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.select),
								),
								selectIcon: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.selectIcon),
								),
								input: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.input),
								),
								menuItem: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.menuItem),
								),
								actions: classNames(
									tablePaginationStyles?.get(TablePaginationProps.ruleNames.actions),
								),
							}}
						></TablePagination>
					</TableRow>
				</TableFooter>
			) : null}
		</Box>
	);
};

export default Table;
