import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Icon from "./Icon";
import Text from "./Text";

export const ButtonIcon = styled(Icon)`
	font-size: 1.7em;
	margin: -3px -2px;
`;

export const ButtonText = styled.span`
	${ButtonIcon} + & {
		margin-left: 12px;
		vertical-align: top;
	}
`;

const IconButton = ({ icon, label, ...props }) => (
	<Button {...props}>
		{icon ? <ButtonIcon id={icon} /> : null}
		{label ? (
			<ButtonText>
				<Text message={label} />
			</ButtonText>
		) : null}
	</Button>
);

export default IconButton;
