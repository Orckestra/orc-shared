import React from "react";
import styled, { css } from "styled-components";
import { getThemeProp, ifFlag } from "../../utils";
import { Link } from "react-router-dom";
import Text from "../Text";
import Icon from "../Icon";

export const PageTab = styled.div`
	flex: 0 0 auto;
	overflow: hidden;
	height: 38px;
	border: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	transform: translateY(-10px);
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	margin-left: -1px;
	background-color: white;

	${ifFlag(
		"active",
		css`
			border-bottom-color: white;
			color: ${getThemeProp(["colors", "application", "base"], "#ccc")};
		`,
		css`
			color: ${getThemeProp(["colors", "textMedium"], "#999999")};
		`,
	)};

	${ifFlag(
		"outsideScope",
		css`
			background-color: #eeeeee;
		`,
	)}

	${ifFlag(
		"hide",
		css`
			visibility: hidden;
		`,
	)}
`;

// XXX: The below contains an IE10/IE11 targeting CSS hack

export const ModuleTab = styled(PageTab)`
	flex-grow: 0;
	flex-shrink: 0;
	margin-left: 0px;
	z-index: 1;
	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
		flex-grow: 1;
	}
`;

const FilteredLink = ({ outsideScope, ...props }) => <Link {...props} />;

export const TabLink = styled(FilteredLink)`
	min-width: 100px;
	width: max-content;
	overflow: hidden;
	color: inherit;
	text-decoration: none;
	display: block;
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
	vertical-align: middle;
	font-size: 20px;
	margin-right: 10px;
	margin-top: -3px;
`;

export const TabText = styled.span`
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
	color: ${getThemeProp(["colors", "textMedium"], "#999999")};

	&:hover {
		color: ${getThemeProp(["colors", "application", "base"], "#ccc")};
	}
`;

const Tab = (
	{ href, label, icon, module, active, close = () => {}, outsideScope, hide },
	ref,
) => {
	const ThisTab = module ? ModuleTab : PageTab;
	return (
		<ThisTab
			ref={ref}
			active={active}
			outsideScope={outsideScope}
			hide={hide}
			data-href={href}
		>
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

export default React.forwardRef(Tab);
