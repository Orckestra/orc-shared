import React from "react";
import styled from "styled-components";
import { getThemeProp } from "../../utils";
import Text from "../Text";

export const FieldsetBox = styled.fieldset`
	position: relative;
	box-sizing: border-box;
	display: flex;
	align-self: stretch;
	flex-direction: column;
	flex-wrap: wrap;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-top: 45px;
	margin-left: 0;
	margin-bottom: 0;
	padding: 20px;
	padding-top: 0;
	background-color: #fafafa;
`;
export const Legend = styled.legend`
	position: absolute;
	top: -2em;
	left: -4px;
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-style: italic;
	font-size: 13px;
	text-transform: uppercase;
	color: ${getThemeProp(["appHighlightColor"], "#333")};
`;

const Fieldset = ({ label, children }) => (
	<FieldsetBox>
		<Legend>
			<Text message={label} />
		</Legend>
		{children}
	</FieldsetBox>
);

export default Fieldset;
