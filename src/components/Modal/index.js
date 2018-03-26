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
}: ModalStructureProps): Node => (
	<Fragment>
		{addPropsToChildren(anchor, { toggle })}
		<Wrapper in={show}>
			<Background onClick={toggle} />
			<Dialog look={look}>{addPropsToChildren(content, { toggle })}</Dialog>
		</Wrapper>
	</Fragment>
);

const Modal = withShowToggle(ModalStructure);

export default Modal;
