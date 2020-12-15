import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import { getThemeProp } from "../../utils";
import useViewState from "../../hooks/useViewState";
import useScopeData from "./useScopeData";
import Selector from "./Selector";
import usePreviousModified from "../../hooks/usePreviousModified";
import { unwrapImmutable } from "../../utils";
import { defaultScopeSelector } from "../../selectors/settings";
import TooltippedTypography from "./../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
	test: {
		width: theme.spacing(20),
	},
}));

export const Bar = styled.div`
	position: relative;
	border-bottom: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	background-color: ${getThemeProp(["colors", "bgLight"], "#efefef")};
	width: 100%;
	min-height: 49px;
	user-select: none;
`;

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
					classes={{ root: classes.scopeButton, outlined: classes.outlinedButton }}
					variant={variant}
					color="primary"
					onClick={() => updateViewState("show", true)}
				>
					<TooltippedTypography noWrap children={name} titleValue={name} />
				</Button>
			</div>
		</Bar>
	);
};

ScopeBar.displayName = "ScopeBar";

export const SCOPE_SELECTOR_NAME = "scopeSelector";

export const Scope = ({ children, filterPlaceholder }) => {
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
	const updateFilter = event => updateViewState("filter", event.target.value);

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
			<Selector
				name={SCOPE_SELECTOR_NAME}
				show={show}
				reset={reset}
				getScope={getScope}
				filter={filter}
				currentScope={currentScope}
				updateFilter={updateFilter}
				defaultNodeState={{}}
				filterPlaceholder={filterPlaceholder}
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
