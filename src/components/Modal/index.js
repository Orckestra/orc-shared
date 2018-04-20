import React, { Fragment, Children, cloneElement } from "react";
import Wrapper from "./Wrapper";
import Background from "./Background";
import Dialog from "./Dialog";
import withShowToggle from "./withShowToggle";

const addPropsToChildren = (children, props) =>
	Children.map(children, child => cloneElement(child, props));

const ModalStructure = ({
	show,
	toggle,
	anchor,
	content,
	look = "default",
}) => (
	<Fragment>
		{addPropsToChildren(anchor, { toggle })}
		<Wrapper in={show} timeout={1000}>
			<Background onClick={toggle} />
			<Dialog look={look}>{addPropsToChildren(content, { toggle })}</Dialog>
		</Wrapper>
	</Fragment>
);

const Modal = withShowToggle(ModalStructure);

export default Modal;
