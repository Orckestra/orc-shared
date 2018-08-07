import React from "react";
import styled from "styled-components";
import { getThemeProp } from "../../../utils";
import Icon from "../../Icon";
import { FormInput, getEventUpdater } from "./Text";
import { ButtonWrapper, InputButton } from "./FieldButtons";

// TODO: Calendar dialog on focus, prevent default behavior in Edge, Firefox

export const CalendarIcon = styled(Icon).attrs({
	id: getThemeProp(["icons", "date"], "calendar"),
})`
	font-size: 20px;
`;

export const CalendarButton = styled(InputButton)`
	min-width: 36px;
	padding: 4px 7px;
	border-left-color: transparent;
	background-color: #fff;
`;

export const DateInput = ({ update, ...props }) => (
	<ButtonWrapper>
		<FormInput type="date" onChange={getEventUpdater(update)} {...props} />
		<CalendarButton>
			<CalendarIcon />
		</CalendarButton>
	</ButtonWrapper>
);
