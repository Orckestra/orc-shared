import React from "react";
import styled from "styled-components";

const IconSVG = styled.svg`
	height: 1em;
	width: 1em;
	fill: currentColor;
`;

const Icon = ({ id, ...props }) => (
	<IconSVG {...props}>
		<use href={`#${id}`} />
	</IconSVG>
);

export default Icon;
