import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBaseMUI from "@material-ui/core/InputBase";
import InputBaseProps, { isInputProps } from "./InputBaseProps";
import classNames from "classnames";
import { ExpansionPanelProps } from "../Surfaces/expansionPanelProps";

export const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexDirection: "column",
	},
	inputContainer: {
		display: "flex",
	},
	prepend: {
		fontSize: theme.spacing(1.3),
		lineHeight: theme.spacing(1.3),
		padding: theme.spacing(0.85),
		minWidth: theme.spacing(6),
		marginRight: theme.spacing(-0.1),
		height: theme.spacing(3),
		display: "inline-flex",
		borderRadius: theme.spacing(0.5, 0, 0, 0.5),
		border: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
		boxSizing: "border-box",
		backgroundColor: theme.palette.grey.light,
		whiteSpace: "nowrap",
	},
	disabledPrepend: {
		border: 0,
		padding: theme.spacing(0.8),
		height: theme.spacing(2.8),
		backgroundColor: theme.palette.grey.borders,
	},
	controlInput: {
		minHeight: theme.spacing(1.6),
		maxWidth: "unset",
		minWidth: 0,
		border: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
		borderRadius: props => (props.label ? theme.spacing(0, 0.5, 0.5, 0) : theme.spacing(0.5)),
		paddingLeft: theme.spacing(0.85),
		"&:focus, &:active": {
			border: `${theme.spacing(0.1)} solid ${theme.palette.focus}`,
			borderRadius: props => (props.label ? theme.spacing(0, 0.5, 0.5, 0) : theme.spacing(0.5)),
		},
	},
	errorInput: {
		"& input, & textarea": {
			border: `${theme.spacing(0.1)} solid ${theme.palette.error.main}`,

			"&:focus, &:active": {
				border: `${theme.spacing(0.1)} solid ${theme.palette.error.main}`,
				boxShadow: `${theme.spacing(0, 0, 0.4)} ${theme.palette.error.main}`,
			},
		},
	},
	errorText: {
		marginTop: theme.spacing(0.5),
		color: theme.palette.error.main,
		fontSize: theme.typography.fieldLabelSize,
		float: props => (props.errorPosition === "right" ? "right" : "left"),
	},
	disabled: {
		"& input, & textarea": {
			color: theme.palette.text.primary,
			backgroundColor: theme.palette.grey.light,
			border: 0,
			"&:focus, &:active": {
				border: 0,
				boxShadow: 0,
			},
		},
	},
	multiline: {
		padding: 0,
	},
	inputMultiline: {
		padding: theme.spacing(0.6, 0.6, 0.6, 0.85),
	},
}));

const InputBase = ({ inputProps }) => {
	if (isInputProps(inputProps) === false) {
		throw new TypeError("inputProps property is not of type InputBaseProps");
	}

	const multiline = inputProps?.get(InputBaseProps.propNames.multiline) || false;
	const update = inputProps?.get(InputBaseProps.propNames.update);
	const value = inputProps?.get(InputBaseProps.propNames.value) ?? "";
	const label = !multiline && inputProps?.get(InputBaseProps.propNames.label);
	const type = inputProps?.get(InputBaseProps.propNames.type) || "text";
	const inputAttributes = inputProps?.get(InputBaseProps.propNames.inputAttributes) || {};
	const placeholder = inputProps?.get(InputBaseProps.propNames.placeholder);
	const error = inputProps?.get(InputBaseProps.propNames.error);
	const errorPosition = inputProps?.get(InputBaseProps.propNames.errorPosition);
	const disabled = inputProps?.get(InputBaseProps.propNames.disabled) || false;
	const onBlur = inputProps?.get(InputBaseProps.propNames.onBlur) || null;

	const classes = useStyles({ label, errorPosition });

	const onChangeHandler = event => {
		event.persist();
		update(event.target.value);
	};

	const inputBaseInputStyle = inputProps?.getStyle(InputBaseProps.ruleNames.input);

	return (
		<div className={classes.container}>
			<div className={classes.inputContainer}>
				{label && <label className={`${classes.prepend} ${disabled && classes.disabledPrepend}`}>{label}</label>}
				<InputBaseMUI
					classes={{
						input: classNames(classes.controlInput, inputBaseInputStyle),
						error: classes.errorInput,
						disabled: classes.disabled,
						multiline: classes.multiline,
						inputMultiline: classes.inputMultiline,
					}}
					onBlur={onBlur}
					type={type}
					placeholder={placeholder}
					value={value}
					fullWidth={true}
					onChange={event => onChangeHandler(event)}
					error={!!error}
					inputProps={inputAttributes}
					disabled={disabled}
					multiline={multiline}
					rows={4}
				/>
			</div>
			{error && <div className={classes.errorText}>{error}</div>}
		</div>
	);
};

const compareInputBase = (prev, next) =>
	prev.inputProps.get(InputBaseProps.propNames.value) === next.inputProps.get(InputBaseProps.propNames.value) &&
	prev.inputProps.get(InputBaseProps.propNames.error) === next.inputProps.get(InputBaseProps.propNames.error) &&
	prev.inputProps.get(InputBaseProps.propNames.update) === next.inputProps.get(InputBaseProps.propNames.update) &&
	prev.inputProps.get(InputBaseProps.propNames.disabled) === next.inputProps.get(InputBaseProps.propNames.disabled);

export default React.memo(InputBase, compareInputBase);
