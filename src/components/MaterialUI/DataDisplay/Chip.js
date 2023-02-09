import React from "react";
import ChipMui from "@mui/material/Chip";
import ChipProps, { isChipProps } from "./chipProps";
import classNames from "classnames";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		minWidth: theme.spacing(6),
	},
	disabled: {
		backgroundColor: theme.palette.grey.borders,
		color: theme.palette.text.primary,
	},
}));

const Chip = ({ label, chipProps }) => {
	const classes = useStyles();

	if (isChipProps(chipProps) === false) {
		throw new TypeError("chipProps property is not of type ChipProps");
	}

	const avatar = chipProps?.get(ChipProps.propNames.avatar) || null;
	const clickable = chipProps?.get(ChipProps.propNames.clickable) || false;
	const disabled = chipProps?.get(ChipProps.propNames.disabled) || false;
	const onDelete = chipProps?.get(ChipProps.propNames.onDelete) || null;
	const variant = chipProps?.get(ChipProps.propNames.variant) || "default";

	const chip = (
		<ChipMui
			label={label}
			avatar={avatar}
			clickable={clickable}
			disabled={disabled}
			onDelete={onDelete}
			variant={variant}
			classes={{
				root: classNames(classes.root, chipProps?.getStyle(ChipProps.ruleNames.root)),
				disabled: classes.disabled,
			}}
		/>
	);

	return chip;
};

export default Chip;
