// @flow
import React from "react";
import type { StatelessFunctionalComponent } from "react";
import styled from "styled-components";

const CrumbWrapper = styled.ul`
	display: flex;
	list-style-type: none;
	margin: 0;
	padding: 0;
	padding-top: 5px;
	font-family: Open Sans, sans-serif;
	font-style: italic;
	font-size: 13px;
`;

const Crumb = styled.li`
	&:before {
		content: "/";
		padding-right: 0.3em;
	}

	padding-left: 0.2em;

	&:first {
		padding-left: 0;
	}
`;

const CrumbLink = styled.a`
	color: #ccc;
	text-decoration: none;
`;

export type PathProp = { path: Array<{ label: string, href: string }> };

const Breadcrumbs: StatelessFunctionalComponent<PathProp> = ({
	path,
}: PathProp) => {
	let combinedPath = "";
	return (
		<CrumbWrapper>
			{path.map(step => (
				<Crumb>
					<CrumbLink href={(combinedPath += "/" + step.href)}>
						{step.label}
					</CrumbLink>
				</Crumb>
			))}
		</CrumbWrapper>
	);
};

export default Breadcrumbs;
