import React from "react";
import styled, { css, keyframes } from "styled-components";
import Text from "./Text";
import Icon from "./Icon";
import { ifFlag } from "../utils";

const rotate = keyframes`
to { transform: rotate(1turn); }
`;

export const PlaceholderBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #ababab;
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

const Placeholder = ({ icon, title, subtitle, animate }) => (
	<PlaceholderBox>
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

export default Placeholder;
