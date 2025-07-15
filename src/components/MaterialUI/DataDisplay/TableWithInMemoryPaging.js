import React, { useCallback, useRef } from "react";
import TableProps from "./TableProps";
import buildHeaderAndRowFromConfig from "./tableHelpers";
import useInMemoryPaging from "../../../hooks/useInMemoryPaging";
import Placeholder from "./PredefinedElements/Placeholder";
import { doesObjectContainsTextCaseInsensitive } from "../../../utils/comparisonHelper";
import { useIntl } from "react-intl";
import sharedMessages from "../../../sharedMessages";
import SearchControl from "../Inputs/PredefinedElements/SearchControl";
import Table from "./Table";
import SectionToolbar from "./PredefinedElements/SectionToolbar";
import TableInfoBar from "./PredefinedElements/TableInfoBar";

const listFilter = (list, searchTerm, searchProperties) => {
	if (!searchTerm) {
		return list;
	}

	return list.filter(item => doesObjectContainsTextCaseInsensitive(item, searchTerm, searchProperties));
};

function getTableInfo(totalCountLabelId, noRowsTotalCountLabelId, formatMessage, totalCount) {
	if (totalCountLabelId && noRowsTotalCountLabelId) {
		if (totalCount) {
			return (
				<TableInfoBar
					tableLabel={formatMessage(totalCountLabelId, {
						quantity: totalCount,
					})}
				/>
			);
		}
		return <TableInfoBar tableLabel={formatMessage(noRowsTotalCountLabelId)} />;
	}

	return null;
}

const TableWithInMemoryPaging = ({
	sortedRows,
	tableName,
	searchProperties = [],
	columnDefs,
	toolbarRightContent,
	pageSize = 20,
	onItemClick = null,
	isReadMode = true,
	totalCountLabelId = null,
	noRowsTotalCountLabelId = null,
	placeholderIcon = null,
	placeholderTitle = null,
	placeholderSubtitle = null,
}) => {
	const { formatMessage } = useIntl();
	const tableRef = useRef(null);
	const initialSearchProperties = useRef(searchProperties);
	const searchPlaceholder = formatMessage(sharedMessages.search);
	const sortAndFilter = useCallback(
		({ list, filters }) => {
			const { searchTerm } = filters;

			return listFilter(list, searchTerm, initialSearchProperties.current);
		},
		[initialSearchProperties],
	);

	const {
		rows: rowsSlice,
		scrollLoader,
		currentPage,
		filters,
		setFilter,
		totalCount,
	} = useInMemoryPaging({
		viewStateName: tableName,
		tableRef,
		records: sortedRows,
		pageSize: pageSize,
		sortAndFilterFn: sortAndFilter,
	});

	const { headers, rows } = buildHeaderAndRowFromConfig(columnDefs, rowsSlice, isReadMode);
	const placeholder = (
		<Placeholder
			icon={placeholderIcon}
			title={placeholderTitle}
			subtitle={placeholderSubtitle}
			cellList={columnDefs.map(col => col.placeholder)}
		/>
	);

	const onSearch = (searchOption, searchText) => {
		setFilter({
			...filters,
			searchTerm: searchText,
		});
	};

	const tableProps = new TableProps();
	tableProps.set(TableProps.propNames.stickyHeader, true);
	tableProps.set(TableProps.propNames.withoutTopBorder, true);
	tableProps.set(TableProps.propNames.deepPropsComparation, true);
	tableProps.set(TableProps.propNames.saveScrollbarPosition, true);
	tableProps.set(TableProps.propNames.tableName, tableName);
	if (onItemClick) {
		tableProps.set(TableProps.propNames.onRowClick, onItemClick);
	}

	const hasToolbar = toolbarRightContent || searchProperties.length > 0;
	const toolbar = hasToolbar ? (
		<SectionToolbar rightContent={toolbarRightContent}>
			{searchProperties.length > 0 && (
				<SearchControl
					placeholder={searchPlaceholder}
					defaultValue={filters.searchTerm}
					onSearch={onSearch}
					focusAndSelectSearchFieldOnLoad={false}
				/>
			)}
		</SectionToolbar>
	) : null;

	const tableInfo = getTableInfo(totalCountLabelId, noRowsTotalCountLabelId, formatMessage, totalCount);

	return (
		<>
			{toolbar}

			<Table
				ref={tableRef}
				headers={headers}
				tableInfo={tableInfo}
				rows={rows}
				tableProps={tableProps}
				placeholder={placeholder}
				scrollLoader={scrollLoader}
				latestPage={currentPage}
				pageLength={pageSize}
			/>
		</>
	);
};

export default TableWithInMemoryPaging;
