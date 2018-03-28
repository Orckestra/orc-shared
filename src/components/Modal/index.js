// @flow
import React, { Fragment, Children, cloneElement } from "react";
import type { Node, StatelessFunctionalComponent } from "react";
import Wrapper from "./Wrapper";
import Background from "./Background";
import Dialog from "./Dialog";
import withShowToggle from "./withShowToggle";

export type ModalProps = {
	anchor: Node,
	content: Node,
	look: string,
};

type ModalStructureProps = {
	show: boolean,
	toggle: () => void,
} & ModalProps;

const addPropsToChildren = (children, props) =>
	Children.map(children, child => cloneElement(child, props));

const ModalStructure: StatelessFunctionalComponent<ModalStructureProps> = ({
	show,
	toggle,
	anchor,
	content,
	look = "default",
}) => (
	<Fragment>
		{addPropsToChildren(anchor, { toggle })}
		<Wrapper in={show} timeout={3000}>
			<Background onClick={toggle} />
			<Dialog look={look}>{addPropsToChildren(content, { toggle })}</Dialog>
		</Wrapper>
	</Fragment>
);

const Modal: StatelessFunctionalComponent<ModalProps> = withShowToggle(
	ModalStructure,
);

export default Modal;
