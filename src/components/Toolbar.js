import React from "react";
import pt from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import Icon from "./Icon";
import Text, { ptLabel } from "./Text";

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
	font-size: 15px;
	margin: -3px -2px;
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
const renderToolComponent = ({ key, type, subType, ...props }) => {
	const Comp = toolComponents[type];
	return <Comp key={key} type={subType} {...props} />;
};

// Fill in the tool types
toolComponents.input = props => <ToolbarInput {...props} />;
toolComponents.input.displayName = "ToolInput";

toolComponents.button = ({ label, ...props }) => (
	<ToolbarButton {...props}>
		{label.icon ? <ToolbarButtonIcon id={label.icon} /> : null}
		{label.text ? (
			<ToolbarButtonText>
				<Text message={label.text} />
			</ToolbarButtonText>
		) : null}
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
const ptTool = pt.oneOfType([
	pt.shape({
		type: pt.oneOf(["input"]).isRequired,
	}),
	pt.shape({
		type: pt.oneOf(["button"]).isRequired,
		label: pt.oneOfType([
			pt.shape({ icon: pt.string.isRequired, text: ptLabel }),
			pt.shape({ icon: pt.string, text: ptLabel.isRequired }),
		]).isRequired,
	}),
]);

// These tools are allowed outside groups
const ptToolWithGroup = pt.oneOfType([
	ptTool,
	pt.shape({ type: pt.oneOf(["separator", "spacer"]).isRequired }),
	pt.shape({
		type: pt.oneOf(["group"]).isRequired,
		tools: pt.arrayOf(ptTool),
	}),
]);

Toolbar.propTypes = {
	tools: pt.arrayOf(ptToolWithGroup).isRequired,
};

export default Toolbar;
