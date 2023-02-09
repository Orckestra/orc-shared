import React from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import Button from "../../Button";
import Icon from "../../Icon";
import Tooltip from "../../Tooltip";
import withId from "../../../hocs/withId";

export const RoundButton = styled(Button)`
	min-width: 0;
	min-height: 0;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	padding: 6px;
	position: relative;
`;

export const ButtonIcon = styled(Icon)`
	font-size: 16px;
`;

export const SmallButton = ({
	id,
	icon,
	update,
	"aria-labelledby": aria, // Not meaningful for buttons
	altText = "[altText]", // If you do not provide alt-text, you will be hainted unto death.
	...props
}) => (
	<RoundButton id={id} {...props} onClick={update}>
		<ButtonIcon id={icon} />
		<Tooltip message={altText} />
	</RoundButton>
);
SmallButton.displayName = "SmallButton";

export default withId("smallbutton")(SmallButton);
