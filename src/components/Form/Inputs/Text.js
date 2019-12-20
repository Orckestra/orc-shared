import React from "react";
import styled from "styled-components";
import Input from "../../Input";
import { memoize, getThemeProp } from "../../../utils";

export const FormInput = styled(Input)`
	box-sizing: border-box;
	flex: 0 0 auto;
	border-radius: 4px;
	min-width: 40px;
	width: 100%;

	&:active,
	&:focus {
		z-index: 1;
	}

	&:invalid {
		border-color: ${getThemeProp(["errorColor"], "#ce4844")};
		box-shadow: 0 0 4px ${getThemeProp(["errorColor"], "#ce4844")};
	}

	${"" /* These are hacks, work only in Chrome, best not used */}
	&[type="date"],
	&[type="number"],
	&[type="time"] {
		-webkit-appearance: none;
		-moz-appearance: textfield;
	}
	&::-webkit-clear-button,
	&::-webkit-calendar-picker-indicator {
		display: none;
	}

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const getEventUpdater = memoize(update => e => update(e.target.value));

export const TextInput = ({ update, value = "", ...props }) => (
	<FormInput
		type="text"
		onChange={getEventUpdater(update)}
		{...props}
		value={value}
	/>
);
export const EmailInput = ({ update, value = "", ...props }) => (
	<FormInput
		type="email"
		onChange={getEventUpdater(update)}
		{...props}
		value={value}
	/>
);
