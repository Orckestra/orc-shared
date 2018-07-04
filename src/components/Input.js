import styled from "styled-components";
import { getThemeProp } from "../utils";

const Input = styled.input`
	font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
	box-sizing: border-box;
	flex: 0 0 auto;
	height: 30px;
	padding: 5px 10px;
	border: 1px solid #ccc;
	border-radius: 5px;

	&:focus {
		border-color: #4fa1f0;
		box-shadow: 0 0 4px #4fa1f0;
		outline: none;
	}
`;

export default Input;
