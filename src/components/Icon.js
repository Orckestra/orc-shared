// @flow
import React from "react";
import type { ElementProps, StatelessFunctionalComponent } from "react";
import styled from "styled-components";

const IconSVG = styled.svg`
	height: 1em;
	width: 1em;
	fill: currentColor;
	stroke: currentColor;
`;

export type IconProps = ElementProps<typeof IconSVG>;

const Icon: StatelessFunctionalComponent<IconProps> = ({ id, ...props }) => (
	<IconSVG {...props}>
		<use href={`#icon-${id}`} />
	</IconSVG>
);

export default Icon;
