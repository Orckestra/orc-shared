import React from "react";
import styled from "styled-components";
import Button from "../../Button";
import Icon from "../../Icon";

export const RoundButton = styled(Button)`
	min-width: 0;
	min-height: 0;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	padding: 6px;
`;

export const ButtonIcon = styled(Icon)`
	font-size: 16px;
`;

const SmallButton = ({ icon, update, ...props }) => (
	<RoundButton primary {...props} onClick={update}>
		<ButtonIcon id={icon} />
	</RoundButton>
);
SmallButton.displayName = "SmallButton";

export default SmallButton;
