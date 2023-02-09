import React from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import Text from "../../Text";

export const CenterWrapper = styled.div`
	min-height: 30px;
	display: flex;
	align-items: center;
`;

export const ReadOnlyBlock = styled.p`
	margin: 0;
`;

export const ReadOnly = ({ value }) => (
	<CenterWrapper>
		<ReadOnlyBlock>
			<Text message={value} />
		</ReadOnlyBlock>
	</CenterWrapper>
);

export const Label = styled.p`
	margin: 0;
	font-size: 16px;
`;

export const LineLabel = ({ value }) => (
	<CenterWrapper>
		<Label>
			<Text message={value} />
		</Label>
	</CenterWrapper>
);
