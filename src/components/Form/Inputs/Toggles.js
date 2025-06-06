import React from "react";
import styled from "styled-components";
import { memoize } from "../../../utils";
import Checkbox from "../../Checkbox";
import Switch from "../../MaterialUI/Inputs/Switch";
import SwitchProps from "../../MaterialUI/Inputs/SwitchProps";

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

export const SwitchInput = ({ update, value, ...props }) => {
	const switchProps = new SwitchProps();

	switchProps.set(SwitchProps.propNames.value, value);
	switchProps.set(SwitchProps.propNames.onCaption, props.onCaption);
	switchProps.set(SwitchProps.propNames.offCaption, props.offCaption);
	switchProps.set(SwitchProps.propNames.disabled, props.disabled);
	switchProps.set(SwitchProps.propNames.update, input => update(input));

	return (
		<CenterMiddleWrapper>
			<Switch switchProps={switchProps} />
		</CenterMiddleWrapper>
	);
};
