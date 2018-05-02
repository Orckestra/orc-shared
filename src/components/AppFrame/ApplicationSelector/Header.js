import React from "react";
import styled from "styled-components";

export const Icon = styled.img`
	height: 34px;
	width: 34px;
	vertical-align: middle;
`;

export const Label = styled.span`
	font-family: Roboto Condensed, sans-serif;
	font-weight: bold;
	text-transform: uppercase;
	padding-left: 15px;
	vertical-align: middle;
	opacity: ${props => (props.open ? 1 : 0)};
	transition: opacity 0.3s ease-out;
`;

export const Wrapper = styled.div`
	padding: 0 6px;
	margin: 10px 0 50px;
`;

const Header = ({ open, toggle, application = {}, ...props }) => (
	<Wrapper onClick={toggle} {...props}>
		<Icon src={application.src} />
		<Label open={open}>{application.label}</Label>
	</Wrapper>
);

export default Header;
