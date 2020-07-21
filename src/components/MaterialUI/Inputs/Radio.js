import React from "react";
import clsx from "clsx";
import RadioGroupMui from "@material-ui/core/RadioGroup";
import RadioMui from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import RadioProps from "./RadioProps.js";

const useStyles = makeStyles(theme => ({
	/* Radio Button */
	radioIcon: {
		border: "1px solid",
		borderColor: theme.palette.grey.borders,
		width: theme.spacing(1.6),
		height: theme.spacing(1.6),
		borderRadius: "50%",
		".MuiRadio-root:focus &, .MuiRadio-root:active &": {
			boxShadow: `0 0 4px ${theme.palette.focus}`,
			outline: "none",
		},
	},
	radioIconChecked: {
		borderColor: "currentColor",
		"&:before": {
			content: `" "`,
			backgroundColor: "currentColor",
			width: theme.spacing(1),
			height: theme.spacing(1),
			position: "absolute",
			borderRadius: "50%",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
		},
	},
}));

const extractAndValidateProps = radioProps => {
	if (radioProps == null || radioProps instanceof RadioProps === false) {
		throw new TypeError("radioProps is missing or wrong type");
	}

	const name = radioProps.get(RadioProps.propNames.name);
	const label = radioProps.get(RadioProps.propNames.label);
	const defaultVal = radioProps.get(RadioProps.propNames.defaultVal);
	const value = radioProps.get(RadioProps.propNames.value) ?? defaultVal;
	const update = radioProps.get(RadioProps.propNames.update);
	const row = radioProps.get(RadioProps.propNames.row);
	const radios = radioProps.get(RadioProps.propNames.radios);

	if (!radios || radios.length < 2) {
		throw new Error("Radio component must have at least two options");
	}

	if (!name || name.length == 0) {
		throw new Error("Radio component name is required and missing");
	}

	if (value && !radios.some(radio => radio.value === value)) {
		throw new Error("Radio component must have a matching option for it's value");
	}

	if (defaultVal && !radios.some(radio => radio.value === defaultVal)) {
		throw new Error("Radio component must have a matching option for it's default value");
	}

	if (radios.some(radio => radios.some(x => x !== radio && x.value === radio.value))) {
		throw new Error("Radio component must not have duplicated radio values");
	}

	return { name, label, defaultVal, value, update, row, radios };
};

const Radio = ({ radioProps }) => {
	const classes = useStyles();
	const { name, label, defaultVal, value, update, row, radios } = extractAndValidateProps(radioProps);
	const handleChange = update ? event => update(event.target.value) : null;

	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">{label}</FormLabel>
			<RadioGroupMui
				row={row}
				aria-label={name}
				name={name}
				defaultValue={defaultVal}
				value={value}
				onChange={handleChange}
			>
				{radios.map(radio => {
					const handleClick = radio.clickEvent ? event => radio.clickEvent(event.target.value) : null;

					return (
						<FormControlLabel
							key={`radiobutton_${radio.value}`}
							name={radio.value}
							value={radio.value}
							label={radio.label}
							control={
								<RadioMui
									color="primary"
									checkedIcon={<span className={clsx(classes.radioIcon, classes.radioIconChecked)} />}
									icon={<span className={classes.radioIcon} />}
									onClick={handleClick}
								/>
							}
						/>
					);
				})}
			</RadioGroupMui>
		</FormControl>
	);
};

export default Radio;
