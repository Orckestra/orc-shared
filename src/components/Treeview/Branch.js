import styled, { css } from "styled-components";
import { ifFlag, getThemeProp } from "../../utils";
import { branchIndent, branchLength, branchHeight } from "./settings";

const baseBranch = css`
	margin: 0;
	font-size: 13px;
	list-style-type: none;
	border-width: 0;
	border-style: solid;
	border-color: #666;
	position: relative;
`;

export const Branch = styled.ul`
	${baseBranch}

	margin-left: ${branchIndent}px;
	padding: 0;
	padding-left: ${branchLength}px;
	border-left-width: 1px;

	&:last-child::after {
		/* blocker - hides lowest part of vertical branch */
		content: " ";
		background-color: ${ifFlag("dark", getThemeProp(["colors", "bgDark"], "#333333"), "#fff")};
		position: absolute;
		left: -${props => branchIndent(props) + branchLength(props) + 2}px;
		bottom: 0;
		top: -${branchHeight}px;
		width: 1px;
	}
`;

export const Wrapper = styled.ul`
	${baseBranch}

	overflow-y: auto;
	overflow-x: hidden;
	margin-left: 0;
	padding: ${props => branchLength(props) - 5}px;

	& > ${Branch} {
		/* First Branch immediately under Wrapper needs margin adjusted to look right */
		margin-left: ${props => 1.5 * branchIndent(props)}px;
	}
`;
