import React, { useCallback, useEffect, useRef, useState } from "react";
import TableMui from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import CheckboxMui from "@material-ui/core/Checkbox";
import withDeferredTooltip from "../hocs/withDeferredTooltip";
import { tableSelectionMode, useTableSelection } from "./useTableSelection";
import { TableProps } from "./TableProps";
import classNames from "classnames";
import ResizeDetector from "react-resize-detector";

export const useStyles = makeStyles(theme => ({
	container: {
		flex: "0 1 100%",
		fontSize: theme.typography.fontSize,
		overflow: props => (props.stickyHeader ? "hidden" : "auto"),
	},
	tableContainer: {
		height: props => "calc(100% - " + (props.stickyHeader ? props.headerHeight : 0) + "px)",
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
		padding: theme.spacing(2, 1.6),
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	tableCellSelect: {
		padding: theme.spacing(1.7, 1.6),
		width: theme.spacing(5),
	},
	headerCell: {
		padding: theme.spacing(1.1, 1.6),
		textAlign: "left",
		fontWeight: theme.typography.fontWeightBold,
	},
	headerCellSelect: {
		padding: theme.spacing(0.8, 1.6),
		width: theme.spacing(5),
		textAlign: "left",
		fontWeight: theme.typography.fontWeightBold,
	},
	rowSelectCheckbox: {
		padding: 0,
	},
	placeholder: {
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
	},
}));

function rowAreIdentical(prevRows, nextRows) {
	return (
		prevRows.length === nextRows.length && prevRows.findIndex((pr, index) => pr.key !== nextRows[index].key) === -1
	);
}

function propsAreEqualRow(prev, next) {
	return prev.selected === next.selected;
}

export const MemoTableRow = React.memo(TableRow, propsAreEqualRow);

function propsAreEqualBody(prev, next) {
	return prev.selectedNumber === next.selectedNumber && rowAreIdentical(prev.dataRows, next.dataRows);
}

const TableBody = props => {
	return <tbody className={props.className}>{props.tableRows}</tbody>;
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

const buildTableHeaders = (headers, classes, customClasses, selectMode, tableSelectionStatus, selectionMethods) => {
	const tableCheckbox =
		selectMode === true ? [buildTableCheckbox(classes, tableSelectionStatus, selectionMethods)] : [];

	return tableCheckbox.concat(
		headers.map((header, index) => (
			<th key={index} className={classNames(classes.headerCell, customClasses[header.className])}>
				{header.cellElement}
			</th>
		)),
	);
};

const buildTableRows = (rows, classes, customClasses, selectMode, onRowClick, selectionHandlers) => {
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
				<TableCell
					className={classNames(classes.tableCell, customClasses[cell.className])}
					key={cellIndex}
					value={cell.cellElement}
					titleValue={cell.title}
				/>
			))}
		</MemoTableRow>
	));
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
		<div key="actualTable" className={props.classes.tableContainer} ref={ref} onScroll={scrollEvent}>
			<ResizeDetector onResize={props.onResize} />
			<TableMui className={props.classes.table}>
				<TableHead className={props.classes.tableHeader}>
					<TableRow>{props.tableHeaders}</TableRow>
				</TableHead>
				<MemoTableBody
					className={props.classes.tableBody}
					dataRows={props.dataRows}
					tableRows={props.tableRows}
					selectedNumber={props.selectedNumber}
				/>
			</TableMui>
			{props.tableRows.length > 0 ? null : <div className={props.classes.placeholder}>{props.placeholder}</div>}
		</div>
	);
});

const Table = ({ headers, rows, scrollLoader, latestPage, pageLength, placeholder, tableProps }) => {
	if (tableProps != null && tableProps instanceof TableProps === false) {
		throw new TypeError("tableProps property is not of type TableProps");
	}

	const customClasses = tableProps?.get(TableProps.propNames.classes) || {};
	const selectMode = tableProps?.get(TableProps.propNames.selectMode) || false;
	const stickyHeader = tableProps?.get(TableProps.propNames.stickyHeader) || false;
	const withoutTopBorder = tableProps?.get(TableProps.propNames.withoutTopBorder) || false;
	const onRowClick = tableProps?.get(TableProps.propNames.onRowClick) || false;

	const refScrolled = useRef();
	const refHeader = useRef();

	const [headerHeight, setHeaderHeight] = useState(41);
	const [scrolled, setScrolled] = useState(0);
	const [tableSize, setTableSize] = useState({ width: 0, height: 0 });

	const [selectedNumber, tableSelectionStatus, selectionMethods] = useTableSelection(rows);

	const classes = useStyles({
		withoutTopBorder,
		selectMode,
		stickyHeader,
		scrolled,
		headerHeight,
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

	useEffect(() => {
		if (stickyHeader) {
			setHeaderHeight(refHeader.current.clientHeight);
		}
	}, [refHeader, stickyHeader]);

	const tableHeaders = buildTableHeaders(
		headers,
		classes,
		customClasses,
		selectMode,
		tableSelectionStatus,
		selectionMethods,
	);

	const tableRows = buildTableRows(rows, classes, customClasses, selectMode, onRowClick, selectionMethods);

	const stickerTableHeader =
		stickyHeader === true ? (
			<StickerTableHeader ref={refHeader} selectMode={selectMode} classes={classes} tableHeaders={tableHeaders} />
		) : null;

	/* istanbul ignore next */
	const onResize = useCallback((width, height) => setTableSize({ width: width, height: height }), [setTableSize]);

	return (
		<TableContainer className={classes.container}>
			{stickerTableHeader}
			<FullTable
				ref={refScrolled}
				classes={classes}
				onResize={onResize}
				selectedNumber={selectedNumber}
				scrollLoader={scrollLoader}
				tableHeaders={tableHeaders}
				dataRows={rows}
				tableRows={tableRows}
				stickyHeader={stickyHeader}
				headerHeight={headerHeight}
				latestPage={latestPage}
				pageLength={pageLength}
				placeholder={placeholder}
			/>
		</TableContainer>
	);
};

export default React.memo(Table, (prev, next) => rowAreIdentical(prev.rows, next.rows));
