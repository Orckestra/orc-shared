import React, { Fragment } from "react";
import Wrapper from "./Wrapper";
import Background from "./Background";
import Dialog from "./Dialog";
import withToggle from "../../hocs/withToggle";

export const Modal = ({ show, toggle, anchor, content, look }) => (
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

export default withToggle("show")(Modal);
