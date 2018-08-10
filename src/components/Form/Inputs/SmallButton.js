import React from "react";
import styled from "styled-components";
import Button from "../../Button";
import Icon from "../../Icon";
import Text from "../../Text";

export const RoundButton = styled(Button)`
	min-width: 0;
	min-height: 0;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	padding: 6px;
	position: relative;
`;

export const Tooltip = styled.div.attrs({
	onClick: () => event => {
		event.preventDefault();
		event.stopPropagation();
	},
})`
	position: absolute;
	top: 50%;
	right: -10px;
	transform: translate(-99999px, -50%);
	color: #333;
	background-color: #fff;
	border: 1px solid #cccccc;
	border-radius: 3px;
	padding: 0 3px;
	transition: transform 0s;
	cursor: default;

	*:hover > & {
		transform: translate(100%, -50%);
		transition: transform 1.5s step-end;
	}

	&::before {
		content: "";
		position: absolute;
		top: 4px;
		left: -10px;
		border: 5px solid transparent;
		border-right-color: #cccccc;
	}

	&::after {
		content: "";
		position: absolute;
		top: 5px;
		left: -8px;
		border: 4px solid transparent;
		border-right-color: #ffffff;
	}
`;

export const ButtonIcon = styled(Icon)`
	font-size: 16px;
`;

export const SmallButton = ({
	icon,
	update,
	altText = "[altText]", // If you do not provide alt-text, you will be hainted unto death.
	...props
}) => (
	<RoundButton {...props} onClick={update}>
		<ButtonIcon id={icon} />
		<Tooltip>
			<Text message={altText} />
		</Tooltip>
	</RoundButton>
);
SmallButton.displayName = "SmallButton";

export default SmallButton;
