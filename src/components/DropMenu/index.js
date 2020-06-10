import React from "react";
import styled from "styled-components";
import Menu from "./Menu";
import useToggle from "../../hooks/useToggle";
import withClickOutside from "../../hocs/withClickOutside";

export const Wrapper = withClickOutside(styled.div`
	position: relative;
`);

export const AnchorWrapper = styled.div``;

export const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 19998;
`;

const DropMenu = ({ id, initOpen, menuItems, alignRight, className = "", children }) => {
	const [open, toggle, reset] = useToggle(initOpen);
	return (
		<Wrapper className={className} onClickOutside={reset}>
			<AnchorWrapper id={id + "Anchor"} onClick={toggle} open={open}>
				{React.Children.map(children, child =>
					typeof child === "object" ? React.cloneElement(child, { open }) : child,
				)}
			</AnchorWrapper>
			<Menu
				id={id + "Dropdown"}
				{...{ open, menuItems, reset }}
				alignRight={alignRight}
			/>
		</Wrapper>
	);
};

export default DropMenu;
