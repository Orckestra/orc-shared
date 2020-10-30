import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputMUI from "@material-ui/core/Input";
import InputProps, { isInputProps } from "./InputProps";

export const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
	},
	prepend: {
		fontSize: theme.spacing(1.3),
		lineHeight: theme.spacing(1.3),
		padding: theme.spacing(0.85, 1.7, 0.85, 0.85),
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
		"&:active": {
			borderRadius: props => (props.label ? theme.spacing(0, 0.5, 0.5, 0) : theme.spacing(0.5)),
		},
		"&:focus": {
			border: `${theme.spacing(0.1)} solid ${theme.palette.focus}`,
			borderRadius: props => (props.label ? theme.spacing(0, 0.5, 0.5, 0) : theme.spacing(0.5)),
		},
	},
}));

const Input = ({ inputProps }) => {
	if (isInputProps(inputProps) === false) {
		throw new TypeError("inputProps property is not of type InputProps");
	}

	const update = inputProps?.get(InputProps.propNames.update);
	const value = inputProps?.get(InputProps.propNames.value);
	const label = inputProps?.get(InputProps.propNames.label);
	const type = inputProps?.get(InputProps.propNames.type);
	const placeholder = inputProps?.get(InputProps.propNames.placeholder);

	const classes = useStyles({ label });

	return (
		<div className={classes.container}>
			{label && <label className={classes.prepend}>{label}</label>}
			<InputMUI
				classes={{ input: classes.controlInput }}
				disableUnderline={true}
				type={type}
				placeholder={placeholder}
				value={value}
				fullWidth={true}
				onChange={e => update(e.target.value)}
			/>
		</div>
	);
};

export default Input;
