import React from "react";
import pt from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import Icon from "./Icon";

export const Bar = styled.div`
	flex: 0 0 64px;
	border-bottom: 1px solid #cccccc;
	display: flex;
	align-items: center;
	padding: 0 24px;
`;

export const ToolGroup = styled.div`
	flex: 0 0;
	display: flex;

	& > *:not(:last-child) {
		margin-right: -1px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	& > *:not(:first-child) {
		margin-left: 0;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
`;

export const ToolbarButton = styled(Button)`
	flex: 0 0;
	margin: 0 5px;
	min-width: auto;

	&:focus,
	&:hover {
		z-index: 10;
	}
`;

export const ToolbarButtonIcon = styled(Icon)`
	font-size: 20px;
	margin: -2px -2px;
`;

export const ToolbarButtonText = styled.span`
	${ToolbarButtonIcon} + & {
		margin-left: 12px;
		vertical-align: top;
	}
`;

export const ToolbarInput = styled(Input)`
	height: 30px;
	flex: 0 0;
	margin: 0 5px;

	&:focus {
		z-index: 10;
	}
`;

export const Separator = styled.div`
	flex: 0 0 1px;
	height: 30px;
	margin: 0 16px;
	background-color: #cccccc;
`;

export const Spacer = styled.div`
	flex: 100%;
`;

// Define the dictionary so we can use it below
export const toolComponents = {};

// Turns a tool definition into a rendered React element
const renderToolComponent = ({ type, ...props }) => {
	const Comp = toolComponents[type];
	return <Comp {...props} />;
};

// Fill in the tool types
toolComponents.input = props => <ToolbarInput {...props} />;
toolComponents.input.displayName = "ToolInput";

toolComponents.button = ({ label, ...props }) => (
	<ToolbarButton {...props}>
		{label.icon ? <ToolbarButtonIcon id={label.icon} /> : null}
		{label.text ? <ToolbarButtonText>{label.text}</ToolbarButtonText> : null}
	</ToolbarButton>
);
toolComponents.button.displayName = "ToolButton";

toolComponents.group = ({ tools }) => (
	<ToolGroup>{tools.map(renderToolComponent)}</ToolGroup>
);
toolComponents.group.displayName = "ToolGroup";

toolComponents.spacer = () => <Spacer />;
toolComponents.spacer.displayName = "ToolSpacer";

toolComponents.separator = () => <Separator />;
toolComponents.separator.displayName = "ToolSeparator";

export const Toolbar = ({ tools }) => (
	<Bar>{tools.map(renderToolComponent)}</Bar>
);

// These tools are allowed inside tool groups
const toolPropType = pt.oneOfType([
	pt.shape({
		type: pt.oneOf(["input"]).isRequired,
	}),
	pt.shape({
		type: pt.oneOf(["button"]).isRequired,
		label: pt.shape({ icon: pt.string, label: pt.string }).isRequired,
	}),
]);

// These tools are allowed outside groups
const toolPropTypeWithGroup = pt.oneOfType([
	toolPropType,
	pt.shape({ type: pt.oneOf(["separator", "spacer"]).isRequired }),
	pt.shape({
		type: pt.oneOf(["group"]).isRequired,
		tools: pt.arrayOf(toolPropType),
	}),
]);

Toolbar.propTypes = {
	tools: pt.arrayOf(toolPropTypeWithGroup).isRequired,
};

export default Toolbar;
