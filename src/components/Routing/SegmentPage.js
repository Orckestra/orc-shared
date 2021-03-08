import React from "react";
import styled, { css } from "styled-components";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import UrlPattern from "url-pattern";
import { ifFlag, getThemeProp } from "../../utils";
import Text from "../Text";
import FullPage from "./FullPage";
import SubPage from "./SubPage";
import Segment from "./Segment";
import { getModifiedSections, getSectionsWithErrors } from "./../../selectors/view";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TooltippedTypography from "./../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import { tryGetNewEntityIdKey } from "./../../utils/urlHelper";

const useStyles = makeStyles(theme => ({
	asterix: {
		marginLeft: theme.spacing(0.5),
	},
	label: {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightSemiBold,
		fontSize: theme.typography.fontSize,
		maxWidth: theme.spacing(15),
	},
	modifiedLabel: {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightBold,
	},
	errorLabel: {
		color: theme.palette.error.main,
		fontWeight: theme.typography.fontWeightBold,
	},
	disabledLabel: {
		color: theme.palette.grey.icon,
	},
	labelComponent: {
		margin: `0 ${theme.spacing(1)}`,
	},
}));

export const Wrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	border-top: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	flex: 0 1 100%;
	height: calc(100% - 90px);
	min-height: 0;

	div[class^="AppFrame__ViewPort"] > div&:nth-child(3) {
		margin-top: 60px;
	}
`;

export const List = styled.div`
	flex: 0 0.1 15%;
	border-right: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	display: flex;
	flex-direction: column;
`;

const FilteredLink = ({ active, ...props }) => (props.to ? <Link {...props} /> : <div {...props} />);

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

export const SegmentItem = ({ isModified, isError, isActive, segpath, config, baseHref, params }) => {
	const classes = useStyles();
	let hideSelector = state => (typeof config.hide === "function" ? config.hide(params)(state) : config.hide ?? false);
	const isHide = useSelector(hideSelector);
	const asterix = <span className={classes.asterix}>*</span>;
	const text = <Text message={config.label} />;
	const basicLabel =
		config.labelComponent != null ? (
			<TooltippedTypography titleValue={text} children={text} noWrap className={classes.label} />
		) : (
			text
		);
	const getSectionLabelClassName = (isModified, isError, isDisabled) => {
		let className = classes.label;
		if (isModified) className = `${className} ${classes.modifiedLabel}`;
		if (isError) className = `${className} ${classes.errorLabel}`;
		if (isDisabled) className = `${className} ${classes.disabledLabel}`;

		return className;
	};

	let disableSelector = state =>
		typeof config.disabled === "function" ? config.disabled(params)(state) : config.disabled ?? false;
	const isDisabled = useSelector(disableSelector);
	const sectionLabelClassName = getSectionLabelClassName(isModified, isError, isDisabled);
	const finalLabel = (
		<Grid container justify="space-between">
			<Grid item className={sectionLabelClassName}>
				{basicLabel}
				{isModified ? asterix : null}
			</Grid>
			<Grid item className={classes.labelComponent}>
				{config.labelComponent}
			</Grid>
		</Grid>
	);

	return (
		<>
			{!isHide && isDisabled && <Item>{finalLabel}</Item>}
			{!isHide && !isDisabled && (
				<Item to={baseHref + segpath} active={isActive}>
					{finalLabel}
				</Item>
			)}
		</>
	);
};

const defaultEntityIdResolver = ({ match, baseHref }) => {
	const entityIdKey = Object.keys(match.params).find(p => p !== "scope");
	let entityId = match.params[entityIdKey];
	if (!entityId) {
		entityId = tryGetNewEntityIdKey(baseHref);
	}

	return entityId;
};

const SegmentPage = ({ path, component: View, segments, location, match, modulePrependPath, entityIdResolver }) => {
	const pattern = new UrlPattern(path);
	const baseHref = pattern.stringify(match.params);
	const pages = [],
		subpages = [];

	const entityIdResolverParams = { match, baseHref };
	const entityId = (entityIdResolver ?? defaultEntityIdResolver)(entityIdResolverParams);

	const modifiedSections = useSelector(getModifiedSections(entityId));
	const sectionsWithErrors = useSelector(getSectionsWithErrors(entityId));
	const segmentEntries = Object.entries(segments);

	const segmentElements = segmentEntries.map(([segpath, config]) => {
		if (config.pages) {
			pages.push(
				...Object.entries(config.pages).map(([subpath, pageConfig]) => {
					const pagePath = segpath + subpath;
					return (
						<Route
							key={pagePath}
							path={path + pagePath}
							render={route => (
								<FullPage path={path + pagePath} config={pageConfig} {...route} modulePrependPath={modulePrependPath} />
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
							render={route => <SubPage root={path} config={config} {...route} modulePrependPath={modulePrependPath} />}
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
					<Segment
						path={path + segpath}
						config={config}
						root={baseHref}
						{...route}
						modulePrependPath={modulePrependPath}
					/>
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
							{segmentEntries.map(([segpath, config]) => {
								const isModified = modifiedSections.includes(segpath.replace("/", ""));
								const isError = sectionsWithErrors.includes(segpath.replace("/", ""));
								const isActive = location.pathname === baseHref + segpath;
								return (
									<SegmentItem
										key={segpath}
										isModified={isModified}
										isError={isError}
										segpath={segpath}
										config={config}
										isActive={isActive}
										baseHref={baseHref}
										params={match.params}
									/>
								);
							})}
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
