import React from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import { memoize } from "../../../utils";
import Checkbox from "../../Checkbox";
import Switch from "../../Switch";

export const FormCheckbox = styled(Checkbox)`
	height: 30px;
	display: flex;
	align-self: flex-start;
	align-items: center;
`;

export const getCheckUpdater = memoize(update => e => update(e.target.checked));

export const CenterMiddleWrapper = styled.div`
	min-height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CheckboxInput = ({ update, value, ...props }) => (
	<CenterMiddleWrapper>
		<FormCheckbox onChange={getCheckUpdater(update)} value={value} {...props} />
	</CenterMiddleWrapper>
);

export const SwitchInput = ({ update, value, ...props }) => (
	<CenterMiddleWrapper>
		<Switch onChange={getCheckUpdater(update)} value={value} {...props} />
	</CenterMiddleWrapper>
);
