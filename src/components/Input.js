import styled from "styled-components";

const Input = styled.input`
	box-sizing: border-box;
	flex: 0 0 auto;
	padding: 5px 10px;
	border: 1px solid #ccc;
	border-radius: 5px;

	&:focus {
		outline: 0;
		border-color: #4fa1f0;
		box-shadow: 0 0 4px #4fa1f0;
		outline: none;
	}
`;

export default Input;
