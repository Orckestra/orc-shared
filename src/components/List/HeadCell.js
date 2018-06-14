import React from "react";
import styled, { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import Checkbox from "../Checkbox";
import { ifFlag } from "../../utils";

export const UpMark = styled.div`
	display: inline-block;
	margin: 0.05em;
	margin-left: 0.5em;
	height: 0;
	border: 0.25em solid transparent;
	border-top-width: 0;
	border-bottom-color: #999999;
`;

export const DownMark = styled.div`
	display: inline-block;
	margin: 0.05em;
	margin-left: 0.5em;
	height: 0;
	border: 0.25em solid transparent;
	border-bottom-width: 0;
	border-top-color: #999999;
`;

export const MarkBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

export const SortMark = ({ direction }) => {
	switch (direction) {
		case "desc":
			return <DownMark />;
		case "asc":
			return <UpMark />;
		default:
			return (
				<MarkBox>
					<UpMark />
					<DownMark />
				</MarkBox>
			);
	}
};

export const TableHeader = styled.th`
	background-color: #f7f7f7;
	position: sticky;
	top: 0;
	z-index: 10;
	padding: 0;

	${ifFlag(
		"select",
		css`
			width: 56px;
		`,
	)};

	${ifFlag(
		"width",
		css`
			width: ${props => props.width}%;
		`,
	)};
`;

export const HeadBox = styled.div`
	display: flex;
	align-items: center;
	height: 20px;
	width: calc(100% - 40px);
	padding: 10px 20px;
	border-bottom: 1px solid #cccccc;

	& > span {
		overflow-x: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;

const HeadCell = ({ columnDef, rowIds = [], allSelected }) => (
	<TableHeader
		onClick={columnDef.sort}
		select={columnDef.type === "select"}
		width={columnDef.width}
	>
		<HeadBox>
			{columnDef.type === "select" ? (
				<Checkbox
					value={!!allSelected}
					onChange={() => columnDef.onChange(allSelected ? [] : rowIds)}
				/>
			) : columnDef.label ? (
				[
					<FormattedMessage key="msg" {...columnDef.label} />,
					columnDef.sort ? (
						<SortMark key="sort" direction={columnDef.sortDirection} />
					) : null,
				]
			) : null}
		</HeadBox>
	</TableHeader>
);

export default HeadCell;
