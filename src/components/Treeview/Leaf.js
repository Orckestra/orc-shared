import styled, { css } from "styled-components";
import { branchLength, branchHeight } from "./settings";
import { getThemeProp, ifFlag } from "../../utils";

export const Root = styled.li`
	position: relative;
	display: flex;
	align-items: center;
`;

export const Leaf = styled(Root)`
	&:last-of-type::before {
		content: " ";
		background-color: #333;
		width: 1px;
		height: 50%;
		left: -${props => branchLength(props) + 1}px;
		position: absolute;
		top: calc(50%);
	}

	&:last-child::after {
		/* blocker - hides lowest part of vertical branch */
		content: " ";
		background-color: #333;
		position: absolute;
		top: calc(50%);
		left: -${props => branchLength(props) + 1}px;
		bottom: 0;
		height: ${branchHeight}px;
		width: 1px;
		height: 50%;
	}
`;
