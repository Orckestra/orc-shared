import styled, { css } from "styled-components";
import { getThemeProp } from "../../utils";
import withClickOutside from "../../hocs/withClickOutside";

const darkDialogStyle = css`
	background-color: ${getThemeProp(["colors", "bgDark"], "#333333")};
	border-radius: 15px;
`;

const dialogLook = {
	default: css`
		background-color: white;
	`,
	dark: darkDialogStyle,
};

// TODO: Add light dialog style for other dialogs, switching mechanism
export const Dialog = styled.div`
	flex: 0 0 auto;
	margin: auto;
	align-self: center;
	z-index: 10000;
	${props => dialogLook[props.look]};
`;
Dialog.defaultProps = { look: "default" };

export default withClickOutside(Dialog);
