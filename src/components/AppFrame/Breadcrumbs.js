import React from "react";
import styled from "styled-components";
import getEnhancedComponent from "./getEnhancedComponent";

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

const getEnhancedCrumbLink = getEnhancedComponent();

const Breadcrumbs = ({ path, linkHOC }) => {
	const EnhancedCrumbLink = getEnhancedCrumbLink(linkHOC, CrumbLink);
	return (
		<CrumbWrapper>
			{path.map((step, index) => (
				<Crumb key={index}>
					<EnhancedCrumbLink href={step.href}>{step.label}</EnhancedCrumbLink>
				</Crumb>
			))}
		</CrumbWrapper>
	);
};

export default Breadcrumbs;
