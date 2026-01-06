import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import UrlPattern from "url-pattern";
import FullPage from "./FullPage";
import SubPage from "./SubPage";
import Segment from "./Segment";
import { getModifiedSections, getSectionsWithErrors } from "./../../selectors/view";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TooltippedTypography from "./../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import { tryGetNewEntityIdKey } from "./../../utils/urlHelper";
import classNames from "classnames";

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
		justifyContent: "flex-end",
	},
	labelContainer: {
		display: "flex",
	},
	wrapper: {
		boxSizing: "border-box",
		display: "flex",
		borderTop: `1px solid ${theme.palette.grey.borders}`,
		flex: "0 1 100%",
		height: "calc(100% - 90px)",
		minHeight: 0,

		"div[class^='AppFrame__ViewPort'] > div&:nth-child(3)": {
			marginTop: props => (props.isComponentNull ? null : theme.spacing(6)),
		},
	},
	list: {
		flex: "0 0.1 15%",
		borderRight: `1px solid ${theme.palette.grey.borders}`,
		display: "flex",
		flexDirection: "column",
		overflowY: "auto",
	},
	item: {
		display: "block",
		whiteSpace: "nowrap",
		minWidth: "max-content",
		padding: "15px 20px",
		fontWeight: "bold",
		fontSize: "13px",
		textDecoration: "none",
		cursor: "pointer",
		color: theme.palette.text.primary,

		"&:hover": {
			backgroundColor: "#f7f7f7",
		},

		"&.active": {
			backgroundColor: "#b4cfe3",
		},
	},
}));

const FilteredLink = ({ active, ...props }) => (props.to ? <Link {...props} /> : <div {...props} />);

export const SegmentItem = ({ isModified, isError, isActive, segpath, config, baseHref, params }) => {
	const classes = useStyles();
	let hideSelector = state => (typeof config.hide === "function" ? config.hide(params)(state) : (config.hide ?? false));
	const isHide = useSelector(hideSelector);
	const asterix = <span className={classes.asterix}>*</span>;

	if (config.labelValueSelector) {
		const values = config.labelValueSelector(params);

		if (typeof values === "function") {
			config.label.values = values();
		} else if (config.label.values) {
			delete config.label.values;
		}
	}

	const text = typeof config.label === "string" ? config.label : <FormattedMessage {...config.label} />;

	const getSectionLabelClassName = (isModified, isError, isDisabled) => {
		let className = classes.label;
		if (isModified) className = `${className} ${classes.modifiedLabel}`;
		if (isError) className = `${className} ${classes.errorLabel}`;
		if (isDisabled) className = `${className} ${classes.disabledLabel}`;

		return className;
	};

	let disableSelector = state =>
		typeof config.disabled === "function" ? config.disabled(params)(state) : (config.disabled ?? false);
	const isDisabled = useSelector(disableSelector);
	const sectionLabelClassName = getSectionLabelClassName(isModified, isError, isDisabled);

	const basicLabel =
		config.labelComponent != null ? (
			<TooltippedTypography titleValue={text} children={text} noWrap className={sectionLabelClassName} />
		) : (
			text
		);

	const finalLabel = (
		<Grid container alignItems="center" wrap="nowrap">
			<Grid
				item
				xs={8}
				className={classNames(sectionLabelClassName, config.labelComponent != null ? classes.labelContainer : null)}
			>
				{basicLabel}
				{isModified ? asterix : null}
			</Grid>
			<Grid item xs={4} container className={classes.labelComponent}>
				{config.labelComponent}
			</Grid>
		</Grid>
	);

	return (
		<>
			{!isHide && isDisabled && <Item>{finalLabel}</Item>}
			{!isHide && !isDisabled && (
				<Item active={isActive} to={baseHref + segpath}>
					{finalLabel}
				</Item>
			)}
		</>
	);
};

export const Wrapper = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.wrapper} key="Segments">
			{children}
		</div>
	);
};

export const List = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.list}>{children}</div>;
};

export const Item = ({ active, to, children, onClick }) => {
	const classes = useStyles();

	return (
		<FilteredLink className={classNames(classes.item, active ? "active" : undefined)} to={to} onClick={onClick}>
			{children}
		</FilteredLink>
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

const SegmentPage = ({
	path,
	component: View,
	componentProps,
	segments,
	location,
	match,
	modulePrependPath,
	entityIdResolver,
}) => {
	const classes = useStyles({ isComponentNull: !View });
	const pattern = new UrlPattern(path);
	const baseHref = pattern.stringify(match.params);
	const pages = [],
		subpages = [];

	const entityId = entityIdResolver ? entityIdResolver({ match }) : defaultEntityIdResolver({ match, baseHref });

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
			const parentUrl = path + segpath;
			const parentUrlPattern = new UrlPattern(parentUrl);

			subpages.push(
				...Object.entries(config.subpages).map(([subpath, config]) => {
					const pagePath = segpath + subpath;
					return (
						<Route
							key={pagePath}
							path={path + pagePath}
							render={route => (
								<SubPage
									root={path}
									config={config}
									parentUrlPattern={parentUrlPattern}
									{...route}
									modulePrependPath={modulePrependPath}
								/>
							)}
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
					View ? <View key="View" {...componentProps} /> : null,
					<div className={classes.wrapper} key="Segments">
						<div className={classes.list}>
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
						</div>
						<Switch>
							{segmentElements}
							<Redirect exact path={path} to={baseHref + Object.keys(segments)[0]} />
						</Switch>
						<Switch>{subpages}</Switch>
					</div>,
				]}
			/>
		</Switch>
	);
};

export default SegmentPage;
