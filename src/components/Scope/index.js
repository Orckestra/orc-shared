import React from "react";
import styled from "styled-components";
import { compose, withHandlers } from "recompose";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import withViewState from "../../hocs/withViewState";
import Button from "../Button";
import Selector from "./Selector";

export const Bar = styled.div`
	height: 49px;
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

export const Viewport = styled.div`
	height: calc(100% - 50px);
	overflow-x: hidden;
	overflow-y: auto;
`;

export const withSelectorHandlers = withHandlers({
	reset: /* istanbul ignore next */ ({ updateViewState }) => event => {
		updateViewState("show", false);
		event.stopPropagation();
	},
	updateNodeState: /* istanbul ignore next */ ({ updateViewState }) => update =>
		updateViewState("nodeState", update),
	updateFilter: /* istanbul ignore next */ ({ updateViewState }) => event =>
		updateViewState("filter", event.target.value),
});

export const Scope = ({
	currentScope,
	getScope,
	show = false,
	nodeState,
	filter,
	updateViewState,
	reset,
	updateNodeState,
	updateFilter,
	children,
	filterPlaceholder,
}) => (
	<React.Fragment>
		<ScopeBar
			{...{
				name: currentScope.name,
				show,
				updateViewState,
			}}
		/>
		<Selector
			show={show}
			reset={reset}
			getScope={getScope}
			nodeState={nodeState}
			updateNodeState={updateNodeState}
			filter={filter}
			updateFilter={updateFilter}
			filterPlaceholder={filterPlaceholder}
		/>
		<Viewport>{children}</Viewport>
	</React.Fragment>
);
Scope.displayName = "Scope";

const withScopeRoute = WrapScope => props => (
	<RenderFragment forRoute="/:scope">
		<WrapScope name="scopeSelector" {...props} />
	</RenderFragment>
);

export default compose(
	withScopeRoute,
	withViewState,
	withSelectorHandlers,
)(Scope);
