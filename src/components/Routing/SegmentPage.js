import React from "react";
import styled, { css } from "styled-components";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import UrlPattern from "url-pattern";
import { ifFlag, getThemeProp } from "../../utils";
import Text from "../Text";
import { TabBar } from "../Navigation/Bar";
import FullPage from "./FullPage";
import SubPage from "./SubPage";
import Segment from "./Segment";

export const Wrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	border-top: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	flex: 0 1 100%;
	height: calc(100% - 90px);

	${TabBar} + & {
		margin-top: 30px;
	}
`;

export const List = styled.div`
	flex: 0 0.1 15%;
	border-right: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
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
	color: ${getThemeProp(["colors", "text"], "#333333")};

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

const SegmentPage = ({ path, component: View, segments, location, match }) => {
	const pattern = new UrlPattern(path);
	const baseHref = pattern.stringify(match.params);
	const pages = [],
		subpages = [];
	const segmentElements = Object.entries(segments).map(([segpath, config]) => {
		if (config.pages) {
			pages.push(
				...Object.entries(config.pages).map(([subpath, pageConfig]) => {
					const pagePath = segpath + subpath;
					return (
						<Route
							key={pagePath}
							path={path + pagePath}
							render={route => (
								<FullPage path={path + pagePath} config={pageConfig} {...route} />
							)}
						/>
					);
				}),
			);
		}
		if (config.subpages) {
			subpages.push(
				...Object.entries(config.subpages).map(([subpath, config]) => {
					const pagePath = segpath + subpath;
					return (
						<Route
							key={pagePath}
							path={path + pagePath}
							render={route => <SubPage root={path} config={config} {...route} />}
						/>
					);
				}),
			);
		}
		return (
			<Route
				key={segpath}
				path={path + segpath}
				render={route => (
					<Segment path={path + segpath} config={config} root={baseHref} {...route} />
				)}
			/>
		);
	});
	return (
		<Switch>
			{pages}
			<Route
				render={() => [
					View ? <View key="View" /> : null,
					<Wrapper key="Segments">
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
							{segmentElements}
							<Redirect exact path={path} to={baseHref + Object.keys(segments)[0]} />
						</Switch>
						<Switch>{subpages}</Switch>
					</Wrapper>,
				]}
			/>
		</Switch>
	);
};

export default SegmentPage;
