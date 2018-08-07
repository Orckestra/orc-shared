import React from "react";
import styled, { css } from "styled-components";
import { ifFlag } from "../../utils";
import Text from "../Text";

export const FieldBox = styled.div`
	flex: 0 1 auto;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;

export const Label = styled.label`
	color: #999999;
	min-height: 17px;
	${ifFlag(
		"center",
		css`
			text-align: center;
		`,
	)};
	${ifFlag(
		"labelOnly",
		"",
		css`
			margin-bottom: 10px;
		`,
	)};
`;

const Field = ({ label, center, labelOnly, children }) => (
	<FieldBox>
		{label !== undefined ? (
			<Label labelOnly={labelOnly} center={center}>
				<Text message={label} />
			</Label>
		) : null}
		{labelOnly ? null : children}
	</FieldBox>
);

export default Field;
