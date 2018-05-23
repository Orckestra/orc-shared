import React from "react";
import styled from "styled-components";
import { withProps } from "recompose";
import Icon from "./Icon";

export const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`;

export const IconBlock = styled.div`
	flex: 0 0 30%;
	border: 1px solid #999;
	margin: 5px;
	padding: 5px 10px;
	font-size: 24px;
`;

const SpriteSheetStructure = ({ iconIds }) => (
	<Wrapper>
		{iconIds.map(id => (
			<IconBlock key={id}>
				<Icon id={id} /> {id}
			</IconBlock>
		))}
	</Wrapper>
);

const withAllIconIds = withProps(() => ({
	iconIds: [].slice
		.call(document.querySelectorAll('symbol[id^="icon-"]'))
		.map(elm => elm.id.replace(/^icon-/, "")),
}));

const SpriteSheet = withAllIconIds(SpriteSheetStructure);

export default SpriteSheet;
