// @flow
import styled, { css } from "styled-components";

const darkDialogStyle = css`
	background-color: #333;
	border-radius: 15px;
`;

const dialogLook = {
	default: css`
		background-color: white;
	`,
	dark: darkDialogStyle,
};

// TODO: Add light dialog style for other dialogs, switching mechanism
const Dialog = styled.div`
	flex: 0 0 auto;
	margin: auto;
	z-index: 10000;
	${props => dialogLook[props.look]};
`;

export default Dialog;
