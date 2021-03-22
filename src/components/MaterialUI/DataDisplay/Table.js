import React, { useCallback, useEffect, useRef, useState } from "react";
import TableMui from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import CheckboxMui from "@material-ui/core/Checkbox";
import { tableSelectionMode, useTableSelection } from "./useTableSelection";
import TableProps, { isTableProps } from "./TableProps";
import classNames from "classnames";
import ResizeDetector from "react-resize-detector";
import { isEqual } from "lodash";

export const useStyles = makeStyles(theme => ({
	container: {
		flex: "0 1 100%",
		fontSize: theme.typography.fontSize,
		display: "flex",
		flexDirection: "column",
	},
	tableContainer: {
		overflowY: "auto",
		position: "relative",
	},
	table: {
		tableLayout: "fixed",
	},
	stickyHeaderHead: {
		borderTop: props => (props.withoutTopBorder ? "none" : "1px solid " + theme.palette.grey.borders),
		borderBottom: "1px solid " + theme.palette.grey.borders,
		backgroundColor: theme.palette.grey.lighter,
		display: "flex",
		cursor: "default",
	},
	stickyHeaderTable: {
		tableLayout: "fixed",
		width: props => "calc(100% - " + (props.scrolled || "0") + "px)",
	},
	stickyHeaderTableScroll: {
		width: props => (props.scrolled || "0") + "px",
		backgroundColor: theme.palette.grey.lighter,
		display: props => (props.scrolled > 0 ? "block" : "none"),
	},
	tableHeader: {
		borderTop: props => (props.withoutTopBorder ? "none" : "1px solid " + theme.palette.grey.borders),
		borderBottom: props => (props.stickyHeader ? "none" : "1px solid " + theme.palette.grey.borders),
		display: props => (props.stickyHeader ? "none" : "table-header-group"),
		backgroundColor: theme.palette.grey.lighter,
		overflow: "hidden",
		cursor: "default",
	},
	tableBody: {
		overflowX: "hidden",
		overflowY: "auto",
	},
	tableRow: {
		borderBottom: "1px solid " + theme.palette.grey.borders,
		cursor: props => (props.onRowClick ? "pointer" : "default"),
		backgroundColor: theme.palette.background.paper + "!important",
		"&:hover": {
			backgroundColor: props => (props.onRowClick ? theme.palette.grey.lighter : theme.palette.background.paper),
		},
	},
	tableCell: {
		padding: theme.spacing(2),
	},
	tableCellSelect: {
		padding: theme.spacing(2),
		width: theme.spacing(5),
	},
	headerCell: {
		padding: theme.spacing(1, 2),
		textAlign: "left",
		fontWeight: theme.typography.fontWeightSemiBold,
	},
	headerCellSelect: {
		padding: theme.spacing(1, 2),
		width: theme.spacing(5),
		textAlign: "left",
		fontWeight: theme.typography.fontWeightSemiBold,
	},
	rowSelectCheckbox: {
		padding: 0,
	},
	placeholder: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
}));

function headersAreIdentical(prevHeaders, nextHeaders) {
	prevHeaders.forEach((prevHeader, index) => {
		let prevSortOptions = prevHeader.cellElement.props.columnDefinition.sortOptions;
		let nextSortOptions = nextHeaders[index]?.cellElement.props.columnDefinition.sortOptions;
		if (prevSortOptions != null && nextSortOptions != null) {
			if (prevSortOptions.sortField !== nextSortOptions.sortField) {
				return false;
			}
			return prevSortOptions.direction === nextSortOptions.direction;
		}
		return true;
	});
}

function editingMode(prevTableProps, nextTableProps) {
	const prevEditingMode = prevTableProps?.get(TableProps.propNames.isEditingMode) || false;
	const nextEditingMode = nextTableProps?.get(TableProps.propNames.isEditingMode) || false;

	return prevEditingMode === nextEditingMode;
}

function rowAreIdentical(prevRows, nextRows) {
	return (
		prevRows.length === nextRows.length && prevRows.findIndex((pr, index) => pr.key !== nextRows[index].key) === -1
	);
}

function contextIsIdentical(prevContext, nextContext) {
	return isEqual(prevContext, nextContext);
}

function propsAreEqualRow(prev, next) {
	const hasEditingModeChanged = prev.isEditingMode !== next.isEditingMode;
	if (prev.deepPropsComparation) {
		return (
			propsAreEqualDeeplyRow(prev.dataRows, next.dataRows) &&
			contextIsIdentical(prev.context, next.context) &&
			!hasEditingModeChanged
		);
	}
	return prev.selected === next.selected && contextIsIdentical(prev.context, next.context) && !hasEditingModeChanged;
}

function propsAreEqualDeeplyRow(prevRow, nextRow) {
	for (let i = 0; i < prevRow.length; i++) {
		if (!isEqual(prevRow[i].element, nextRow[i].element) || prevRow[i].columns.length !== nextRow[i].columns.length) {
			return false;
		}
	}
	return true;
}

const TableRowMemo = ({ deepPropsComparation, dataRows, isEditingMode, ...props }) => {
	return <TableRow {...props} />;
};

export const MemoTableRow = React.memo(TableRowMemo, (prev, next) => propsAreEqualRow(prev, next));

function propsAreEqualBody(prev, next) {
	let isEqualBody =
		contextIsIdentical(prev.context, next.context) &&
		prev.selectedNumber === next.selectedNumber &&
		rowAreIdentical(prev.dataRows, next.dataRows);
	if (prev.deepPropsComparation) {
		isEqualBody = isEqualBody && propsAreEqualDeeplyRow(prev.dataRows, next.dataRows);
	}
	return isEqualBody;
}

const TableBody = ({ deepPropsComparation, ...props }) => {
	return <tbody className={props.className}>{props.tableRows}</tbody>;
};

export const MemoTableBody = React.memo(TableBody, propsAreEqualBody);

const TableCell = React.forwardRef((props, ref) => {
	//withDeferredTooltip(
	return (
		<td className={props.className} ref={ref} {...props}>
			{props.value}
		</td>
	);
});
//);

const buildRowCheckbox = (classes, key, selectionHandlers) => {
	const rowSelected = selectionHandlers.isSelected(key);

	return (
		<td className={classes.tableCellSelect} selected={rowSelected}>
			<CheckboxMui
				className={classes.rowSelectCheckbox}
				checked={rowSelected}
				onChange={event => selectionHandlers.selectionHandler(event, key)}
			/>
		</td>
	);
};

const buildTableCheckbox = (classes, tableSelectionStatus, selectionMethods) => {
	return (
		<th key="tableSelector" className={classes.headerCellSelect}>
			<CheckboxMui
				className={classes.rowSelectCheckbox}
				checked={tableSelectionStatus === tableSelectionMode.all}
				indeterminate={tableSelectionStatus === tableSelectionMode.indeterminate}
				onChange={event => selectionMethods.selectionHandler(event, null)}
			/>
		</th>
	);
};

const StickerTableHeader = ({ classes, tableHeaders }) => (
	<div key="stickyHeader" className={classes.stickyHeaderHead}>
		<TableMui className={classes.stickyHeaderTable}>
			<TableHead>
				<TableRow>{tableHeaders}</TableRow>
			</TableHead>
		</TableMui>
		<div className={classes.stickyHeaderTableScroll} />
	</div>
);

const buildTableHeaders = (headers, classes, customClasses, selectMode, tableSelectionStatus, selectionMethods) => {
	const tableCheckbox =
		selectMode === true ? [buildTableCheckbox(classes, tableSelectionStatus, selectionMethods)] : [];

	return tableCheckbox.concat(
		headers.map((header, index) => (
			<th
				key={index}
				className={classNames(classes.headerCell, customClasses[header.className], customClasses.headerCell)}
			>
				{header.cellElement}
			</th>
		)),
	);
};

const buildTableRows = (
	rows,
	classes,
	customClasses,
	selectMode,
	onRowClick,
	selectionHandlers,
	deepPropsComparation,
	context,
	isEditingMode,
) => {
	const onClick = (evt, row) => {
		if (evt.target.tagName !== "INPUT" && onRowClick != null) {
			onRowClick(evt, row.element);
		}
	};

	const mappedRows = rows.map(row => (
		<MemoTableRow
			className={classNames(classes.tableRow, customClasses.tableRow)}
			key={row.key}
			onClick={evt => onClick(evt, row)}
			selected={selectionHandlers.isSelected(row.key) || isEditingMode}
			deepPropsComparation={deepPropsComparation}
			context={context}
			isEditingMode={isEditingMode}
			dataRows={rows}
		>
			{selectMode === true ? buildRowCheckbox(classes, row.key, selectionHandlers) : null}
			{row.columns.map((cell, cellIndex) => (
				<TableCell
					className={classNames(classes.tableCell, customClasses[cell.className], customClasses.tableCell)}
					key={cellIndex}
					value={cell.cellElement}
				/>
			))}
		</MemoTableRow>
	));

	return mappedRows;
};

const FullTable = React.forwardRef((props, ref) => {
	const scrollEvent = evt => {
		if (
			evt.target.scrollHeight - (evt.target.scrollTop + evt.target.offsetHeight) < 100 &&
			props.dataRows.length === props.latestPage * props.pageLength
		) {
			props.scrollLoader(props.latestPage + 1);
		}
	};

	return (
		<div
			key="actualTable"
			className={classNames(props.classes.tableContainer, props.customClasses.tableContainer)}
			ref={ref}
			onScroll={scrollEvent}
		>
			<ResizeDetector onResize={props.onResize} />
			<TableMui className={classNames(props.classes.table, props.customClasses.table)}>
				<TableHead className={classNames(props.classes.tableHeader, props.customClasses.tableHeader)}>
					<TableRow>{props.tableHeaders}</TableRow>
				</TableHead>
				<MemoTableBody
					className={classNames(props.classes.tableBody, props.customClasses.tableBody)}
					dataRows={props.dataRows}
					tableRows={props.tableRows}
					selectedNumber={props.selectedNumber}
					deepPropsComparation={props.deepPropsComparation}
					context={props.context}
				/>
			</TableMui>
			{props.tableRows.length > 0 ? null : <div className={props.classes.placeholder}>{props.placeholder}</div>}
		</div>
	);
});

const Table = ({
	tableInfo,
	headers,
	rows,
	scrollLoader,
	latestPage,
	pageLength,
	placeholder,
	tableProps,
	context,
}) => {
	if (isTableProps(tableProps) === false) {
		throw new TypeError("tableProps property is not of type TableProps");
	}

	const customClasses = tableProps?.get(TableProps.propNames.classes) || {};
	const selectMode = tableProps?.get(TableProps.propNames.selectMode) || false;
	const stickyHeader = tableProps?.get(TableProps.propNames.stickyHeader) || false;
	const withoutTopBorder = tableProps?.get(TableProps.propNames.withoutTopBorder) || false;
	const onRowClick = tableProps?.get(TableProps.propNames.onRowClick) || null;
	const deepPropsComparation = tableProps?.get(TableProps.propNames.deepPropsComparation) || false;
	const isEditingMode = tableProps?.get(TableProps.propNames.isEditingMode) || false;

	customClasses["tableHeader"] = tableProps?.getStyle(TableProps.ruleNames.tableHeader) || null;
	customClasses["tableRow"] = tableProps?.getStyle(TableProps.ruleNames.tableRow) || null;
	customClasses["tableCell"] = tableProps?.getStyle(TableProps.ruleNames.tableCell) || null;
	customClasses["headerCell"] = tableProps?.getStyle(TableProps.ruleNames.headerCell) || null;
	customClasses["tableContainer"] = tableProps?.getStyle(TableProps.ruleNames.tableContainer) || null;
	customClasses["container"] = tableProps?.getStyle(TableProps.ruleNames.container) || null;
	customClasses["table"] = tableProps?.getStyle(TableProps.ruleNames.table) || null;

	const refScrolled = useRef();

	const [scrolled, setScrolled] = useState(0);
	const [tableSize, setTableSize] = useState({ width: 0, height: 0 });

	const [selectedNumber, tableSelectionStatus, selectionMethods] = useTableSelection(rows);

	const classes = useStyles({
		withoutTopBorder,
		selectMode,
		stickyHeader,
		scrolled,
		onRowClick,
	});

	useEffect(() => {
		const handleResize = () => {
			if (refScrolled.current.offsetHeight < refScrolled.current.scrollHeight)
				setScrolled(refScrolled.current.offsetWidth - refScrolled.current.clientWidth);
			else setScrolled(0);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		/* istanbul ignore next */
		return () => window.removeEventListener("resize", handleResize);
	}, [refScrolled, tableSize.width, tableSize.height]);

	const tableHeaders = buildTableHeaders(
		headers,
		classes,
		customClasses,
		selectMode,
		tableSelectionStatus,
		selectionMethods,
	);

	const tableRows = buildTableRows(
		rows,
		classes,
		customClasses,
		selectMode,
		onRowClick,
		selectionMethods,
		deepPropsComparation,
		context,
		isEditingMode,
	);

	const stickerTableHeader =
		stickyHeader === true ? (
			<StickerTableHeader selectMode={selectMode} classes={classes} tableHeaders={tableHeaders} />
		) : null;

	/* istanbul ignore next */
	const onResize = useCallback((width, height) => setTableSize({ width: width, height: height }), [setTableSize]);

	return (
		<TableContainer className={classNames(classes.container, customClasses.container)}>
			{tableInfo}
			{stickerTableHeader}
			<FullTable
				ref={refScrolled}
				classes={classes}
				customClasses={customClasses}
				onResize={onResize}
				selectedNumber={selectedNumber}
				scrollLoader={scrollLoader}
				tableHeaders={tableHeaders}
				dataRows={rows}
				tableRows={tableRows}
				stickyHeader={stickyHeader}
				latestPage={latestPage}
				pageLength={pageLength}
				placeholder={placeholder}
				deepPropsComparation={deepPropsComparation}
				context={context}
			/>
		</TableContainer>
	);
};

export default React.memo(
	Table,
	(prev, next) => false, //editingMode(prev.tableProps, next.tableProps) && rowAreIdentical(prev.rows, next.rows) && headersAreIdentical(prev.headers, next.headers),
);
