import React from "react";
import ScopeTreeView from "./ScopeTreeView";
import { makeStyles } from "@material-ui/core/styles";
import Sidepanel from "./../../Sidepanel";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InputBase from "./../Inputs/InputBase";
import { useIntl } from "react-intl";
import InputBaseProps from "./../Inputs/InputBaseProps";
import sharedMessages from "./../../../sharedMessages";

const useStyles = makeStyles(theme => ({
	container: {
		top: theme.spacing(9),
		zIndex: 9999,
		backgroundColor: theme.palette.grey.light,
		border: `1px solid ${theme.palette.grey.borders}`,
		boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
		width: theme.spacing(50),
	},
	scopeSelector: {
		display: "flex",
		flexDirection: "column",
		height: `calc(100% - ${theme.spacing(12)})`,
		overflowY: "auto",
		overflowX: "hidden",
		padding: `${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
	},
	inputContainer: {
		padding: theme.spacing(2),
		borderBottom: `1px solid ${theme.palette.grey.icon}`,
	},
}));

const ScopeSelector = ({ show, getScope, selectedScope, closeSelector, filter, updateFilter, isScopeSelectable }) => {
	const classes = useStyles();
	const { formatMessage } = useIntl();

	const inputBaseProps = new InputBaseProps();

	inputBaseProps.set(InputBaseProps.propNames.placeholder, formatMessage(sharedMessages.scopeFilterPlaceholder));
	inputBaseProps.set(InputBaseProps.propNames.value, filter);
	inputBaseProps.set(InputBaseProps.propNames.update, updateFilter);

	const scopeSelectorContent = (
		<>
			<div className={classes.inputContainer}>
				<InputBase inputProps={inputBaseProps} />
			</div>
			<div className={classes.scopeSelector}>
				<ScopeTreeView
					className={classes.test}
					rootId="Global"
					getScope={getScope}
					selected={selectedScope.id}
					expanded={selectedScope.scopePath}
					onSelected={closeSelector}
					isScopeSelectable={isScopeSelectable}
				/>
			</div>
		</>
	);

	const scopeSelector = (
		<Sidepanel className={classes.container} in={show} timeout={300}>
			<ClickAwayListener onClickAway={e => closeSelector(e)}>
				{/* this div is required since ClickAwayListener child element should be able to hold ref */}
				<div>{show ? scopeSelectorContent : null}</div>
			</ClickAwayListener>
		</Sidepanel>
	);

	return scopeSelector;
};

export default ScopeSelector;
