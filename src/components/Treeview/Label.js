import styled from "styled-components";
import Icon from "../Icon";
import { getThemeProp, ifFlag } from "utils";
import { branchHeight } from "./settings";

export const Indicator = styled(Icon).attrs({
	id: ifFlag(
		"open",
		getThemeProp(["indicatorIcons", "down"], "chevron-down"),
		getThemeProp(["indicatorIcons", "right"], "chevron-right"),
	),
})`
	font-size: 10px;
	padding: 10px;
	cursor: pointer;
	flex: 0 0 auto;
	color: ${ifFlag(
		"open",
		"#ccc",
		getThemeProp(["appHighlightColor"], "#ffffff"),
	)};
`;

export const NonIndicator = styled.div`
	height: 1px;
	width: 20px;
	margin-right: 10px;
	margin-top: auto;
	margin-bottom: ${branchHeight}px;
	background-color: #666;
	align-self: stretch;
	flex: 0 0 auto;
`;

export const Label = styled.div`
	cursor: pointer;
	flex-grow: 1;
`;
