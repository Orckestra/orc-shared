import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";
import { Link } from "react-router-dom";
import { getThemeProp, ifFlag } from "../../utils";
import Text from "../Text";
import Icon from "../Icon";

const FilteredLink = ({ menuToggle, staticContext, dispatch, active, component, ...props }) => <Link {...props} />;

export const Block = styled(FilteredLink)`
	display: block;
	position: relative;
	padding: 0 10px;
	margin-bottom: 35px;
	color: ${ifFlag(
		"active",
		getThemeProp(["colors", "application", "highlight"]),
		getThemeProp(["colors", "textMedium"], "#999999"),
	)};
	text-decoration: none;
	cursor: pointer;

	${ifFlag(
		"menuToggle",
		"",
		css`
			&:hover {
				color: ${getThemeProp(["colors", "application", "highlight"], "#ffffff")};
			}
		`,
	)};
`;

export const BlockWithA = Block.withComponent("a");

export const Alert = styled.div`
	border-radius: 50%;
	border: 4px solid ${getThemeProp(["colors", "toasts", props => props.type], "red")};
	position: absolute;
	top: 0;
	left: 27px;
`;

const transformTime = ({ timeout }) => timeout;
const opacityTime = ({ timeout }) => Math.round(timeout * 0.5);
const opacityDelay = ({ timeout }) => Math.round(timeout * 0.25);
// XXX: The below is a hack to get syntax highlighting in transition styles.
// Adding the "transition" tag to styled-components tags would solve it.
const alertStyling = css`
	position: absolute;
	z-index: 10000;
	top: calc(-10px - 0.7em);
	left: 22px;
	width: auto;
	width: max-content;
	border-radius: 5px;
	padding: 10px 15px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
	color: ${getThemeProp(["colors", "textWhite"], "#efefef")};
	background-color: ${getThemeProp(["colors", "toasts", props => props.type], "red")};
	font-size: 11px;
	font-weight: bold;
	line-height: 1.2;

	&::before {
		content: "";
		position: absolute;
		top: calc(10px + 0.2em);
		left: -0.9em;
		border: solid transparent;
		border-width: 0.4em 0.9em 0.4em 0;
		border-right-color: ${getThemeProp(["colors", "toasts", props => props.type], "red")};
	}
`;
const transitionStatement = css`
	transition: transform ${transformTime}ms cubic-bezier(0.68, -0.55, 0.27, 1.55),
		opacity ${opacityTime}ms ${opacityDelay}ms ease-out;
`;
export const AlertMessage = transition.div`
	${alertStyling}
	${transitionStatement}

	&:enter {
		opacity: 0.01;
		transform: translateX(-50%) scaleX(0);
	}
	&:enter-active {
		opacity: 1;
		transform: translateX(0) scaleX(1);
	}
	&:exit {
		opacity: 1;
		transform: translateX(0) scaleX(1);
	}
	&:exit-active {
		opacity: 0.01;
		transform: translateX(-50%) scaleX(0);
	}
`;
AlertMessage.defaultProps = { timeout: 200, unmountOnExit: true, appear: true };

export const MenuIcon = styled(Icon)`
	font-size: 24px;
	vertical-align: middle;
`;

export const Label = styled.span`
	font-family: ${getThemeProp(["fonts", "header"], "sans-serif")};
	font-size: 13px;
	vertical-align: middle;
	text-transform: uppercase;
	padding-left: 10px;

	transition: opacity 0.3s ease-out;
	opacity: ${ifFlag("show", 1, 0)};
`;

const MenuItem = ({
	open = false,
	label = "",
	icon,
	alert,
	pageScopeSelector,
	closingTabHandler,
	hide,
	href,
	...props
}) => {
	let hideSelector = state => (typeof hide === "function" ? hide(state) : hide ?? false);
	const isHidden = useSelector(hideSelector);

	let ItemWrapper = Block;
	if (props.menuToggle) {
		ItemWrapper = BlockWithA;
	}
	const alertMessage = useRef("");
	if (alert && alert.message) {
		alertMessage.current = alert.message;
	}
	return (
		!isHidden && (
			<ItemWrapper to={href} {...props}>
				<MenuIcon id={icon} />
				{alert ? (
					<Alert type={alert.type}>
						<AlertMessage in={!!alert.message} type={alert.type}>
							<Text message={alertMessage.current} />
						</AlertMessage>
					</Alert>
				) : null}
				<Label show={open}>
					<Text message={label} />
				</Label>
			</ItemWrapper>
		)
	);
};

export default MenuItem;
