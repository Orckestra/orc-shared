import React, { Profiler, useEffect, useRef, useState } from "react";
import TableMui from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import CheckboxMui from "@material-ui/core/Checkbox";
import { logProfiler } from "../../../utils/profilerHelper";
import withDeferredTooltip from "../hocs/withDeferredTooltip";
import { tableSelectionMode, useTableSelection } from "./useTableSelection";
import { TableProps } from "./TableProps";

export const useStyles = makeStyles(theme => ({
	container: {
		flex: "0 1 100%",
		fontSize: theme.typography.fontSize,
		overflow: props => (props.stickyHeader ? "hidden" : "auto"),
	},
	tableContainer: {
		height: props =>
			"calc(100% - " + (props.stickyHeader ? props.tableHeight : 0) + "px)",
		overflowY: "auto",
	},
	table: {
		tableLayout: "fixed",
	},
	stickyHeaderHead: {
		borderTop: props =>
			props.withoutTopBorder ? "none" : "1px solid " + theme.palette.grey.borders,
		borderBottom: "1px solid " + theme.palette.grey.borders,
		backgroundColor: theme.palette.grey.lighter,
		display: "flex",
		overflow: "hidden",
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
		borderTop: props =>
			props.withoutTopBorder ? "none" : "1px solid " + theme.palette.grey.borders,
		borderBottom: props =>
			props.stickyHeader ? "none" : "1px solid " + theme.palette.grey.borders,
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
			backgroundColor: props =>
				props.onRowClick ? theme.palette.grey.lighter : theme.palette.background.paper,
		},
	},
	tableCell: {
		padding: "20px 16px",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	tableCellSelect: {
		padding: "17px 16px",
		width: "50px",
	},
	headerCell: {
		padding: "11px 16px",
		textAlign: "left",
		fontWeight: theme.typography.fontWeightBold,
	},
	headerCellSelect: {
		padding: "8px 16px",
		width: "50px",
		textAlign: "left",
		fontWeight: theme.typography.fontWeightBold,
	},
	rowSelectCheckbox: {
		padding: 0,
	},
}));

function propsAreEqualRow(prev, next) {
	return prev.selected === next.selected;
}

export const MemoTableRow = React.memo(TableRow, propsAreEqualRow);

function propsAreEqualBody(prev, next) {
	return (
		next.contentTimestamp !== undefined &&
		prev.contentTimestamp === next.contentTimestamp &&
		prev.selectedNumber === next.selectedNumber
	);
}

const TableBody = props => {
	return <tbody className={props.className}>{props.rows}</tbody>;
};

export const MemoTableBody = React.memo(TableBody, propsAreEqualBody);

const TableCell = withDeferredTooltip(
	React.forwardRef((props, ref) => {
		return (
			<td className={props.className} ref={ref} {...props}>
				{props.value}
			</td>
		);
	}),
);

// We will assume for now that cell will never change value so we want to avoid rerendering as much as possible
export const MemoTableCell = React.memo(TableCell, () => true);

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

const StickerTableHeader = React.forwardRef((props, refHeader) => (
	<div key="stickyHeader" className={props.classes.stickyHeaderHead}>
		<TableMui className={props.classes.stickyHeaderTable}>
			<TableHead ref={refHeader}>
				<TableRow>{props.tableHeaders}</TableRow>
			</TableHead>
		</TableMui>
		<div className={props.classes.stickyHeaderTableScroll} />
	</div>
));

const buildTableHeaders = (
	headers,
	classes,
	selectMode,
	tableSelectionStatus,
	selectionMethods,
) => {
	const tableCheckbox =
		selectMode === true
			? [buildTableCheckbox(classes, tableSelectionStatus, selectionMethods)]
			: [];

	return tableCheckbox.concat(
		headers.map((header, index) => (
			<th key={index} className={classes.headerCell} style={header.cellStyle}>
				{header.cellElement}
			</th>
		)),
	);
};

const buildTableRows = (rows, classes, selectMode, onRowClick, selectionHandlers) => {
	const onClick = (evt, row) => {
		if (evt.target.tagName !== "INPUT") {
			onRowClick(evt, row.element);
		}
	};

	return rows.map(row => (
		<MemoTableRow
			className={classes.tableRow}
			key={row.key}
			onClick={evt => onClick(evt, row)}
			selected={selectionHandlers.isSelected(row.key)}
		>
			{selectMode === true ? buildRowCheckbox(classes, row.key, selectionHandlers) : null}
			{row.columns.map((cell, cellIndex) => (
				<MemoTableCell
					className={classes.tableCell}
					key={cellIndex}
					value={cell.cellElement}
					titleValue={cell.title}
					style={cell.cellStyle}
				/>
			))}
		</MemoTableRow>
	));
};

const FullTable = React.forwardRef((props, ref) => {
	const scrollEvent = evt => {
		if (
			evt.target.scrollHeight - (evt.target.scrollTop + evt.target.offsetHeight) < 100 &&
			props.rows.length === props.latestPage * props.pageLength
		) {
			props.scrollLoader(props.latestPage + 1);
		}
	};

	return (
		<div
			key="actualTable"
			className={props.classes.tableContainer}
			ref={ref}
			onScroll={scrollEvent}
		>
			<TableMui className={props.classes.table}>
				<TableHead
					className={props.classes.tableHeader}
					ref={props.stickyHeader ? null : ref}
				>
					<TableRow>{props.tableHeaders}</TableRow>
				</TableHead>
				{/* TODOJOC : Remove the Profiler*/}
				<Profiler id="TableBodyTable" onRender={logProfiler}>
					<MemoTableBody
						className={props.classes.tableBody}
						contentTimestamp={props.contentTimestamp}
						rows={props.rows}
						selectedNumber={props.selectedNumber}
					/>
				</Profiler>
			</TableMui>
		</div>
	);
});

const Table = ({
	contentTimestamp,
	headers,
	rows,
	scrollLoader,
	latestPage,
	pageLength,
	placeholder,
	tableProps,
}) => {
	if (tableProps != null && tableProps instanceof TableProps === false) {
		throw new TypeError("tableProps property is not of type TableProps");
	}

	const selectMode = tableProps?.get(TableProps.propNames.selectMode) || false;
	const stickyHeader = tableProps?.get(TableProps.propNames.stickyHeader) || false;
	const withoutTopBorder =
		tableProps?.get(TableProps.propNames.withoutTopBorder) || false;
	const onRowClick = tableProps?.get(TableProps.propNames.onRowClick) || false;

	const refScrolled = useRef();
	const refHeader = useRef();

	const [tableHeight, setHeight] = useState(41);
	const [scrolled, setScrolled] = useState(0);

	const [selectedNumber, tableSelectionStatus, selectionMethods] = useTableSelection(
		rows,
	);

	const classes = useStyles({
		withoutTopBorder,
		selectMode,
		stickyHeader,
		scrolled,
		tableHeight,
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

		return () => window.removeEventListener("resize", handleResize);
	}, [refScrolled, contentTimestamp]);

	useEffect(() => {
		if (stickyHeader) {
			setHeight(refHeader.current.clientHeight);
		}
	}, [refHeader, stickyHeader]);

	const tableHeaders = buildTableHeaders(
		headers,
		classes,
		selectMode,
		tableSelectionStatus,
		selectionMethods,
	);

	const tableRows = buildTableRows(
		rows,
		classes,
		selectMode,
		onRowClick,
		selectionMethods,
	);

	const stickerTableHeader =
		stickyHeader === true ? (
			<StickerTableHeader
				ref={refHeader}
				selectMode={selectMode}
				classes={classes}
				tableHeaders={tableHeaders}
			/>
		) : null;

	return (
		<TableContainer className={classes.container}>
			{stickerTableHeader}
			<FullTable
				ref={refScrolled}
				classes={classes}
				selectedNumber={selectedNumber}
				scrollLoader={scrollLoader}
				tableHeaders={tableHeaders}
				rows={tableRows}
				stickyHeader={stickyHeader}
				tableHeight={tableHeight}
				contentTimestamp={contentTimestamp}
				latestPage={latestPage}
				pageLength={pageLength}
			/>
			{tableRows.length > 0 ? null : placeholder}
		</TableContainer>
	);
};

function tablePropsAreEqual(prev, next) {
	return (
		next.contentTimestamp !== undefined && prev.contentTimestamp === next.contentTimestamp
	);
}

export default React.memo(Table, tablePropsAreEqual);
