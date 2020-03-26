import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { getThemeProp, ifFlag } from "../../utils";
import Text from "../Text";
import Icon from "../Icon";

const FilteredLink = ({
	menuToggle,
	staticContext,
	dispatch,
	active,
	component,
	...props
}) => <Link {...props} />;

export const Block = styled(FilteredLink)`
	display: block;
	position: relative;
	padding: 0 10px;
	margin-bottom: 35px;
	color: ${ifFlag(
		"active",
		getThemeProp(["colors", "application", "base"], "#ffffff"),
		getThemeProp(["colors", "textMedium"], "#999999"),
	)};
	text-decoration: none;
	cursor: pointer;

	${ifFlag(
		"menuToggle",
		"",
		css`
			&:hover {
				color: ${getThemeProp(["colors", "application", "base"], "#ffffff")};
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

export const AlertMessage = styled.div`
	position: absolute;
	z-index: 10000;
	top: -1px;
	transform: translateY(-50%);
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

	&::before {
		content: "";
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: -10px;
		border: solid transparent;
		border-width: 5px 10px 5px 0;
		border-right-color: ${getThemeProp(["colors", "toasts", props => props.type], "red")};
	}
`;

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

const MenuItem = ({ open = false, label = "", icon, alert, href, ...props }) => {
	let ItemWrapper = Block;
	if (props.menuToggle) {
		ItemWrapper = BlockWithA;
	}
	return (
		<ItemWrapper to={href} {...props}>
			<MenuIcon id={icon} />
			{alert ? (
				<Alert type={alert.type}>
					{alert.message ? (
						<AlertMessage type={alert.type}>
							<Text message={alert.message} />
						</AlertMessage>
					) : null}
				</Alert>
			) : null}
			<Label show={open}>
				<Text message={label} />
			</Label>
		</ItemWrapper>
	);
};

export default MenuItem;
