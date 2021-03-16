import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ResizeDetector from "react-resize-detector";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabLabel from "./TabLabel";
import Select from "../Inputs/Select";
import SelectProps from "../Inputs/SelectProps";
import Icon from "../DataDisplay/Icon";
import { isScrollVisible } from "./../../../utils/domHelper";
import { getModifiedTabs } from "./../../../selectors/view";
import ConfirmationModal from "./../DataDisplay/PredefinedElements/ConfirmationModal";
import { removeEditNode } from "./../../../actions/view";
import { getValueFromUrlByKey, tryGetNewEntityIdKey } from "./../../../utils/urlHelper";
import { useDispatchWithModulesData } from "./../../../hooks/useDispatchWithModulesData";
import sharedMessages from "./../../../sharedMessages";

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

const MuiBar = ({ module, pages }) => {
	const tabs = React.useRef(null);
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatchWithModulesData();
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

	const handleChange = (_, value) => {
		if (value === false) {
			history.push(module.href);
		} else {
			const href = pages[value].href;
			history.push(href);
		}
	};

	const tabLabels = [];

	const selectProps = new SelectProps();
	selectProps.set(SelectProps.propNames.iconSelect, true);
	selectProps.set(SelectProps.propNames.value, activeTabIndex === false ? "" : activeTabIndex);
	selectProps.set(SelectProps.propNames.update, newValue => handleChange(null, newValue));

	const select = (
		<div className={classes.select}>
			<Select options={tabLabels} selectProps={selectProps} />
		</div>
	);

	const tabCloseHandler = (event, closeCallback, isModified, href, path, entityIdKey) => {
		event.stopPropagation();
		event.preventDefault();
		if (isModified) {
			setCurrentCloseData({ closeCallback: closeCallback, href: href, path: path, entityIdKey: entityIdKey });
			setShowConfirmationModal(true);
		} else {
			closeCallback();
			removeEditState(href, entityIdKey, path);
		}
	};

	const closeTab = () => {
		setShowConfirmationModal(false);
		currentCloseData.closeCallback();
		removeEditState(currentCloseData.href, currentCloseData.entityIdKey, currentCloseData.path);
	};

	const removeEditState = (href, entityIdKey, path) => {
		let newKey = tryGetNewEntityIdKey(href);
		const key = entityIdKey === newKey ? entityIdKey : `:${entityIdKey}`;
		const entityId = getValueFromUrlByKey(href, path, key);
		dispatch(removeEditNode, [entityId]);
	};

	const moduleIcon = <Icon id={module.icon} className={classes.moduleIcon} />;

	const resizeHandler = React.useCallback(() => {
		const scroller = tabs.current.querySelector(".MuiTabs-flexContainer");
		setShowSelect(isScrollVisible(scroller));
	}, [tabs]);

	React.useEffect(() => {
		resizeHandler();
	}, [resizeHandler, module, pages]);

	return (
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
				{pages.map(({ href, label, outsideScope, close, path, params, mustTruncate }, index) => {
					let entityIdKey = Object.keys(params).find(p => p !== "scope");
					if (!entityIdKey) entityIdKey = tryGetNewEntityIdKey(href);
					const isModified = modifiedTabs.includes(href);
					const tabLabel = <TabLabel label={label} />;
					const tabClassName = classNames(classes.labelContainer, isModified && classes.modifiedLabel);
					const wrappedTabLabel = (
						<div className={tabClassName}>
							<TabLabel label={label} mustTruncate={mustTruncate} />
							{isModified === true ? <span className={classes.asterix}>*</span> : null}
						</div>
					);
					const closeIcon = (
						<Icon
							id="close"
							className={classes.closeIcon}
							onClick={event => tabCloseHandler(event, close, isModified, href, path, entityIdKey)}
						/>
					);
					tabLabels.push({
						value: index,
						label: tabLabel,
						sortOrder: index,
					});
					return (
						<Tab
							classes={{
								root: classNames(classes.tab, !mustTruncate && classes.unsetMaxWidth),
							}}
							component={TabLink}
							label={wrappedTabLabel}
							key={href}
							to={href}
							value={index}
							close={closeIcon}
							disabled={outsideScope}
						/>
					);
				})}
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
};

export default MuiBar;
