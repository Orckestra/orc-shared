import React from "react";
import pt from "prop-types";
import styled, { css, keyframes } from "styled-components";
import Text, { ptLabel } from "./Text";
import Icon from "./Icon";
import { ifFlag } from "../utils";

const rotate = keyframes`
to { transform: rotate(1turn); }
`;

export const PlaceholderBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	${ifFlag("warn", "color: #ed2e0b; width: 33%; max-width:540px; text-align:center;", "color: #ababab;")}
`;

export const PlaceholderIcon = styled(Icon)`
	font-size: 140px;

	${ifFlag(
		"animate",
		css`
			animation: ${rotate} 4s linear infinite;
		`,
	)};
`;

export const PlaceholderTitle = styled.div`
	margin-top: 5px;
	font-size: 2em;
`;
export const PlaceholderSubtitle = styled.div`
	font-size: 1.3em;
`;

const Placeholder = ({ icon, title, subtitle, animate, warn, ...props }) => (
	<PlaceholderBox warn={warn} {...props}>
		{icon ? <PlaceholderIcon id={icon} animate={animate} /> : null}
		{title ? (
			<PlaceholderTitle>
				<Text message={title} />
			</PlaceholderTitle>
		) : null}
		{subtitle ? (
			<PlaceholderSubtitle>
				<Text message={subtitle} />
			</PlaceholderSubtitle>
		) : null}
	</PlaceholderBox>
);
Placeholder.propTypes = {
	icon: pt.string,
	title: ptLabel,
	subtitle: ptLabel,
	animate: pt.bool,
	warn: pt.bool,
};
export default Placeholder;
