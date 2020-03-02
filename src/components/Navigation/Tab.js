import React from "react";
import styled, { css } from "styled-components";
import { getThemeProp, ifFlag } from "../../utils";
import { Link } from "react-router-dom";
import Text from "../Text";
import Icon from "../Icon";

// XXX: The below contains an IE10/IE11 targeting CSS hack

export const PageTab = styled.div`
	flex: 0 1 auto;
	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
		flex-basis: 170px;
	}
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

	${ifFlag(
		"outsideScope",
		css`
			background-color: #eeeeee;
		`,
	)}
`;

export const ModuleTab = styled(PageTab)`
	margin-left: 0px;
`;

const FilteredLink = ({ outsideScope, ...props }) => <Link {...props} />;

export const TabLink = styled(FilteredLink)`
	flex: 0 1 100%;
	min-width: 100px;
	width: max-content;
	overflow: hidden;
	color: inherit;
	text-decoration: none;
	display: flex;
	justify-content: center;
	padding: 11px 15px;

	${ifFlag(
		"outsideScope",
		css`
			cursor: not-allowed;
		`,
	)}
`;

export const ModuleIcon = styled(Icon)`
	flex: 0 0 auto;
	font-size: 20px;
	margin-right: 10px;
	margin-top: -3px;
`;

export const TabText = styled.span`
	flex: 0 9999999 100%;
	min-width: 50px;
	max-width: 350px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const CloseIcon = styled(Icon).attrs(props => ({
	id: getThemeProp(["icons", "close"], "close")(props),
}))`
	flex: 0 0 auto;
	margin-left: 10px;
	margin-right: -5px;
	font-size: 14px;
	color: #999999;

	&:hover {
		color: ${getThemeProp(["appHighlightColor"], "#ccc")};
	}
`;

const Tab = ({
	href,
	label,
	icon,
	module,
	active,
	close = () => {},
	mappedFrom,
	outsideScope,
}) => {
	const ThisTab = module ? ModuleTab : PageTab;
	return (
		<ThisTab active={active} outsideScope={outsideScope} data-test-id={href}>
			<TabLink
				to={href}
				outsideScope={outsideScope}
				onClick={
					outsideScope
						? event => {
								event.preventDefault();
								event.stopPropagation();
						  }
						: () => {}
				}
			>
				{module ? <ModuleIcon id={icon} /> : null}
				<TabText>
					<Text message={label} />
				</TabText>
				{module ? null : <CloseIcon onClick={close} />}
			</TabLink>
		</ThisTab>
	);
};

export default Tab;
