import React from "react";
import styled, { css } from "styled-components";
import Field, { FieldBox } from "./Field";

export const CombiningRow = styled.div`
	display: flex;
	flex-direction: row;

	& > ${FieldBox} {
		margin-top: 0;
		margin-right: 15px;
	}
	& > ${FieldBox}:last-child {
		margin-right: 0;
	}
	${props =>
		props.proportions.map((width, index) =>
			width
				? css`
		& > ${FieldBox}:nth-child(${index + 1}) {
			flex: ${typeof width === "string" ? "0 0 " + width : "0 1 " + width + "%"};
		}
	`
				: "",
		)};
`;

const CombinationField = ({ label, children, proportions = [] }) => (
	<Field label={label}>
		<CombiningRow proportions={proportions}>{children}</CombiningRow>
	</Field>
);

export default CombinationField;
