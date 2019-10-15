import React from "react";
import styled, { withTheme } from "styled-components";
import { getThemeProp } from "../utils";
import Placeholder from "./Placeholder";

export const Wrapper = styled.div`
	display: flex;
	width: 60%;
	height: 100%;
	padding: 0 20vw;
	flex-direction: column;
	justify-content: center;
`;

const ErrorPlaceholder = withTheme(
	({ message, description, onClick, ...props }) => (
		<Placeholder
			icon={getThemeProp(["icons", "error"], "error")(props)}
			warn
			title={message}
			subtitle={description}
			onClick={onClick}
		/>
	),
);

export default ErrorPlaceholder;
