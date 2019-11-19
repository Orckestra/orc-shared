import styled from "styled-components";
import Icon from "../Icon";
import { getThemeProp, ifFlag } from "../../utils";
import { branchLength } from "./settings";

export const Indicator = styled(Icon).attrs({
	id: ifFlag(
		"open",
		getThemeProp(["icons", "indicators", "down"], "chevron-down"),
		getThemeProp(["icons", "indicators", "right"], "chevron-right"),
	),
})`
	font-size: 10px;
	padding: 10px 0 10px 10px;
	cursor: pointer;
	flex: 0 0 auto;
	color: ${ifFlag(
		"open",
		ifFlag("dark", "#ccc", "#333"),
		getThemeProp(["appHighlightColor"], "#ffffff"),
	)};
`;

export const BeforeIndicator = styled.div`
	background-color: #666;
	margin-left: -${props => branchLength(props) + 1}px;
	width: ${props => branchLength(props) + 1}px;
	height: 1px;
	z-index: 99;
	position: absolute;
`;

export const NonIndicator = styled.div`
	height: 1px;
	width: ${props => branchLength(props) + 21}px;
	margin: auto 0 auto -${props => branchLength(props) + 1}px;
	background-color: #666;
	align-self: stretch;
	flex: 0 0 auto;
	z-index: 99;
`;

export const Label = styled.div`
	cursor: pointer;
	flex-grow: 1;
`;
