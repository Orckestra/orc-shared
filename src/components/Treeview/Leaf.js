import styled from "styled-components";
import { branchLength, branchHeight } from "./settings";

export const Root = styled.li`
	position: relative;
	display: flex;
	align-items: center;
`;

export const Leaf = styled(Root)`
	&:before {
		/* Horizontal branch */
		content: " ";
		background-color: #666;
		position: absolute;
		height: 1px;
		left: -${branchLength}px;
		width: ${branchLength}px;
		bottom: ${branchHeight}px;
	}

	&:last-child::after {
		/* blocker - hides lowest part of vertical branch */
		content: " ";
		background-color: #333;
		position: absolute;
		left: -${props => branchLength(props) + 1}px;
		bottom: 0;
		height: ${branchHeight}px;
		width: 1px;
	}
`;
