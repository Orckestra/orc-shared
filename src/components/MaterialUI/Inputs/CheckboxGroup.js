import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckboxGroupProps, { isCheckboxGroupProps } from "./CheckboxGroupProps";
import Checkbox from "./Checkbox";
import CheckboxProps from "./CheckboxProps";
import TooltippedIcon from "../DataDisplay/TooltippedElements/TooltippedIcon";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexDirection: "column",
	},
	checkBoxContainer: {
		display: "flex",
		flexDirection: props => (props.row ? "row" : "column"),
		flexWrap: "wrap",
		marginLeft: "8px",
	},
	errorText: {
		marginTop: theme.spacing(0.5),
		color: theme.palette.error.main,
		fontSize: theme.typography.fieldLabelSize,
		float: "left",
	},
	warningIcon: {
		width: "1em",
		height: "1em",
		fontSize: 16,
		alignSelf: "center",
		marginRight: theme.spacing(2),
		"& > svg": {
			color: theme.palette.error.main,
		},
	},
	checkboxItemWarning: {
		color: theme.palette.error.main,
	},
	checkboxItem: props => ({
		display: "flex",
		flex: 1,
		[theme.breakpoints.up("xs")]: {},
		[theme.breakpoints.up("sm")]: {},
		[theme.breakpoints.up("md")]: props.row ? { width: "45%" } : {},
		[theme.breakpoints.up("lg")]: props.row ? { width: "30%" } : {},
		[theme.breakpoints.up("xl")]: props.row ? { width: "20%" } : {},
		marginTop: theme.spacing(1),
	}),
}));

const CheckboxGroup = ({ checkboxGroupProps }) => {
	if (isCheckboxGroupProps(checkboxGroupProps) === false) {
		throw new TypeError("checkboxGroupProps property is not of type CheckboxGroupProps");
	}

	const update = checkboxGroupProps?.get(CheckboxGroupProps.propNames.update);
	const value = checkboxGroupProps?.get(CheckboxGroupProps.propNames.value);
	const label = checkboxGroupProps?.get(CheckboxGroupProps.propNames.label);
	const error = checkboxGroupProps?.get(CheckboxGroupProps.propNames.error);
	const readOnly = checkboxGroupProps?.get(CheckboxGroupProps.propNames.readOnly) || false;
	const disabled = checkboxGroupProps?.get(CheckboxGroupProps.propNames.disabled) || false;
	const options = checkboxGroupProps?.get(CheckboxGroupProps.propNames.options) ?? [];
	const row = checkboxGroupProps.get(CheckboxGroupProps.propNames.row) ?? true;

	const classes = useStyles({ row });

	const handleGroupUpdate = (checked, value, newValue) => {
		const values = value ? value.split("|") : [];
		const position = values.indexOf(newValue);
		if (checked && position === -1) {
			values.push(newValue);
		}

		if (!checked && position !== -1) {
			values.splice(position, 1);
		}
		update(values.join("|"));
	};

	const checkBoxGroup = (
		<div className={classes.container}>
			<div className={classes.checkBoxContainer} data-qa="checkboxgroup-container">
				{options.map((option, index) => {
					const checkboxProps = new CheckboxProps();
					checkboxProps.set(CheckboxProps.propNames.update, checked => handleGroupUpdate(checked, value, option.value));
					checkboxProps.set(CheckboxProps.propNames.value, value?.split("|").includes(option.value));
					checkboxProps.set(CheckboxProps.propNames.label, option.label ?? option.value);
					checkboxProps.set(CheckboxProps.propNames.readOnly, readOnly);
					checkboxProps.set(CheckboxProps.propNames.disabled, disabled);

					return (
						<div
							key={index}
							className={classNames(classes.checkboxItem, { [classes.checkboxItemWarning]: !!option.warningMessage })}
						>
							<Checkbox checkboxProps={checkboxProps} />
							{option.warningMessage && (
								<TooltippedIcon className={classes.warningIcon} titleValue={option.warningMessage} id="warning" />
							)}
						</div>
					);
				})}
			</div>
			{error && <div className={classes.errorText}>{error}</div>}
		</div>
	);

	return label == null ? checkBoxGroup : <FormControlLabel control={checkBoxGroup} label={label} />;
};

export default React.memo(CheckboxGroup);
