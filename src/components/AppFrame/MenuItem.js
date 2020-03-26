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
	background-color: ${getThemeProp(["colors", "toasts", props => props.type], "red")};
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
