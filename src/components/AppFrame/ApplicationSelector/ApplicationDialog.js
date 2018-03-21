import React from "react";
import styled from "styled-components";
import Modal from "../../Modal";

const ApplicationList = styled.div`
	display: flex;
	min-height: 10vh;
	width: 60vw;
	padding: 45px 40px 10px;
	justify-content: center;
	flex-wrap: wrap;
`;

const ApplicationBlock = styled.div`
	flex: 0 0 140px;
	text-align: center;
	height: 115px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
`;
const ApplicationLink = styled.a``;

const ApplicationLogo = styled.img`
	border-radius: 50%;

	${ApplicationLink}:hover > & {
		box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.65);
	}
`;

const ApplicationLabel = styled.span`
	${ApplicationLink}:hover ~ & {
		visibility: visible;
	}
	visibility: hidden;
	display: block;
	margin-top: 22px;
	font-family: Roboto, sans-serif;
	font-size: 14px;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.65);
`;

const ApplicationIndicator = styled.div`
	background-color: white;
	border-radius: 50%;
	height: 8px;
	width: 8px;
	margin-top: -17px;
	${ApplicationLink}:hover ~ & {
		visibility: hidden;
	}
`;

const ApplicationDialog = ({
	show,
	toggle,
	applications,
	applicationId,
	applicationOrder,
}) => (
	<Modal show={show} toggle={toggle} look="dark">
		<ApplicationList>
			{applicationOrder.map(appName => (
				<ApplicationBlock key={appName}>
					<ApplicationLink
						href={applications[appName].href}
						onClick={
							appName === applicationId
								? event => {
										event.preventDefault();
										toggle();
								  }
								: () => {}
						}
					>
						<ApplicationLogo src={applications[appName].src} />
					</ApplicationLink>
					<ApplicationLabel>{applications[appName].label}</ApplicationLabel>
					{appName === applicationId ? <ApplicationIndicator /> : null}
				</ApplicationBlock>
			))}
		</ApplicationList>
	</Modal>
);

export default ApplicationDialog;
