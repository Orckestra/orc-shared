import React from "react";
import styled, { css } from "styled-components";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import withNavigationLink from "../hocs/withNavigationLink";
import { TabBar } from "./Navigation/Bar";
import Redirector from "./Redirector";
import Text from "./Text";
import { ifFlag, memoize } from "../utils";

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

export const segmentListConditions = memoize(root => ({ pathname }) =>
	!!pathname.replace(root, "").match(/^(?:\/[^/]*)?$/),
);

const Segments = ({ pages, root }) => {
	const subpages = [];
	const links = [];
	const segments = [];
	Object.entries(pages).forEach(([route, page]) => {
		links.push(
			<Segment key={route} href={root + route}>
				<Text message={page.label} />
			</Segment>,
		);
		const Page = page.component;
		segments.push(
			<RenderFragment key={route} forRoute={route}>
				<Page />
			</RenderFragment>,
		);
		subpages.push(
			...Object.entries(page)
				.filter(([key]) => key.startsWith("/"))
				.map(([innerRoute, { title, component: SubPage }]) => (
					<RenderFragment
						key={route + innerRoute}
						forRoute={route + innerRoute}
					>
						<SubPage />
					</RenderFragment>
				)),
		);
	});
	return (
		<React.Fragment>
			{subpages}
			<RenderFragment withConditions={segmentListConditions(root)}>
				<Wrapper>
					<SegmentList>{links}</SegmentList>
					{segments}
					<RenderFragment forRoute="/">
						<Redirector href={root + Object.keys(pages)[0]} />
					</RenderFragment>
				</Wrapper>
			</RenderFragment>
		</React.Fragment>
	);
};

export default Segments;
