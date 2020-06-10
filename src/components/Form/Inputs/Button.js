import React from "react";
import styled from "styled-components";
import withId from "../../../hocs/withId";
import IconButton from "../../IconButton";

export const PositionedButton = styled(IconButton)`
	width: max-content;
	position: relative;
`;

export const FormButton = ({
	id,
	icon,
	buttonText,
	update,
	"aria-labelledby": aria, // Not meaningful for buttons
	...props
}) => (
	<PositionedButton id={id} {...props} onClick={update} icon={icon} label={buttonText} />
);
FormButton.displayName = "FormButton";

export default withId("formbutton")(FormButton);
