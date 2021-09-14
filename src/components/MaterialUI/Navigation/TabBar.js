import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ResizeDetector from "react-resize-detector";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabLabel from "./TabLabel";
import Select from "../Inputs/Select";
import SelectProps from "../Inputs/SelectProps";
import Icon from "../DataDisplay/Icon";
import { isScrollVisible } from "./../../../utils/domHelper";
import { getModifiedTabs, getTabsWithErrors } from "./../../../selectors/view";
import ConfirmationModal from "./../DataDisplay/PredefinedElements/ConfirmationModal";
import { removeEditNode } from "./../../../actions/view";
import { tryGetNewEntityIdKey, resolveEntityId } from "./../../../utils/urlHelper";
import { useDispatchWithModulesData } from "./../../../hooks/useDispatchWithModulesData";
import sharedMessages from "./../../../sharedMessages";
import { setClosingTabHandlerActions } from "../../../actions/navigation";

const useStyles = makeStyles(theme => ({
	container: {
		flex: `0 0 ${theme.spacing(1)}`,
		maxHeight: 0,
		padding: `0 0 0 ${theme.spacing(1)}`,
		margin: `0 ${theme.spacing(20)} 0 0`,
		display: "flex",
		alignItems: "flex-end",
		width: `calc(100% - ${theme.spacing(30)})`,
	},
	tab: {
		flex: "0 0 auto",
	},
	unsetMaxWidth: {
		maxWidth: "unset",
	},
	tabWrapper: {
		"& > *:first-child": {
			order: "1 !important",
			marginLeft: theme.spacing(1),
			color: theme.palette.primary.contrastText,

			"&:hover": {
				color: theme.palette.primary.main,
			},
		},
	},
	hidden: {
		visibility: "hidden",
		position: "absolute",
	},
	moduleIcon: {
		width: `${theme.spacing(2.4)} !important`,
		height: theme.spacing(2.4),
		color: "inherit",
	},
	sectionIcon: {
		width: `${theme.spacing(1.6)} !important`,
		height: theme.spacing(1.6),
	},
	select: {
		marginLeft: theme.spacing(2),
		marginBottom: theme.spacing(1),
		zIndex: 100,
	},
	closeIcon: {
		marginLeft: theme.spacing(1),
		color: theme.palette.primary.contrastText,
		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
	labelContainer: {
		position: "relative",
		width: "100%",
	},
	modifiedLabel: {
		fontWeight: theme.typography.fontWeightBold,
	},
	errorLabel: {
		color: theme.palette.error.main,
		fontWeight: theme.typography.fontWeightBold,
	},
	asterix: {
		position: "absolute",
		top: theme.spacing(-0.5),
		right: theme.spacing(-0.7),
	},
}));

export const TabLink = React.forwardRef((props, ref) => {
	return (
		<Link to={props.to} {...props} ref={ref}>
			{props.children}
			{props.close}
		</Link>
	);
});

const MuiBar = ({ module, moduleName, pages }) => {
	const tabs = React.useRef(null);
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatchWithModulesData();
	const dispatchRedux = useDispatch();
	const activePage = pages.findIndex(p => p.active === true);
	const activeTabIndex = activePage === -1 ? false : activePage;
	const [showSelect, setShowSelect] = React.useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);
	const [currentCloseData, setCurrentCloseData] = React.useState();

	const pagesParams = pages.map(page => ({
		href: page.href,
		params: Object.values(page.params),
	}));

	const modifiedTabs = useSelector(getModifiedTabs(pagesParams));
	const tabsWithErrors = useSelector(getTabsWithErrors(pagesParams));

	const tabLabels = [];

	const handleChange = (_, value) => {
		if (typeof value === "number" && value >= 0 && value < pages.length) {
			const href = pages[value].href;
			history.push(href);
		} else {
			history.push(module.href);
		}
	};

	const selectProps = new SelectProps();
	selectProps.set(SelectProps.propNames.iconSelect, true);
	selectProps.set(SelectProps.propNames.value, activeTabIndex === false ? "" : activeTabIndex);
	selectProps.set(SelectProps.propNames.update, newValue => handleChange(null, newValue));

	const select = (
		<div className={classes.select}>
			<Select options={tabLabels} selectProps={selectProps} />
		</div>
	);

	const getNewIndex = oldIndex => {
		const newIndex = oldIndex + 1 >= tabLabels.length ? oldIndex - 1 : oldIndex + 1;
		return newIndex;
	};

	const tabCloseHandler = (event, closeCallback, isModified, href, path, entityIdKey, entityId, index) => {
		event.stopPropagation();
		event.preventDefault();
		if (isModified) {
			setCurrentCloseData({ closeCallback, entityId, index });
			setShowConfirmationModal(true);
		} else {
			closeCallback();
			dispatch(removeEditNode, [entityId]);
			handleChange(null, getNewIndex(index));
		}
	};

	const closeTab = () => {
		setShowConfirmationModal(false);
		currentCloseData.closeCallback();
		dispatch(removeEditNode, [currentCloseData.entityId]);
		handleChange(null, getNewIndex(currentCloseData.index));
	};

	const moduleIcon = <Icon id={module.icon} className={classes.moduleIcon} />;

	const resizeHandler = React.useCallback(() => {
		const scroller = tabs.current.querySelector(".MuiTabs-flexContainer");
		setShowSelect(isScrollVisible(scroller));
	}, [tabs]);

	React.useEffect(() => {
		resizeHandler();
	}, [resizeHandler, module, pages]);

	const closingActions = [];

	const allTabs = (
		<div className={classes.container}>
			<ResizeDetector onResize={resizeHandler} />
			<Tab
				label={<TabLabel label={module.label} />}
				component={Link}
				key={module.href}
				to={module.href}
				icon={moduleIcon}
				onClick={e => handleChange(e, false)}
				className={activeTabIndex === false ? "Mui-selected" : null}
				disableFocusRipple
			/>
			<Tabs
				value={activeTabIndex}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="off"
				classes={{
					scrollButtons: classes.hidden,
				}}
				ref={tabs}
			>
				{pages.map(
					(
						{ href, label, outsideScope, close, path, params, mustTruncate, icon, isDetails, entityIdResolver },
						index,
					) => {
						let entityIdKey = Object.keys(params).find(p => p.toLowerCase().endsWith("id"));
						if (!entityIdKey) entityIdKey = tryGetNewEntityIdKey(href);
						const entityId =
							typeof entityIdResolver === "function"
								? entityIdResolver({ match: { params } })
								: resolveEntityId(href, path, entityIdKey);
						const isModified = modifiedTabs.includes(href);
						const isError = tabsWithErrors.includes(href);
						const tabLabel = <TabLabel label={label} />;
						const sectionIconClss = classNames(classes.moduleIcon, isDetails && classes.sectionIcon);
						const tabClassName = classNames(
							classes.labelContainer,
							isModified && classes.modifiedLabel,
							isError && classes.errorLabel,
						);
						const sectionIcon = icon && <Icon id={icon} className={sectionIconClss} />;

						const wrappedTabLabel = (
							<div className={tabClassName}>
								<TabLabel label={label} mustTruncate={mustTruncate} classes={{ root: tabClassName }} />
								{isModified === true ? <span className={classes.asterix}>*</span> : null}
							</div>
						);
						const closeIcon = (
							<Icon
								id="close"
								className={classes.closeIcon}
								onClick={event => tabCloseHandler(event, close, isModified, href, path, entityIdKey, entityId, index)}
							/>
						);
						tabLabels.push({
							value: index,
							label: tabLabel,
							sortOrder: index,
						});

						if (entityId != null) {
							closingActions.push({
								entityId: entityId,
								closeTab: (event, executeHandlerOnly = false) => {
									close(event, executeHandlerOnly);
									if (executeHandlerOnly === false) {
										handleChange(null, getNewIndex(index));
									}
								},
							});
						}

						return (
							<Tab
								classes={{
									root: classNames(classes.tab, !mustTruncate && classes.unsetMaxWidth),
								}}
								component={TabLink}
								label={wrappedTabLabel}
								icon={sectionIcon}
								key={href}
								to={href}
								value={index}
								close={closeIcon}
								disabled={outsideScope}
							/>
						);
					},
				)}
			</Tabs>
			{showSelect ? select : null}
			<ConfirmationModal
				message={<FormattedMessage {...sharedMessages.unsavedChanges} />}
				open={showConfirmationModal}
				okCallback={() => closeTab()}
				cancelCallback={() => setShowConfirmationModal(false)}
				backdropClickCallback={() => setShowConfirmationModal(false)}
			/>
		</div>
	);

	React.useEffect(() => {
		dispatchRedux(setClosingTabHandlerActions(moduleName, closingActions));
	}, [dispatchRedux, moduleName, closingActions]);

	return allTabs;
};

export default MuiBar;
