import React, { Profiler, useEffect, useRef, useState } from "react";
import TableMui from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import CheckboxMui from "@material-ui/core/Checkbox";
import ComponentProps from "../componentProps";
import { logProfiler } from "../../../utils/profilerHelper";
import withDeferredTooltip from "../hocs/withDeferredTooltip";

export class TableProps extends ComponentProps {
	static propNames = {
		withoutTopBorder: "withoutTopBorder",
		stickyHeader: "stickyHeader",
		selectMode: "selectMode",
		onRowClick: "onRowClick",
	};

	constructor() {
		super();

		this.componentProps.set(this.constructor.propNames.withoutTopBorder, null);
		this.componentProps.set(this.constructor.propNames.stickyHeader, null);
		this.componentProps.set(this.constructor.propNames.selectMode, null);
		this.componentProps.set(this.constructor.propNames.onRowClick, null);
	}
}

const useStyles = makeStyles(theme => ({
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
		marginTop: props => "-" + (props.stickyHeader ? props.tableHeight : 0) + "px",
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
		width: props => "calc(100% - " + props.scrolled + "px)",
	},
	stickyHeaderTableScroll: {
		width: props => props.scrolled + "px",
		backgroundColor: "red", // TODOJOC : Change it at the end for ----->   theme.palette.grey.lighter
		display: props => (props.scrolled > 0 ? "block" : "none"),
	},
	tableHeader: {
		borderTop: props =>
			props.withoutTopBorder ? "none" : "1px solid " + theme.palette.grey.borders,
		borderBottom: props =>
			props.stickyHeader ? "none" : "1px solid " + theme.palette.grey.borders,
		backgroundColor: theme.palette.grey.lighter,
		display: props => (props.stickyHeader ? "table-header-group" : "table-header-group"),
		overflow: "hidden",
		cursor: "default",
		//marginTop: props => "-" + (props.stickyHeader ? props.tableHeight : 0) + "px",
	},
	tableBody: {
		overflowX: "hidden",
		overflowY: "auto",
	},
	tableRow: {
		borderBottom: "1px solid " + theme.palette.grey.borders,
		cursor: props => (props.onRowClick ? "pointer" : "default"),
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

const MemoTableRow = React.memo(TableRow, propsAreEqualRow);

const TableBody = props => {
	return <tbody className={props.className}>{props.rows}</tbody>;
};

function propsAreEqualBody(prev, next) {
	return (
		next.contentTimestamp !== undefined &&
		prev.contentTimestamp === next.contentTimestamp &&
		prev.selectedNumber === next.selectedNumber
	);
}

const MemoTableBody = React.memo(TableBody, propsAreEqualBody);

// TODOJOC : Move that to a different file
const staticSelectionHandlers = {
	selectionHandler: null,
	isSelected: null,
};

const tableSelectionMode = Object.freeze({ none: 1, indeterminate: 2, all: 3 });

const useTableSelection = rows => {
	const [selected, setSelected] = useState({});
	const selectedNumber = Object.keys(selected).length;

	staticSelectionHandlers.selectionHandler = (event, key) => {
		console.log(
			"useTableSelection useTableSelection useTableSelection useTableSelection",
		);

		const newSelection = {
			...(key === null ? {} : selected),
		};

		if (key === null) {
			if (event.target.checked) {
				rows.forEach(r => (newSelection[r.key] = true));
			}
		} else {
			if (event.target.checked) newSelection[key] = event.target.checked;
			else delete newSelection[key];
		}

		setSelected(newSelection);
	};

	staticSelectionHandlers.isSelected = key => selected[key] === true;

	const tableSelectionStatus =
		selectedNumber === 0
			? tableSelectionMode.none
			: selectedNumber === rows.length
			? tableSelectionMode.all
			: tableSelectionMode.indeterminate;

	return [selectedNumber, tableSelectionStatus];
};

const TempCell = withDeferredTooltip(
	React.forwardRef((props, ref) => {
		return (
			<td className={props.className} ref={ref} {...props}>
				{props.cellValue}
			</td>
		);
	}),
);

// We assume cell will never change value so we want to avoid rerendering as much as possible
const MemoTableCell = React.memo(TempCell, () => true);

const buildRowCheckbox = (classes, key) => {
	const rowSelected = staticSelectionHandlers.isSelected(key);

	return (
		<td className={classes.tableCellSelect} selected={rowSelected}>
			<CheckboxMui
				className={classes.rowSelectCheckbox}
				checked={rowSelected}
				onChange={event => staticSelectionHandlers.selectionHandler(event, key)}
			/>
		</td>
	);
};

const buildTableCheckbox = (classes, tableSelectionStatus) => {
	return (
		<th key="tableSelector" className={classes.headerCellSelect}>
			<CheckboxMui
				className={classes.rowSelectCheckbox}
				checked={tableSelectionStatus === tableSelectionMode.all}
				indeterminate={tableSelectionStatus === tableSelectionMode.indeterminate}
				onChange={event => staticSelectionHandlers.selectionHandler(event, null)}
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

const buildTableHeaders = (headers, classes, selectMode, tableSelectionStatus) => {
	const tableCheckbox =
		selectMode === true ? [buildTableCheckbox(classes, tableSelectionStatus)] : [];

	return tableCheckbox.concat(
		headers.map((header, index) => (
			<th key={index} className={classes.headerCell} style={header.cellStyle}>
				{header.cellElement}
			</th>
		)),
	);
};

const buildTableRows = (rows, classes, selectMode, onRowClick) => {
	const onClick = (evt, row) => {
		if (evt.target.tagName !== "INPUT") {
			onRowClick(evt, row.element);
		}
	};

	return rows.map(row => (
		<MemoTableRow
			className={classes.tableRow}
			key={row.key}
			selected={staticSelectionHandlers.isSelected(row.key)}
			onClick={evt => onClick(evt, row)}
		>
			{selectMode === true ? buildRowCheckbox(classes, row.key) : null}
			{row.columns.map((cell, cellIndex) => (
				<MemoTableCell
					className={classes.tableCell}
					key={cellIndex}
					cellValue={cell.cellElement}
					value={cell.title}
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

// TODOJOC : Each row in the rows array requires a "key"
const Table = ({
	contentTimestamp,
	headers,
	rows,
	scrollLoader,
	latestPage,
	pageLength,
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

	const [selectedNumber, tableSelectionStatus] = useTableSelection(rows);

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

		return () => window.removeEventListener("resize", handleResize);
	}, [refScrolled, contentTimestamp]);

	useEffect(() => {
		if (stickyHeader) setHeight(refHeader.current.clientHeight);
	}, [refHeader, stickyHeader]);

	// TODOJOC CREATE onClick for MemoTableRow

	const tableHeaders = buildTableHeaders(
		headers,
		classes,
		selectMode,
		tableSelectionStatus,
	);

	const tableRows = buildTableRows(rows, classes, selectMode, onRowClick);

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
		</TableContainer>
	);
};

function tablePropsAreEqual(prev, next) {
	return (
		next.contentTimestamp !== undefined &&
		prev.contentTimestamp === next.contentTimestamp &&
		prev.latestPage === next.latestPage
	);
}

export default React.memo(Table, tablePropsAreEqual);
