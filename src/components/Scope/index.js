import React from "react";
import styled from "styled-components";
import { compose, withHandlers } from "recompose";
import { Route, Switch, Redirect } from "react-router-dom";
import withViewState from "../../hocs/withViewState";
import withScopeData from "../../hocs/withScopeData";
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
		<AlignedButton active={show} onClick={() => updateViewState("show", true)}>
			{name}
		</AlignedButton>
	</Bar>
);
ScopeBar.displayName = "ScopeBar";

export const withSelectorHandlers = withHandlers({
	reset: /* istanbul ignore next */ ({ updateViewState }) => event => {
		updateViewState("show", false);
		event.stopPropagation();
	},
	updateFilter: /* istanbul ignore next */ ({ updateViewState }) => event =>
		updateViewState("filter", event.target.value),
});

export const Scope = ({
	name,
	currentScope,
	getScope,
	updateViewState,
	reset,
	updateNodeState,
	updateFilter,
	children,
	filterPlaceholder,
	viewState = {},
}) => {
	const { show = false, nodeState, filter } = viewState;
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
				updateNodeState={updateNodeState}
				filter={filter}
				updateFilter={updateFilter}
				filterPlaceholder={filterPlaceholder}
			/>
			{children}
		</React.Fragment>
	);
};
Scope.displayName = "Scope";

const withScopeRoute = WrapScope => props => (
	<Switch>
		<Route
			path="/:scope"
			render={() => <WrapScope name="scopeSelector" {...props} />}
		/>
		<Redirect to="/Global" />
	</Switch>
);

export default compose(
	withScopeData,
	withScopeRoute,
	withViewState,
	withSelectorHandlers,
)(Scope);
