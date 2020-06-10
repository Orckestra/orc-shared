/*
	Multiple lists with a single header, aligned with each other
	No virtualization or page loading
	Categories can be folded up to hide content
	Sortable, within categories
*/
import React from "react";
import styled, { css } from "styled-components";
import { compose, setDisplayName } from "recompose";
import { safeGet, ifFlag, getThemeProp } from "../utils";
import withScrollBox from "../hocs/withScrollBox";
import useViewState from "../hooks/useViewState";
import Icon from "./Icon";
import Row from "./List/Row";
import HeadRow from "./List/HeadRow";
import { useListState, Table, Placeholder, HEADER_HEIGHT } from "./List/List";

const arrayToggle = (array, item) =>
	array.includes(item) ? array.filter(x => x !== item) : array.concat(item);

export const CategoryRow = styled.tr``;

export const CategoryHeader = styled.td`
	border: 0 solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	border-top-width: 1px;
	tr:first-child & {
		border-top-width: 0;
	}
	tr:last-child & {
		border-bottom-width: 1px;
	}

	position: relative;
	padding: 11px 45px;
	background-color: #f1eae0;
	${ifFlag(
		"closed",
		css`
			border-bottom: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
		`,
	)}
	cursor: pointer;
`;

export const CategoryIndicator = styled(Icon).attrs(props => ({
	id: ifFlag(
		"closed",
		getThemeProp(["icons", "indicators", "right"], "chevron-right"),
		getThemeProp(["icons", "indicators", "down"], "chevron-down"),
	)(props),
}))`
	font-size: 12px;
	position: absolute;
	left: 22px;
	top: 15px;
`;

export const CategoryList = ({
	name,
	columnDefs = [],
	rows = [],
	rowOnClick,
	placeholder,
	keyField = ["id"],
	categoryField = ["category"],
	openAll = false,
	height,
	rowBackgroundGetter = () => {},
}) => {
	const [enhancedColumnDefs, selection] = useListState(name, columnDefs);
	const [{ closedCategories = [] }, updateViewState] = useViewState(name);
	if (columnDefs.length === 0) return null;
	const rowIds = [],
		rowCategories = {};
	rows.forEach((row, index) => {
		const id = safeGet(row, ...keyField) + ""; // Ensure rowId is string
		const category = safeGet(row, ...categoryField) || "";
		rowIds.push(id);
		if (!rowCategories[category]) {
			rowCategories[category] = [];
		}
		rowCategories[category].push(
			<Row
				columnDefs={enhancedColumnDefs}
				key={id}
				rowId={id}
				row={row}
				rowOnClick={rowOnClick}
				selected={selection.indexOf(id) !== -1}
				bgColor={rowBackgroundGetter(row, index)}
			/>,
		);
	});
	const rowElements = [];
	if (Object.keys(rowCategories).length === 0) {
		if (placeholder) {
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
	} else {
		Object.entries(rowCategories).forEach(([key, rows]) => {
			const clickHandler = () =>
				updateViewState("closedCategories", arrayToggle(closedCategories, key));
			const closed = !openAll && closedCategories.includes(key);
			rowElements.push(
				<CategoryRow key={"category_" + key}>
					<CategoryHeader
						data-test-id={"category_" + key}
						closed={closed}
						colSpan={columnDefs.length}
						onClick={clickHandler}
					>
						<CategoryIndicator closed={closed} />
						{key}
					</CategoryHeader>
				</CategoryRow>,
			);
			if (!closed) {
				rowElements.push(...rows);
			}
		});
	}
	return (
		<Table>
			<thead>
				<HeadRow
					columnDefs={enhancedColumnDefs}
					rowIds={rowIds}
					allSelected={rows.length === selection.length && rows.length !== 0}
				/>
			</thead>
			<tbody>{rowElements}</tbody>
		</Table>
	);
};

const StatefulCategoryList = compose(
	setDisplayName("CategoryList"),
	withScrollBox,
)(CategoryList);

export default StatefulCategoryList;
