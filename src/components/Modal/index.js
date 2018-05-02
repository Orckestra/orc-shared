import React, { Fragment, Children, cloneElement } from "react";
import Wrapper from "./Wrapper";
import Background from "./Background";
import Dialog from "./Dialog";
import withToggle from "../../hocs/withToggle";

const addPropsToChildren = (children, props) =>
	Children.map(children, child => cloneElement(child, props));

export const Modal = ({ show, toggle, anchor, content, look }) => (
	<Fragment>
		{addPropsToChildren(anchor, { toggle })}
		<Wrapper in={show} timeout={300}>
			<Background onClick={toggle} />
			<Dialog look={look}>{addPropsToChildren(content, { toggle })}</Dialog>
		</Wrapper>
	</Fragment>
);

export default withToggle("show")(Modal);
