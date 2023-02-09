// import styled from "styled-components";
import { styled } from "@mui/material/styles";

const Form = styled.div`
	box-sizing: border-box;
	flex-basis: 0;
	flex-shrink: 0;
	flex-grow: ${({ spanWidth = 1 }) => spanWidth};
	display: flex;
	flex-direction: column;
	padding: 0;
	padding-right: 20px;
	padding-top: 0;
	font-size: 12px;

	&:first-of-type {
		padding-left: 20px;
	}
`;

export default Form;
