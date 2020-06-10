import React from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import useScopeSelect from "./useScopeSelect";
import { getThemeProp, ifFlag } from "../../utils";

export const ScopeIcon = styled(Icon).attrs(props => ({
	id: getThemeProp(["icons", "scopeTypes", props => props.type], "cross")(props),
}))`
	font-size: 20px;
	vertical-align: middle;
	padding-right: 8px;
	flex-shrink: 0;
	color: ${getThemeProp(["colors", "scopeTypes", props => props.type], "inherit")};
`;

export const ScopeText = styled.div`
	overflow-wrap: break-word;
`;

export const ContentLabel = styled.div`
	box-sizing: border-box;
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
			color: ${getThemeProp(["colors", "textMedium"], "#999999")};
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

export const ScopeNode = ({ type, name, id, isAuthorizedScope, closeSelector }) => {
	const [onClick] = useScopeSelect(id, closeSelector);
	return (
		<ContentLabel
			id={"selectorNode" + id}
			isGlobal={type === "Global"}
			onClick={isAuthorizedScope && type !== "Virtual" ? onClick : undefined}
		>
			<ScopeIcon type={type} />
			<ScopeText>{name || id}</ScopeText>
		</ContentLabel>
	);
};

export default ScopeNode;
