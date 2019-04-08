import React from "react";
import styled from "styled-components";
import Button from "../../Button";
import Icon from "../../Icon";
import Text from "../../Text";
import withId from "../../../hocs/withId";

export const PositionedButton = styled(Button)`
	width: max-content;
	padding: 6px;
	position: relative;
`;

export const ButtonIcon = styled(Icon)`
	font-size: 16px;
	vertical-align: top;
	& + span {
		margin-left: 6px;
	}
`;

export const FormButton = ({
	id,
	icon,
	buttonText,
	update,
	"aria-buttonTextledby": aria, // Not meaningful for buttons
	...props
}) => (
	<PositionedButton id={id} {...props} onClick={update}>
		{icon ? <ButtonIcon id={icon} /> : null}
		{buttonText ? <Text message={buttonText} /> : null}
	</PositionedButton>
);
FormButton.displayName = "FormButton";

export default withId("formbutton")(FormButton);
