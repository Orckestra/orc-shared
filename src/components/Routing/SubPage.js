import React from "react";
import styled from "styled-components";

export const Backdrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	opacity: 0.3;
	color: #333;
`;

export const Dialog = styled.div`
	position: absolute;
	top: 92px;
	bottom: 0;
	left: 136px;
	right: 0;
	background: white;
	border-top-left-radius: 8px;
	box-shadow: -3px 0 4px 0 rgba(0,0,0,0.25);}
`;

const SubPage = ({ config }) => {
	const { component: View, ...props } = config;
	return (
		<React.Fragment>
			<Backdrop />
			<Dialog>
				<View {...props} />
			</Dialog>
		</React.Fragment>
	);
};

export default SubPage;
