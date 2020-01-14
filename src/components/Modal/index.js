import React, { Fragment } from "react";
import Wrapper from "./Wrapper";
import Background from "./Background";
import Dialog from "./Dialog";
import useToggle from "../../hooks/useToggle";

export const Modal = ({ initShow, anchor, content, look }) => {
	const [show, toggle] = useToggle(initShow);
	return (
		<Fragment>
			{anchor(toggle)}
			<Wrapper in={show} timeout={300}>
				<Background />
				<Dialog look={look} onClickOutside={toggle}>
					{content(toggle)}
				</Dialog>
			</Wrapper>
		</Fragment>
	);
};

export default Modal;
