import styled from "styled-components";
import { ifFlag } from "../../utils";
import { branchLength, branchHeight } from "./settings";

export const Root = styled.li`
	position: relative;
	display: flex;
	align-items: center;
`;

export const Leaf = styled(Root)`
	&:last-child::after {
		/* blocker - hides lowest part of vertical branch */
		content: " ";
		background-color: ${ifFlag("dark", "#333", "#fff")};
		position: absolute;
		top: calc(50%);
		left: -${props => branchLength(props) + 1}px;
		bottom: 0;
		height: ${branchHeight}px;
		width: 1px;
		height: 50%;
	}
`;
