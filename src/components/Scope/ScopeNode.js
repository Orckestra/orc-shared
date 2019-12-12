import React from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import withScopeSelect from "./withScopeSelect";
import { getThemeProp, switchEnum } from "../../utils";

export const ScopeIcon = styled(Icon).attrs(props => ({
	id: getThemeProp(
		["icons", "scopeTypes", props => props.type],
		"cross",
	)(props),
}))`
	font-size: 20px;
	vertical-align: middle;
	padding-right: 8px;
	flex-shrink: 0;
	color: ${getThemeProp(["scopeTypeColors", props => props.type], "inherit")};
`;

export const ScopeText = styled.div`
	word-break: break-word;
`;

export const ContentLabel = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	width: 100%;
	${switchEnum("type", {
		Global: css`
			text-transform: uppercase;
			&:hover {
				background-color: #222;
			}
		`,
		Virtual: css`
			color: #999;
			cursor: default;
		`,
		default: css`
			&:hover {
				background-color: #222;
			}
		`,
	})};
`;

export const ScopeNode = ({ type, name, id, onClick }) => (
	<ContentLabel type={type} onClick={type === "Virtual" ? undefined : onClick}>
		<ScopeIcon type={type} />
		<ScopeText>{name || id}</ScopeText>
	</ContentLabel>
);

export default withScopeSelect(ScopeNode);
