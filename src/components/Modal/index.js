import React, { Fragment, Children, cloneElement } from "react";
import Wrapper from "./Wrapper";
import Background from "./Background";
import Dialog from "./Dialog";
import withToggle from "../../hocs/withToggle";
import withClickOutside from "../../hocs/withClickOutside";

const EnhancedDialog = withClickOutside(Dialog);

const addPropsToChildren = (children, props) =>
	Children.map(children, child => cloneElement(child, props));

export const Modal = ({ show, toggle, anchor, content, look }) => (
	<Fragment>
		{addPropsToChildren(anchor, { toggle })}
		<Wrapper in={show} timeout={300}>
			<Background />
			<EnhancedDialog look={look} onClickOutside={toggle}>
				{addPropsToChildren(content, { toggle })}
			</EnhancedDialog>
		</Wrapper>
	</Fragment>
);

export default withToggle("show")(Modal);
