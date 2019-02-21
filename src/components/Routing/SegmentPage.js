import React from "react";
import styled, { css } from "styled-components";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import UrlPattern from "url-pattern";
import { ifFlag } from "../../utils";
import Text from "../Text";
import { TabBar } from "../Navigation/Bar";
import Segment from "./Segment";

export const Wrapper = styled.div`
	display: flex;
	border-top: 1px solid #ccc;
	flex: 0 1 100%;

	${TabBar} + & {
		margin-top: 30px;
	}
`;

export const List = styled.div`
	flex: 0 0.1 15%;
	border-right: 1px solid #ccc;
	display: flex;
	flex-direction: column;
`;

const FilteredLink = ({ active, ...props }) => <Link {...props} />;

export const Item = styled(FilteredLink)`
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
`;

const SegmentPage = ({ path, segments, location, match }) => {
	const pattern = new UrlPattern(path);
	const baseHref = pattern.stringify(match.params);
	return (
		<Wrapper>
			<List>
				{Object.entries(segments).map(([segpath, config]) => (
					<Item
						key={segpath}
						to={baseHref + segpath}
						active={location.pathname === baseHref + segpath}
					>
						<Text message={config.label} />
					</Item>
				))}
			</List>
			<Switch>
				{Object.entries(segments).map(([segpath, config]) => (
					<Route
						key={segpath}
						path={path + segpath}
						render={({ location, match }) => (
							<Segment
								path={path + segpath}
								location={location}
								match={match}
								config={config}
								root={baseHref}
							/>
						)}
					/>
				))}
				<Redirect exact path={path} to={baseHref + Object.keys(segments)[0]} />
			</Switch>
		</Wrapper>
	);
};

export default SegmentPage;
