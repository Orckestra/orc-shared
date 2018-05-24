import React from "react";
import styled from "styled-components";

export const List = styled.div`
	display: flex;
	min-height: 10vh;
	width: 60vw;
	padding: 45px 40px 10px;
	justify-content: center;
	flex-wrap: wrap;
`;

export const Block = styled.div`
	flex: 0 0 140px;
	text-align: center;
	height: 115px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
`;
export const Link = styled.a``;

export const Logo = styled.img`
	border-radius: 50%;

	${Link}:hover > & {
		box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.65);
	}
`;

export const Label = styled.span`
	${Link}:hover ~ & {
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

export const Indicator = styled.div`
	background-color: white;
	border-radius: 50%;
	height: 8px;
	width: 8px;
	margin-top: -17px;
	${Link}:hover ~ & {
		visibility: hidden;
	}
`;

const ApplicationDialog = ({
	toggle,
	applications,
	applicationId,
	applicationOrder,
}) => (
	<List>
		{applications.map(app => (
			<Block key={app.name}>
				<Link
					href={app.url}
					onClick={
						app.name === applicationId
							? event => {
									event.preventDefault();
									toggle();
							  }
							: /* istanbul ignore next */
							  () => {}
					}
				>
					<Logo src={app.iconUri} />
				</Link>
				<Label>{app.displayName}</Label>
				{app.name === applicationId ? <Indicator /> : null}
			</Block>
		))}
	</List>
);

export default ApplicationDialog;
