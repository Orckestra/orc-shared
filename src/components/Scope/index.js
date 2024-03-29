import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import useViewState from "../../hooks/useViewState";
import useScopeData from "./useScopeData";
import usePreviousModified from "../../hooks/usePreviousModified";
import { unwrapImmutable } from "../../utils";
import { defaultScopeSelector } from "../../selectors/settings";
import TooltippedTypography from "./../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ScopeSelector from "./../MaterialUI/ScopeSelector/ScopeSelector";
import ScopeModificationConfirmationDialog from "./ScopeModificationConfirmationDialog";
import useScopeConfirmationModalState from "./useScopeConfirmationModalState";

const useStyles = makeStyles(theme => ({
	scopeButton: {
		zIndex: 10,
		maxWidth: theme.spacing(25),
	},
	outlinedButton: {
		backgroundColor: theme.palette.primary.contrastText,
	},
	buttonContainer: {
		position: "absolute",
		top: "50%",
		transform: "translateY(-50%)",
		right: theme.spacing(2),
	},
	scopeBar: {
		position: "relative",
		borderBottom: `1px solid ${theme.palette.primary.main}`,
		backgroundColor: theme.palette.grey.light,
		width: "100%",
		minHeight: theme.spacing(4.9),
		userSelect: "none",
	},
}));

export const Bar = props => {
	const classes = useStyles();

	return <div className={classes.scopeBar}>{props.children}</div>;
};

export const ScopeBar = ({ show, name, updateViewState, disabled }) => {
	const classes = useStyles();

	const variant = show === true ? "contained" : "outlined";

	// markup such this was made just to support correct behavior in IE
	// because it doesn't support min-width: auto for flex elements
	return (
		<Bar>
			<div className={classes.buttonContainer}>
				<Button
					disabled={disabled}
					variant={variant}
					color="primary"
					onClick={() => updateViewState("show", true)}
					disableElevation
				>
					<TooltippedTypography noWrap children={name} titleValue={name} />
				</Button>
			</div>
		</Bar>
	);
};

ScopeBar.displayName = "ScopeBar";

export const SCOPE_SELECTOR_NAME = "scopeSelector";

export const Scope = ({ children }) => {
	const [currentScope, defaultNodeState, getScope] = useScopeData();
	const [{ show = false, disabled, nodeState, filter }, updateViewState] = useViewState(SCOPE_SELECTOR_NAME);

	const resetNodeState = useCallback(
		current => current && updateViewState("nodeState", { ...nodeState, ...defaultNodeState }),
		[updateViewState, nodeState, defaultNodeState],
	);
	usePreviousModified(show, resetNodeState);

	const reset = event => {
		updateViewState("show", false);
		event.stopPropagation();
	};
	const updateFilter = event => updateViewState("filter", event);

	const [isModalOpened, closeModal, scopeDialogType, acceptScopeChange, selectNewScope] =
		useScopeConfirmationModalState();

	const onScopeSelectorClose = (event, newSelection) => {
		reset(event);
		selectNewScope(newSelection);
	};

	const isScopeSelectable = scopeId => {
		const scope = getScope(scopeId);
		return scope?.isAuthorizedScope ?? false;
	};

	return (
		<React.Fragment>
			<ScopeBar
				{...{
					name: currentScope.name,
					show,
					updateViewState,
					disabled,
				}}
			/>
			<ScopeSelector
				show={show}
				getScope={getScope}
				isScopeSelectable={isScopeSelectable}
				selectedScope={currentScope}
				closeSelector={onScopeSelectorClose}
				filter={filter}
				updateFilter={updateFilter}
			/>
			<ScopeModificationConfirmationDialog
				isModalOpened={isModalOpened}
				scopeDialogType={scopeDialogType}
				closeModalCallback={closeModal}
				okCallback={acceptScopeChange}
			/>
			{children}
		</React.Fragment>
	);
};
Scope.displayName = "Scope";

const RoutedScope = props => {
	const defaultScope = unwrapImmutable(useSelector(defaultScopeSelector));

	return (
		<Switch>
			<Route path="/:scope" render={() => <Scope {...props} />} />
			<Redirect to={"/".concat(defaultScope || "Global")} />
		</Switch>
	);
};

export default RoutedScope;
