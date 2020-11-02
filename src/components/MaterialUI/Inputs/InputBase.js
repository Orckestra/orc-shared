import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBaseMUI from "@material-ui/core/InputBase";
import InputBaseProps, { isInputProps } from "./InputBaseProps";

export const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		position: "relative",
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
	controlInput: {
		height: theme.spacing(1.6),
		maxWidth: "unset",
		border: `${theme.spacing(0.1)} solid ${theme.palette.grey.borders}`,
		borderRadius: props => (props.label ? theme.spacing(0, 0.5, 0.5, 0) : theme.spacing(0.5)),
		paddingLeft: theme.spacing(0.85),
		"&:focus, &:active": {
			border: `${theme.spacing(0.1)} solid ${theme.palette.focus}`,
			borderRadius: props => (props.label ? theme.spacing(0, 0.5, 0.5, 0) : theme.spacing(0.5)),
		},
	},
	errorInput: {
		"& input": {
			border: `${theme.spacing(0.1)} solid ${theme.palette.error.main}`,

			"&:focus": {
				border: `${theme.spacing(0.1)} solid ${theme.palette.error.main}`,
				boxShadow: `${theme.spacing(0, 0, 0.4)} ${theme.palette.error.main}`,
			},
		},
	},
	errorText: {
		position: "absolute",
		bottom: theme.spacing(-2),
		right: 0,
		color: theme.palette.error.main,
		fontSize: theme.typography.fieldLabelSize,
	},
}));

const InputBase = ({ inputProps }) => {
	if (isInputProps(inputProps) === false) {
		throw new TypeError("inputProps property is not of type InputBaseProps");
	}

	const update = inputProps?.get(InputBaseProps.propNames.update);
	const value = inputProps?.get(InputBaseProps.propNames.value) || "";
	const label = inputProps?.get(InputBaseProps.propNames.label);
	const type = inputProps?.get(InputBaseProps.propNames.type) || "text";
	const placeholder = inputProps?.get(InputBaseProps.propNames.placeholder);
	const error = inputProps?.get(InputBaseProps.propNames.error);

	const classes = useStyles({ label });

	return (
		<div className={classes.container}>
			{label && <label className={classes.prepend}>{label}</label>}
			<InputBaseMUI
				classes={{ input: classes.controlInput, error: classes.errorInput }}
				type={type}
				placeholder={placeholder}
				value={value}
				fullWidth={true}
				onChange={e => update(e.target.value)}
				error={!!error}
			/>
			{error && <div className={classes.errorText}>{error}</div>}
		</div>
	);
};

export default InputBase;
