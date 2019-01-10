import React from "react";
import styled, { css } from "styled-components";
import { Route, Switch } from "react-router-dom";
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
		segments.push(<Route key={route} path={root + route} component={Page} />);
		subpages.push(
			...Object.entries(page)
				.filter(([key]) => key.startsWith("/"))
				.map(([innerRoute, { title, component: SubPage }]) => (
					<Route
						key={route + innerRoute}
						path={root + route + innerRoute}
						component={SubPage}
					/>
				)),
		);
	});
	return (
		<Switch>
			{subpages}
			<Route
				render={() => (
					<Wrapper>
						<SegmentList>{links}</SegmentList>
						<Switch>
							{segments}
							<Route
								exact
								path={root + "/"}
								render={() => (
									<Redirector href={root + Object.keys(pages)[0]} />
								)}
							/>
						</Switch>
					</Wrapper>
				)}
			/>
		</Switch>
	);
};

export default Segments;
