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

const LoadingIcon = withTheme(props => (
	<Placeholder icon={getThemeProp(["icons", "loading"], "loading")(props)} animate />
));

export default LoadingIcon;
