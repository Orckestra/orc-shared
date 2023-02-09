import React from "react";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import Icon from "./Icon";

export const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	overflow-y: auto;
	height: 100%;
`;

export const IconBlock = styled.div`
	flex: 0 0 30%;
	border: 1px solid #999;
	margin: 5px;
	padding: 5px 10px;
	font-size: 24px;
`;

const arrify = thing => [].slice.call(thing);

const SpriteSheet = () => {
	const iconIds = arrify(document.querySelectorAll('symbol[id^="icon-"]')).map(elm => elm.id.replace(/^icon-/, ""));
	return (
		<Wrapper>
			{iconIds.map(id => (
				<IconBlock key={id}>
					<Icon id={id} /> {id}
				</IconBlock>
			))}
		</Wrapper>
	);
};

export default SpriteSheet;
