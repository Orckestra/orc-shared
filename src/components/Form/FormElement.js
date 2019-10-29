import styled from "styled-components";

const Form = styled.div`
	box-sizing: border-box;
	flex-basis: calc(
		100% * ${({ colCount = 1, spanWidth = 1 }) => spanWidth / colCount}
	);
	flex-shrink: 0;
	flex-grow: 0;
	display: flex;
	flex-direction: column;
	padding: 50px;
	padding-top: 0;
	font-size: 12px;

	&:first-child {
		padding-left: 20px;
	}
`;

export default Form;
