import React from "react";
import styled, { css } from "styled-components";
import { withHandlers } from "recompose";
import { getThemeProp, ifFlag } from "../../utils";
import withNavigationLink from "../../hocs/withNavigationLink";
import Text from "../Text";
import Icon from "../Icon";

export const PageTab = styled.div`
	flex: 0 1 auto;
	overflow: hidden;
	height: 38px;
	border: 1px solid #cccccc;
	display: flex;
	transform: translateY(-10px);
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	margin-left: -1px;
	background-color: white;

	${ifFlag(
		"active",
		css`
			border-bottom-color: white;
			color: ${getThemeProp(["appHighlightColor"], "#ccc")};
		`,
		css`
			color: #999999;
		`,
	)};
`;

export const ModuleTab = styled(PageTab)`
	margin-left: 0px;
`;

export const TabLink = withNavigationLink(styled.a`
	flex: 0 1 100%;
	overflow: hidden;
	color: inherit;
	text-decoration: none;
	display: flex;
	justify-content: center;
	padding: 11px 15px;
`);

export const ModuleIcon = styled(Icon)`
	flex: 0 0 auto;
	font-size: 20px;
	margin-right: 10px;
	margin-top: -3px;
`;

export const TabText = styled.span`
	flex: 0 9999999 100%;
	max-width: 150px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const CloseIcon = styled(Icon).attrs({
	id: getThemeProp(["closeIcon"], "close"),
})`
	flex: 0 0 auto;
	margin-left: 10px;
	margin-right: -5px;
	font-size: 14px;
	color: #999999;

	&:hover {
		color: ${getThemeProp(["appHighlightColor"], "#ccc")};
	}
`;

export const Tab = ({ href, label, icon, module, active, close }) => {
	const ThisTab = module ? ModuleTab : PageTab;
	return (
		<ThisTab active={active}>
			<TabLink href={href}>
				{module ? <ModuleIcon id={icon} /> : null}
				<TabText>
					<Text message={label} />
				</TabText>
				{module ? null : <CloseIcon onClick={close} />}
			</TabLink>
		</ThisTab>
	);
};

export default withHandlers({
	close: ({ close, href }) => close(href),
})(Tab);
