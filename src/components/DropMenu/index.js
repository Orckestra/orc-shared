import React from "react";
import styled from "styled-components";
import Anchor from "./Anchor";
import Menu from "./Menu";
import useToggle from "../../hooks/useToggle";
import withClickOutside from "../../hocs/withClickOutside";

export const Wrapper = withClickOutside(styled.div`
	position: relative;
`);

export const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 19998;
`;

const DropMenu = ({
	id,
	initOpen,
	menuLabel,
	menuItems,
	alignRight,
	className = "",
	AnchorComponent = Anchor,
}) => {
	const [open, toggle, reset] = useToggle(initOpen);
	return (
		<Wrapper className={className} onClickOutside={reset}>
			<AnchorComponent id={id + "Anchor"} onClick={toggle} {...{ menuLabel, open }} />
			<Menu
				id={id + "Dropdown"}
				{...{ open, menuItems, reset }}
				alignRight={alignRight}
			/>
		</Wrapper>
	);
};

export default DropMenu;
