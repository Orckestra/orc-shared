import React from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import withScopeSelect from "./withScopeSelect";
import { getThemeProp, switchEnum, ifFlag } from "../../utils";

export const ScopeIcon = styled(Icon).attrs({
	id: getThemeProp(["icons", "scopeTypes", props => props.type], "cross"),
})`
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
	${ifFlag(
		"onClick",
		css`
			&:hover {
				background-color: #222;
			}
		`,
		css`
			color: #999;
			cursor: default;
		`,
	)};
	${ifFlag(
		"isGlobal",
		css`
			text-transform: uppercase;
		`,
	)};
`;

export const ScopeNode = ({ type, name, id, isAuthorizedScope, onClick }) => (
	<ContentLabel
		isGlobal={type === "Global"}
		onClick={isAuthorizedScope && type !== "Virtual" ? onClick : undefined}
	>
		<ScopeIcon type={type} />
		<ScopeText type={type}>{name || id}</ScopeText>
	</ContentLabel>
);

export default withScopeSelect(ScopeNode);
