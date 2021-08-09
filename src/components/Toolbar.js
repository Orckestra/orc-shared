import React from "react";
import pt from "prop-types";
import styled from "styled-components";
import { getThemeProp } from "../utils";
import IconButton from "./IconButton";
import Input from "./Input";
import Text, { ptLabel } from "./Text";
import Radio from "./MaterialUI/Inputs/Radio";
import RadioProps from "./MaterialUI/Inputs/RadioProps";

export const Bar = styled.div`
	flex: 0 0 auto;
	min-height: 64px;
	border-bottom: 1px solid ${getThemeProp(["colors", "borderLight"], "#cccccc")};
	display: flex;
	align-items: center;
	padding: 5px 24px;
	box-sizing: border-box;
`;

export const ToolGroup = styled.div`
	flex: 0 0 auto;
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

export const ToolbarButton = styled(IconButton)`
	flex: 0 0 auto;
	margin: 0 5px;
	min-width: auto;

	&:focus,
	&:hover {
		z-index: 10;
	}
`;

export const ToolbarInput = styled(Input)`
	height: 30px;
	flex: 0 0 auto;
	margin: 0 5px;

	&:focus {
		z-index: 10;
	}
`;

export const ToolbarRadioWrapper = styled.div`
	min-width: 250px;
	padding-left: 10px;
`;

export const ToolbarRadio = styled(Radio)`
	height: 30px;
	flex: 0 0 auto;
	margin: 0 5px;

	&:focus {
		z-index: 10;
	}
`;

export const Separator = styled.div`
	flex: 0 0 1px;
	height: 30px;
	margin: 0 16px;
	background-color: ${getThemeProp(["colors", "borderLight"], "#cccccc")};
`;

export const Spacer = styled.div`
	flex: 100%;
`;

export const ToolbarLabel = styled.div`
	font-family: ${getThemeProp(["fonts", "base"], "sans-serif")};
	font-size: 14px;
	color: ${getThemeProp(["colors", "application", "base"], "#999999")};
`;

// Define the dictionary so we can use it below
export const toolComponents = {};

// Turns a tool definition into a rendered React element
const renderToolComponent = ({ key, type, subType, ...props }) => {
	const Comp = toolComponents[type];
	return <Comp key={key} type={subType} {...props} />;
};

// Fill in the tool types
toolComponents.input = ToolbarInput;
toolComponents.input.displayName = "ToolInput";

toolComponents.button = ({ label = {}, ...props }) => <ToolbarButton {...props} icon={label.icon} label={label.text} />;
toolComponents.button.displayName = "ToolButton";

toolComponents.radio = props => {
	const radioProps = new RadioProps();

	radioProps.set(RadioProps.propNames.name, props?.name);
	radioProps.set(RadioProps.propNames.label, props?.label);
	radioProps.set(RadioProps.propNames.defaultVal, props?.defaultVal);
	radioProps.set(RadioProps.propNames.value, props?.value);
	radioProps.set(RadioProps.propNames.update, props?.update);
	radioProps.set(RadioProps.propNames.radios, props?.radios);
	radioProps.set(RadioProps.propNames.row, props?.row);
	radioProps.set(RadioProps.propNames.error, props?.error);
	return (
		<ToolbarRadioWrapper>
			<ToolbarRadio radioProps={radioProps} />
		</ToolbarRadioWrapper>
	);
};
toolComponents.radio.displayName = "ToolRadio";

toolComponents.group = ({ tools }) => <ToolGroup>{tools.map(renderToolComponent)}</ToolGroup>;
toolComponents.group.displayName = "ToolGroup";

toolComponents.spacer = () => <Spacer />;
toolComponents.spacer.displayName = "ToolSpacer";

toolComponents.separator = () => <Separator />;
toolComponents.separator.displayName = "ToolSeparator";

export const Toolbar = ({ tools }) => <Bar>{tools.map(renderToolComponent)}</Bar>;

toolComponents.label = ({ label }) => (
	<ToolbarLabel>
		<Text message={label} />
	</ToolbarLabel>
);
toolComponents.label.displayName = "ToolLabel";

// These tools are allowed inside tool groups
const ptTool = pt.oneOfType([
	pt.shape({
		type: pt.oneOf(["input"]).isRequired,
	}),
	pt.shape({
		type: pt.oneOf(["radio"]).isRequired,
	}),
	pt.shape({
		type: pt.oneOf(["button"]).isRequired,
		label: pt.oneOfType([
			pt.shape({ icon: pt.string.isRequired, text: ptLabel }),
			pt.shape({ icon: pt.string, text: ptLabel.isRequired }),
		]).isRequired,
	}),
]);

// These tools are only allowed outside groups
const ptToolWithGroup = pt.oneOfType([
	ptTool,
	pt.shape({
		type: pt.oneOf(["label"]).isRequired,
		label: ptLabel.isRequired,
	}),
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
