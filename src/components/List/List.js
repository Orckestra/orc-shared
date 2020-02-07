import React from "react";
import pt from "prop-types";
import styled from "styled-components";
import { compose, branch, setDisplayName } from "recompose";
import { safeGet } from "../../utils";
import withScrollBox from "../../hocs/withScrollBox";
import withInfiniteScroll from "../../hocs/withInfiniteScroll";
import Row from "./Row";
import HeadRow from "./HeadRow";
import withListState from "./withListState";

export const PlaceholderCell = styled.div`
	height: ${/* istanbul ignore next*/ props => props.cssHeight || 100}px;
	display: flex;
	justify-content: center;
`;

export const PlaceholderBox = styled.div`
	padding-top: 30px;
	width: 100%;
	margin: auto;
`;

export const Placeholder = ({ width, height, children }) => (
	<tr>
		<td colSpan={width} style={{ padding: 0 }}>
			<PlaceholderCell cssHeight={height}>
				<PlaceholderBox>{children}</PlaceholderBox>
			</PlaceholderCell>
		</td>
	</tr>
);
Placeholder.displayName = "Placeholder";

export const Table = styled.table`
	border-collapse: collapse;
	table-layout: fixed;
	width: 100%;
	font-size: 13px;
`;

export const HEADER_HEIGHT = 41;
export const ROW_HEIGHT = 51;

const calculateVirtualization = (
	virtual,
	scrollTop,
	scrollBuffer,
	height,
	rows,
) => {
	let virtualFilter, heightAbove, heightBelow;
	if (virtual) {
		const correctedScrollTop = scrollTop - HEADER_HEIGHT; // Subtract header height
		const firstIn = Math.floor(correctedScrollTop / ROW_HEIGHT);
		const firstShow = Math.max(firstIn - scrollBuffer, 0);
		const lastIn = Math.ceil((correctedScrollTop + height) / ROW_HEIGHT);
		const lastShow = Math.min(lastIn + scrollBuffer, rows.length);
		virtualFilter = index => index >= firstShow && index < lastShow;
		heightAbove = firstShow * ROW_HEIGHT;
		heightBelow = (rows.length - lastShow) * ROW_HEIGHT;
	} else {
		virtualFilter = () => true;
		heightAbove = 0;
		heightBelow = 0;
	}
	return { virtualFilter, heightAbove, heightBelow };
};

export const List = ({
	columnDefs = [],
	rows = [],
	rowOnClick,
	placeholder,
	selection = [],
	keyField = ["id"],
	virtual = false,
	scrollTop = 0,
	height = 300, // Arbitrary, set this prop according to scroll viewport size
	scrollBuffer = 10,
	rowBackgroundGetter = () => {},
}) => {
	if (columnDefs.length === 0) return null;
	const rowIds = [],
		rowElements = [];
	const { virtualFilter, heightAbove, heightBelow } = calculateVirtualization(
		virtual,
		scrollTop,
		scrollBuffer,
		height,
		rows,
	);
	rows.forEach((row, index) => {
		const id = safeGet(row, ...keyField) + ""; // Ensure rowId is string
		rowIds.push(id);
		if (!virtualFilter(index)) return;
		rowElements.push(
			<Row
				columnDefs={columnDefs}
				key={id}
				rowId={id}
				row={row}
				onClick={rowOnClick}
				selected={selection.indexOf(id) !== -1}
				bgColor={rowBackgroundGetter(row, index)}
			/>,
		);
	});
	if (virtual && heightAbove) {
		rowElements.unshift(
			<tr key="virtualAbove" style={{ height: heightAbove }} />,
		);
	}
	if (virtual && heightBelow) {
		rowElements.push(<tr key="virtualBelow" style={{ height: heightBelow }} />);
	}
	if (rowElements.length === 0 && placeholder) {
		rowElements.push(
			<Placeholder
				key="placeholder"
				width={columnDefs.length}
				height={height - HEADER_HEIGHT}
			>
				{placeholder}
			</Placeholder>,
		);
	}
	return (
		<Table>
			<thead>
				<HeadRow
					columnDefs={columnDefs}
					rowIds={rowIds}
					allSelected={rows.length === selection.length && rows.length !== 0}
				/>
			</thead>
			<tbody>{rowElements}</tbody>
		</Table>
	);
};

/* istanbul ignore next */
const checkInfiniteScroll = branch(
	({ scrollLoader }) => !!scrollLoader,
	withInfiniteScroll,
);

const StatefulList = compose(
	setDisplayName("List"),
	checkInfiniteScroll,
	withScrollBox,
	withListState,
)(List);
StatefulList.propTypes = {
	columnDefs: pt.arrayOf(pt.object), // Each object must be a valid column definition
	rows: pt.arrayOf(pt.object),
	rowOnClick: pt.func, // Click handler for row.
	// Fires when row is clicked, excluding select or switch columns
	// Event target will have a 'rowId' data value which identifies the clicked row.
	placeholder: pt.node, // A React element to render as placeholder.
	keyField: pt.arrayOf(pt.string), // Path to identifying data field on each row.
	// Infinite/virtual scroll
	// If scrollLoader is present, below props will control the scrolling
	scrollLoader: pt.func, // Loader function. Called with page number to be loaded.
	onScroll: pt.func, // Optional scroll event handler
	loadTrigger: pt.number, // How many pixels from the bottom should the load be triggered. Default: 200
	length: pt.number, // How many elements are loaded, should equal rows.length
	latestPage: pt.number, // The latest page number loaded
	pageLength: pt.number, // The length of a page, in row items. Default: 20.
};

export default StatefulList;
