import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBaseMUI from "@material-ui/core/InputBase";
import InputBaseProps, { isInputProps } from "./InputBaseProps";
import classNames from "classnames";
import { NumericFormat, numericFormatter } from "react-number-format";

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

export const AdvancedNumericInput = props => {
	const { inputRef, onChange, ...other } = props;

	// https://github.com/s-yadav/react-number-format

	return (
		<NumericFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={values => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
		/>
	);
};

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
	const startAdornment = inputProps?.get(InputBaseProps.propNames.startAdornment);
	const endAdornment = inputProps?.get(InputBaseProps.propNames.endAdornment);
	const metadata = inputProps?.get(InputBaseProps.propNames.metadata);
	const autoComplete = inputProps?.get(InputBaseProps.propNames.autoComplete);
	const timeoutDelay = inputProps?.get(InputBaseProps.propNames.timeoutDelay) || 100;
	const rowsProps = inputProps?.get(InputBaseProps.propNames.rows);
	const numericInputProps = inputProps?.get(InputBaseProps.propNames.numericInputProps) || null;

	const isAdvancedNumericInput = type.toLowerCase() === "advancednumericinput";
	const inputComponent = isAdvancedNumericInput ? AdvancedNumericInput : undefined;
	const inputControlType = isAdvancedNumericInput ? "text" : type;

	if (isAdvancedNumericInput && numericInputProps) {
		Object.keys(numericInputProps).forEach(key => {
			if (key !== "blurFormattingSkipFixedDecimalScale") {
				inputAttributes[key] = numericInputProps[key];
			}
		});
	}

	if (isAdvancedNumericInput) {
		if (inputAttributes.max === undefined) {
			inputAttributes.max = 2147483647;
		}

		if (inputAttributes.min === undefined) {
			inputAttributes.min = -2147483648;
		}

		inputAttributes.isAllowed = val => {
			return (
				val.value === "" ||
				val.value === "-" ||
				(val.floatValue >= inputAttributes.min && val.floatValue <= inputAttributes.max)
			);
		};
	}

	const defaultRows = 4;
	let rows = rowsProps;
	if (rows === null || rows === undefined) rows = defaultRows;

	const tooltipText = type === "text" ? value : "";

	const onClick = item => {
		// Fixes FireFox issue, where the input number buttons do not focus on input control,
		// causing onBlur to never fire
		item.target.focus();
	};
	const classes = useStyles({ label, errorPosition });

	const onChangeHandler = event => {
		if (event.persist) {
			event.persist();
		}

		if (!event.target.value || window.bypassDebounce === true) {
			update(event.target.value, metadata);
		}
		setInputText(event.target.value);
	};

	const timerId = useRef(null);

	React.useEffect(() => {
		return () => {
			clearTimeout(timerId.current);
			timerId.current = null;
		};
	}, []);

	const onBlurInternal = e => {
		let updateValue = (inputText ?? value).toString(); // value cannot be null as defined above

		if (timerId.current) {
			clearTimeout(timerId.current);
			timerId.current = null;
		}

		if (isAdvancedNumericInput) {
			const formattingProps = { ...numericInputProps };
			delete formattingProps.blurFormattingSkipFixedDecimalScale;

			if (numericInputProps?.blurFormattingSkipFixedDecimalScale !== true) {
				formattingProps.fixedDecimalScale = true;
			}

			updateValue = numericFormatter(updateValue, formattingProps);
		}

		update(updateValue, metadata);
		setInputText(null);

		if (onBlur) {
			onBlur(e);
		}
	};

	const inputBaseInputStyle = inputProps?.getStyle(InputBaseProps.ruleNames.input);
	const errorTextStyle = inputProps?.getStyle(InputBaseProps.ruleNames.errorText);
	const [inputText, setInputText] = React.useState(null);
	const textToDisplay = inputText ?? value;

	React.useEffect(() => {
		if (inputText === null || window.bypassDebounce === true) {
			return;
		}

		if (inputText !== value) {
			clearTimeout(timerId.current);
			timerId.current = setTimeout(() => {
				update(inputText, metadata);
				setInputText(null);
			}, timeoutDelay);

			return () => {
				clearTimeout(timerId.current);
				timerId.current = null;
			};
		} else {
			setInputText(null);
			clearTimeout(timerId.current);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputText, metadata, timeoutDelay, update, value]);

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
					onBlur={onBlurInternal}
					onClick={onClick}
					type={inputControlType}
					placeholder={placeholder}
					value={textToDisplay}
					fullWidth={true}
					onChange={event => onChangeHandler(event)}
					error={!!error}
					inputProps={inputAttributes}
					inputComponent={inputComponent}
					disabled={disabled}
					multiline={multiline}
					startAdornment={startAdornment}
					endAdornment={endAdornment}
					minRows={rows}
					title={tooltipText}
					autoComplete={autoComplete}
				/>
			</div>
			{error && <div className={classNames(classes.errorText, errorTextStyle)}>{error}</div>}
		</div>
	);
};

const compareInputBase = (prev, next) =>
	prev.inputProps.get(InputBaseProps.propNames.value) === next.inputProps.get(InputBaseProps.propNames.value) &&
	prev.inputProps.get(InputBaseProps.propNames.error) === next.inputProps.get(InputBaseProps.propNames.error) &&
	prev.inputProps.get(InputBaseProps.propNames.update) === next.inputProps.get(InputBaseProps.propNames.update) &&
	prev.inputProps.get(InputBaseProps.propNames.disabled) === next.inputProps.get(InputBaseProps.propNames.disabled);

export default React.memo(InputBase, compareInputBase);
