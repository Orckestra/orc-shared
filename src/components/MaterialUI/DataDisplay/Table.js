import React, { useCallback, useEffect, useRef, useState, useImperativeHandle } from "react";
import TableMui from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { createInput, inputTypes } from "../Inputs/createInput";
import { tableSelectionMode, useTableSelection } from "./useTableSelection";
import TableProps, { isTableProps } from "./TableProps";
import classNames from "classnames";
import ResizeDetector from "react-resize-detector";
import { isEqual } from "lodash";
import useViewState from "../../../hooks/useViewState";

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
		minWidth: "auto",
	},
	tableConstrained: {
		minWidth: theme.spacing(83),
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
		padding: theme.spacing(2, 0.5),
		"&:first-child": {
			padding: theme.spacing(2, 0.5, 2, 2),
		},
	},
	tableCellSelect: {
		padding: theme.spacing(2, 0.5),
		width: theme.spacing(3),
		"&:first-child": {
			padding: theme.spacing(2, 0.5, 2, 2),
		},
	},
	headerCell: {
		padding: theme.spacing(1, 0.5),
		textAlign: "left",
		fontWeight: theme.typography.fontWeightSemiBold,
		"&:first-child": {
			padding: theme.spacing(2, 0.5, 2, 2),
		},
	},
	headerCellSelect: {
		padding: theme.spacing(1, 0.5),
		width: theme.spacing(3),
		textAlign: "left",
		fontWeight: theme.typography.fontWeightSemiBold,
		"&:first-child": {
			padding: theme.spacing(2, 0.5, 2, 2),
		},
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

function readOnlyMode(prevTableProps, nextTableProps) {
	const prevEditingMode = prevTableProps?.get(TableProps.propNames.isEditingMode) ?? false;
	const nextEditingMode = nextTableProps?.get(TableProps.propNames.isEditingMode) ?? false;

	return isInReadOnlyMode(prevEditingMode, nextEditingMode);
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
	const isReadOnly = isInReadOnlyMode(prev.isEditingMode, next.isEditingMode);
	if (prev.deepPropsComparation && isReadOnly) {
		return propsAreEqualDeeplyRow(prev.dataRows, next.dataRows) && contextIsIdentical(prev.context, next.context);
	}
	return prev.selected === next.selected && isReadOnly && contextIsIdentical(prev.context, next.context);
}

function propsAreEqualDeeplyRow(prevRow, nextRow) {
	/* istanbul ignore next */
	if (prevRow.length !== nextRow.length) return false;

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

export const MemoTableRow = React.memo(TableRowMemo, propsAreEqualRow);

function isInReadOnlyMode(prevIsEditingMode, nextIsEditingMode) {
	// In editing mode, we need to re-render everytime has cell value may have changed
	return prevIsEditingMode === nextIsEditingMode && !nextIsEditingMode;
}

function propsAreEqualBody(prev, next) {
	let isEqualBody =
		contextIsIdentical(prev.context, next.context) &&
		isInReadOnlyMode(prev.isEditingMode, next.isEditingMode) &&
		prev.selectedNumber === next.selectedNumber &&
		rowAreIdentical(prev.dataRows, next.dataRows);
	if (prev.deepPropsComparation) {
		isEqualBody = isEqualBody && propsAreEqualDeeplyRow(prev.dataRows, next.dataRows);
	}
	return isEqualBody;
}

const TableBody = ({ deepPropsComparation, isEditingMode, ...props }) => {
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
			{createInput(inputTypes.checkbox, {
				value: rowSelected,
				disabled: false,
				onChange: event => selectionHandlers.selectionHandler(event, key),
			})}
		</td>
	);
};

const buildTableCheckbox = (classes, tableSelectionStatus, selectionMethods) => {
	return (
		<th key="tableSelector" className={classes.headerCellSelect}>
			{createInput(inputTypes.checkbox, {
				value: tableSelectionStatus === tableSelectionMode.all,
				disabled: false,
				indeterminate: tableSelectionStatus === tableSelectionMode.indeterminate,
				onChange: event => selectionMethods.selectionHandler(event, null),
			})}
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

	const mappedRows = rows.map(row => {
		const showStyle = row?.style?.show ?? false;
		const rowClass = row?.style?.customClass ?? "";
		const customClassName = showStyle ? rowClass : "";
		return (
			<MemoTableRow
				className={classNames(
					classes.tableRow,
					customClasses.tableRow,
					customClasses[row.className],
					customClasses[customClassName],
				)}
				key={row.key}
				onClick={evt => onClick(evt, row)}
				selected={selectionHandlers.isSelected(row.key)}
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
		);
	});

	return mappedRows;
};

const FullTable = React.forwardRef((props, ref) => {
	return props.saveScrollbarPosition ? (
		<FullTableWithSavedScrollbar {...props} ref={ref} />
	) : (
		<DefaultFullTable {...props} ref={ref} />
	);
});

const DefaultFullTable = React.forwardRef((props, ref) => {
	const scrollEvent = evt => {
		if (
			evt.target.scrollHeight - (evt.target.scrollTop + evt.target.offsetHeight) < 100 &&
			props.dataRows.length === props.latestPage * props.pageLength
		) {
			props.scrollLoader(props.latestPage + 1);
		}

		props.saveScrollBarPosition?.(evt);
	};

	return (
		<div
			key="actualTable"
			className={classNames(props.classes.tableContainer, props.customClasses.tableContainer)}
			ref={ref}
			onScroll={scrollEvent}
			data-qa="scrollable-table-div"
		>
			<ResizeDetector onResize={props.onResize} />
			<TableMui
				className={classNames(
					props.classes.table,
					props.customClasses.table,
					props.constrained ? props.classes.tableConstrained : "",
				)}
			>
				<TableHead className={classNames(props.classes.tableHeader, props.customClasses.tableHeader)}>
					<TableRow>{props.tableHeaders}</TableRow>
				</TableHead>
				<MemoTableBody
					className={classNames(props.classes.tableBody, props.customClasses.tableBody)}
					dataRows={props.dataRows}
					tableRows={props.tableRows}
					selectedNumber={props.selectedNumber}
					deepPropsComparation={props.deepPropsComparation}
					isEditingMode={props.isEditingMode}
					context={props.context}
				/>
			</TableMui>
			{props.tableRows.length > 0 ? null : (
				<div className={classNames(props.classes.placeholder, props.customClasses.placeholderContainer)}>
					{props.placeholder}
				</div>
			)}
		</div>
	);
});

const FullTableWithSavedScrollbar = React.forwardRef((props, ref) => {
	if (props.saveScrollbarPosition && !props.tableName) {
		throw new Error("prop 'tableName' is required if 'saveScrollbarPosition' is set to true.");
	}

	const [scrollbarViewState, updateScrollbarViewState] = useViewState(props.tableName + "ScrollbarPosition");
	const [scrollbar, setScrollbarPosition] = useState(scrollbarViewState.scrollBarPosition);

	useEffect(
		() => {
			const handler = setTimeout(() => {
				updateScrollbarViewState("scrollBarPosition", scrollbar);
			}, 500);
			return () => {
				clearTimeout(handler);
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[scrollbar],
	);

	const saveScrollBarPosition = evt => {
		setScrollbarPosition(evt.target.scrollTop);
	};

	useEffect(() => {
		if (scrollbarViewState.scrollBarPosition > 0) {
			// The Table component usually display the provided list ASAP however it can happen that the Table is not fully rendered with its items when we attempt to change the scrollTop value.
			// The timer should ensure that the list is rendered before attempting to change the scrollTop if the first attempt was not able to set the scroll position
			// 		This edge case was found using these steps:
			//          * Create an organization with 50+ customers
			//          * Go to the customer section of the organization and scroll down a bit
			//          * Wait 1 second for the scroll position to be stored
			//          * Go to the organization list (click on the tab)
			//          * Go back to the organization (its tab should still be visible)
			//          * We expect the customer list to remember its scroll position but it wasn't the case
			//
			// In addition to the timer, the tableName was added as a dependency to force the effect to execute again when it changes.
			// The tableName value in the organization's customers page is composed with 2 parts: "OrganizationCustomers_" + organizationId. This allows 2 organizations to use different scroll position for their respective customers pages.
			// When the page first load, it is possible for organizationId to not yet be defined (strange but it's routing related) and because of that this useEffect was executed but with an unknown scrollBarPosition.
			// The organizationId will be set on the next render and this useEffect needs be executed again to have the list scrolled to the correct position.

			const previousScrollTop = ref.current.scrollTop;
			ref.current.scrollTop = scrollbarViewState.scrollBarPosition;

			// Note AD20250714: I was not able to create a test for the code below because it needs to run in a real browser otherwise the behavior with scrollTop does not match reality
			/* istanbul ignore if */
			if (ref.current.scrollTop === previousScrollTop) {
				setTimeout(() => {
					// using a timer to give a chance to the UI to populate the list
					ref.current.scrollTop = scrollbarViewState.scrollBarPosition;
				}, 250);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.tableName]); // forcing this effect to run again when the tableName changes

	return <DefaultFullTable {...props} ref={ref} saveScrollBarPosition={saveScrollBarPosition} />;
});

const Table = React.forwardRef(
	({ tableInfo, headers, rows, scrollLoader, latestPage, pageLength, placeholder, tableProps, context }, ref) => {
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
		const selectedRows = tableProps?.get(TableProps.propNames.selectedRows) || null;
		const selectedRowsChanged = tableProps?.get(TableProps.propNames.selectedRowsChanged) || null;
		const constrained = tableProps?.get(TableProps.propNames.constrained) || false;
		const tableName = tableProps?.get(TableProps.propNames.tableName) || null;
		const saveScrollbarPosition = tableProps?.get(TableProps.propNames.saveScrollbarPosition) || false;

		customClasses["tableHeader"] = tableProps?.getStyle(TableProps.ruleNames.tableHeader) || null;
		customClasses["tableRow"] = tableProps?.getStyle(TableProps.ruleNames.tableRow) || null;
		customClasses["tableCell"] = tableProps?.getStyle(TableProps.ruleNames.tableCell) || null;
		customClasses["headerCell"] = tableProps?.getStyle(TableProps.ruleNames.headerCell) || null;
		customClasses["tableContainer"] = tableProps?.getStyle(TableProps.ruleNames.tableContainer) || null;
		customClasses["placeholderContainer"] = tableProps?.getStyle(TableProps.ruleNames.placeholderContainer) || null;
		customClasses["container"] = tableProps?.getStyle(TableProps.ruleNames.container) || null;
		customClasses["table"] = tableProps?.getStyle(TableProps.ruleNames.table) || null;

		if ((selectedRows && !selectedRowsChanged) || (!selectedRows && selectedRowsChanged))
			throw new Error("Both 'selectedRows' and 'selectedRowsChanged' need to be defined if one of them is.");

		const refScrolled = useRef();

		useImperativeHandle(ref, () => ({
			scrollToTop: () => {
				if (refScrolled.current.scrollTop > 0) {
					refScrolled.current.scrollTop = 0;
				}
			},
		}));

		const [scrolled, setScrolled] = useState(0);
		const [tableSize, setTableSize] = useState({ width: 0, height: 0 });

		const [selectedNumber, tableSelectionStatus, selectionMethods] = useTableSelection(
			rows,
			selectedRows,
			selectedRowsChanged,
		);

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
					constrained={constrained}
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
					isEditingMode={isEditingMode}
					context={context}
					tableName={tableName}
					saveScrollbarPosition={saveScrollbarPosition}
				/>
			</TableContainer>
		);
	},
);

export default React.memo(
	Table,
	(prev, next) =>
		readOnlyMode(prev.tableProps, next.tableProps) &&
		rowAreIdentical(prev.rows, next.rows) &&
		headersAreIdentical(prev.headers, next.headers),
);
