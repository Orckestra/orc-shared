import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import { getThemeProp } from "../../utils";
import useViewState from "../../hooks/useViewState";
import useScopeData from "./useScopeData";
import Button from "../Button";
import Selector from "./Selector";
import usePreviousModified from "../../hooks/usePreviousModified";
import { unwrapImmutable } from "../../utils";
import { defaultScopeSelector } from "../../selectors/settings";

export const Bar = styled.div`
	flex: 0 0 49px;
	border-bottom: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	background-color: ${getThemeProp(["colors", "bgLight"], "#efefef")};
	display: flex;
	justify-content: flex-end;
	align-items: center;
	user-select: none;
`;

export const AlignedButton = styled(Button)`
	margin-right: 20px;
	z-index: 10;
`;
AlignedButton.defaultProps = {
	primary: true,
};

export const ScopeBar = ({ show, name, updateViewState }) => (
	<Bar>
		<AlignedButton
			id="showScopeSelector"
			active={show}
			onClick={() => updateViewState("show", true)}
		>
			{name}
		</AlignedButton>
	</Bar>
);
ScopeBar.displayName = "ScopeBar";

export const Scope = ({ children, filterPlaceholder }) => {
	const name = "scopeSelector";
	const [currentScope, defaultNodeState, getScope] = useScopeData();
	const [{ show = false, nodeState, filter }, updateViewState] = useViewState(name);

	const resetNodeState = useCallback(
		current =>
			current && updateViewState("nodeState", { ...nodeState, ...defaultNodeState }),
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
				}}
			/>
			<Selector
				name={name}
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
