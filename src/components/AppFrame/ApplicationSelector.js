import React from "react";
import styled, { css } from "styled-components";
import { withStateHandlers } from "recompose";

const HeaderIcon = styled.img`
	height: 34px;
	width: 34px;
	vertical-align: middle;
`;

const HeaderLabel = styled.span`
	font-family: Roboto Condensed, sans-serif;
	font-weight: bold;
	text-transform: uppercase;
	padding-left: 15px;
	vertical-align: middle;
`;

const HeaderWrapper = styled.div`
	padding: 0 6px;
	margin: 10px 0 50px;

	${props =>
		props.open
			? css`
					transform: translateX(19px);
			  `
			: ""};
	transition: transform 0.3s ease-out;
`;

const ModalBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(127, 127, 127, 0.5);
	z-index: 999999;
`;

const Modal = ({ show }) => (show ? <ModalBackground /> : null);

const ApplicationSelector = ({
	open,
	show,
	toggle,
	applications,
	applicationId,
}) => (
	<HeaderWrapper open={open} onClick={toggle}>
		<HeaderIcon src={applications[applicationId].src} />
		<HeaderLabel>{applications[applicationId].label}</HeaderLabel>
		<Modal show={show} />
	</HeaderWrapper>
);

const withShowToggle = withStateHandlers(
	({ init = false }) => ({ show: init }),
	{
		toggle: ({ show }) => () => ({ show: !show }),
	},
);

export default withShowToggle(ApplicationSelector);
