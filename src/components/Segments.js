import React from "react";
import styled, { css } from "styled-components";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import withNavigationLink from "../hocs/withNavigationLink";
import { TabBar } from "./Navigation/Bar";
import Text from "./Text";
import { ifFlag } from "../utils";

export const Wrapper = styled.div`
	display: flex;
	border-top: 1px solid #ccc;
	flex: 0 1 100%;

	${TabBar} + & {
		margin-top: 30px;
	}
`;

export const SegmentList = styled.div`
	flex: 0 0.1 15%;
	border-right: 1px solid #ccc;
	display: flex;
	flex-direction: column;
`;

export const Segment = withNavigationLink(styled.a`
	display: block;
	white-space: nowrap;
	min-width: max-content;
	padding: 15px 20px;
	font-weight: bold;
	font-size: 13px;
	text-decoration: none;
	color: #333;

	${ifFlag(
		"active",
		css`
			background-color: #b4cfe3;
		`,
		css`
			&:hover {
				background-color: #f7f7f7;
			}
		`,
	)};
`);

const Segments = ({ pages, root }) => (
	<Wrapper>
		<SegmentList>
			{Object.entries(pages).map(([route, page]) => (
				<Segment key={route} href={root + route}>
					<Text message={page.label} />
				</Segment>
			))}
		</SegmentList>
		{Object.entries(pages).map(([route, { component: Page }]) => (
			<RenderFragment key={route} forRoute={route}>
				<Page />
			</RenderFragment>
		))}
	</Wrapper>
);

export default Segments;
