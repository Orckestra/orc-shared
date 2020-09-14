import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { getThemeProp, ifFlag } from "../../utils";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import useLabelMessage from "../../hooks/useLabelMessage";
import { Placeholder } from "../Text";
import { useIntl } from "react-intl";

export const PageTab = styled.div`
	flex: 0 0 auto;
	overflow: hidden;
	height: 38px;
	border: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
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

const FilteredLink = ({ outsideScope, mustTruncate, ...props }) => <Link {...props} />;

export const TabLink = styled(FilteredLink)`
	min-width: 100px;
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
	)};
	${ifFlag(
		"mustTruncate",
		css`
			max-width: 220px;
		`,
	)};
`;

export const ModuleIcon = styled(Icon)`
	vertical-align: middle;
	font-size: 20px;
	margin-right: 10px;
	margin-top: -3px;
`;

export const TabText = styled.span`
	min-width: 50px;
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
	{ href, label, mustTruncate, icon, module, active, close = () => {}, outsideScope, scopeNotSupported, hide },
	ref,
) => {
	const ThisTab = module ? ModuleTab : PageTab;

	const { formatMessage } = useIntl();
	const tabTextRef = useRef(null);
	const [aTitle, setTitle] = useState(null);
	const buildMessage = message => formatMessage(message, message.values);
	const [labelMessage] = useLabelMessage(label, buildMessage);

	useEffect(() => {
		if (scopeNotSupported) {
			close();
		} else if (mustTruncate && tabTextRef.current && tabTextRef.current.offsetWidth < tabTextRef.current.scrollWidth) {
			setTitle(labelMessage);
		}
	}, [scopeNotSupported, tabTextRef, setTitle, labelMessage, mustTruncate, close]);

	return (
		<ThisTab ref={ref} active={active} outsideScope={outsideScope} hide={hide || scopeNotSupported} data-href={href}>
			<TabLink
				to={href}
				mustTruncate={mustTruncate}
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
				<TabText ref={tabTextRef} title={aTitle}>
					{labelMessage ? labelMessage : <Placeholder />}
				</TabText>
				{module ? null : <CloseIcon onClick={close} />}
			</TabLink>
		</ThisTab>
	);
};

export default React.forwardRef(Tab);
