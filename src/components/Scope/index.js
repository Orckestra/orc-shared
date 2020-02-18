import React from "react";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import useViewState from "../../hooks/useViewState";
import useScopeData from "./useScopeData";
import Button from "../Button";
import Selector from "./Selector";

export const Bar = styled.div`
	flex: 0 0 49px;
	border-bottom: 1px solid #ccc;
	background-color: #efefef;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	user-select: none;
`;

export const AlignedButton = styled(Button)`
	margin-right: 20px;
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
	const [{ show = false, nodeState, filter }, updateViewState] = useViewState(
		name,
	);
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
				nodeState={nodeState}
				defaultNodeState={defaultNodeState}
				filter={filter}
				updateFilter={updateFilter}
				filterPlaceholder={filterPlaceholder}
			/>
			{children}
		</React.Fragment>
	);
};
Scope.displayName = "Scope";

const RoutedScope = props => (
	<Switch>
		<Route path="/:scope" render={() => <Scope {...props} />} />
		<Redirect to="/Global" />
	</Switch>
);

export default RoutedScope;
