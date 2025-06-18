import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { memoize } from "../../../utils";
import Switch from "../../MaterialUI/Inputs/Switch";
import SwitchProps from "../../MaterialUI/Inputs/SwitchProps";

export const switchEventUpdater = memoize(update => value => update(value));

const useStyles = makeStyles({
	centerMiddleWrapper: {
		minHeight: 30,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export const SwitchInput = ({ update, value, ...props }) => {
	const classes = useStyles();

	const switchProps = new SwitchProps();

	switchProps.set(SwitchProps.propNames.value, value);
	switchProps.set(SwitchProps.propNames.onCaption, props.onCaption);
	switchProps.set(SwitchProps.propNames.offCaption, props.offCaption);
	switchProps.set(SwitchProps.propNames.disabled, props.disabled);
	switchProps.set(SwitchProps.propNames.update, switchEventUpdater(update));

	return (
		<div className={classes.centerMiddleWrapper}>
			<Switch switchProps={switchProps} />
		</div>
	);
};
