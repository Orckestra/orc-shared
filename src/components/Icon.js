import React from "react";
import styled from "styled-components";

const IconSVG = styled.svg`
	height: 1em;
	width: 1em;
	fill: currentColor;
	stroke: currentColor;
`;

console.warn("Icon has been deprecated. Use Icon from MaterialUI.");
const Icon = ({ id, ...props }) => (
	<IconSVG {...props}>
		<use href={`#icon-${id}`} />
	</IconSVG>
);

export default Icon;
