import React from "react";
import styled from "styled-components";
import { getThemeProp } from "../../../utils";
import Icon from "../../Icon";
import { FormInput, getEventUpdater } from "./Text";
import { ButtonWrapper, InputButton } from "./FieldButtons";

// TODO: Time dialog on focus, prevent default behavior in Edge, Firefox

export const TimeIcon = styled(Icon).attrs(props => ({
	id: getThemeProp(["icons", "time"], "clock")(props),
}))`
	font-size: 20px;
`;

export const TimeButton = styled(InputButton)`
	margin-top: -1px;
	margin-right: -1px;
	min-width: 36px;
	padding: 4px 7px;
	border-left-color: transparent;
	background-color: #fff;
`;

export const TimeInput = ({ update, required, value, ...props }) => (
	<ButtonWrapper invalid={required && !value}>
		<FormInput type="time" onChange={getEventUpdater(update)} value={value} {...props} />
		<TimeButton>
			<TimeIcon />
		</TimeButton>
	</ButtonWrapper>
);
