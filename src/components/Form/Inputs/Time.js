import React from "react";
import styled from "styled-components";
import { getThemeProp } from "../../../utils";
import Icon from "../../Icon";
import { FormInput, getEventUpdater } from "./Text";
import { ButtonWrapper, InputButton } from "./FieldButtons";

// TODO: Time dialog on focus, prevent default behavior in Edge, Firefox

export const TimeIcon = styled(Icon).attrs({
	id: getThemeProp(["icons", "time"], "clock"),
})`
	font-size: 20px;
`;

export const TimeButton = styled(InputButton)`
	min-width: 36px;
	padding: 4px 7px;
	border-left-color: transparent;
	background-color: #fff;
`;

export const TimeInput = ({ update, ...props }) => (
	<ButtonWrapper>
		<FormInput type="time" onChange={getEventUpdater(update)} {...props} />
		<TimeButton>
			<TimeIcon />
		</TimeButton>
	</ButtonWrapper>
);
