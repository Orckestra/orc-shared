import React from "react";
import styled from "styled-components";
import Icon from "../../Icon";
import { getThemeProp } from "../../../utils";

export const MenuIcon = styled(Icon).attrs({
	id: getThemeProp(["icons", "menu"], "placeholder"),
})`
	font-size: 24px;
	margin: auto;
`;

export const Wrapper = styled.div`
	width: 50px;
	height: 100%;
	display: flex;
	justify-content: center;
	border-radius: 4px;

	&:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}
`;

const Header = ({ toggle, ...props }) => (
	<Wrapper id="applicationSelectorAnchor" onClick={toggle} {...props}>
		<MenuIcon />
	</Wrapper>
);

export default Header;
